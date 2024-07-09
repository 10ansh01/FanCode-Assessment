import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "2dca580c2a14b55200e784d157207b4d",
  },
});

export const fetchMovies = async (
  year: number,
  genreIds: number[]
): Promise<any> => {
  try {
    const params: any = {
      sort_by: "popularity.desc",
      primary_release_year: year,
      page: "1",
      "vote_count.gte": "100",
    };

    if (genreIds.length > 0) {
      params.with_genres = genreIds.join(",");
    }

    const response = await axiosInstance.get("/discover/movie", { params });
    return response.data.results;
  } catch (error) {
    console.error(`Error fetching movies for year ${year}:`, error);
    return [];
  }
};

export const fetchGenres = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get("/genre/movie/list");
    return response.data.genres;
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
};
