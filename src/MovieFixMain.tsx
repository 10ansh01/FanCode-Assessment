import React, { useEffect, useState, lazy, Suspense } from "react";
import styles from "./MovieFixMain.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addGenres } from "./reduxSlices/genresDataSlice";
import { Logo } from "./components/logo/Logo";
import useInfiniteScroll from "./hooks/useInfiniteScroll";
import { GenreFilter } from "./components/genreFilter/GenreFilter";
import { fetchGenres, fetchMovies } from "./api";
import { Genre, Movie, MoviesByYear } from "./types";

const LazyMovieCard = lazy(() => import("./components/movieCard/MovieCard"));

interface MovieFixMainTypes {
  withModalVariation: boolean;
}
const MovieFixMain: React.FC<MovieFixMainTypes> = (props) => {
  const [moviesByYear, setMoviesByYear] = useState<MoviesByYear>({});
  const [startYear, setStartYear] = useState<number>(2012);
  const [endYear, setEndYear] = useState<number>(2012);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const selectedGenres: Genre[] = useSelector(
    (state: any) => state.selectedGenre
  ); // Example assuming selectedGenres is of type Genre[]
  const dispatch = useDispatch();

  useEffect(() => {
    fetchGenres()
      .then((genresData: Genre[]) => {
        dispatch(addGenres(genresData));
      })
      .catch((error) => {
        console.error("Error fetching genres:", error);
      });
  }, [dispatch]);

  useEffect(() => {
    const genreIds =
      selectedGenres.length > 0 ? selectedGenres.map((genre) => genre.id) : [];
    fetchMovies(startYear, genreIds)
      .then((newMovies: Movie[]) => {
        setMoviesByYear((prev) => ({ ...prev, [startYear]: newMovies }));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [startYear, selectedGenres]);

  const fetchNextYearMovies = async () => {
    const newYear = endYear + 1;
    const genreIds =
      selectedGenres.length > 0 ? selectedGenres.map((genre) => genre.id) : [];
    try {
      const newMovies = await fetchMovies(newYear, genreIds);
      setMoviesByYear((prev) => ({ ...prev, [newYear]: newMovies }));
      setEndYear(newYear);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPreviousYearMovies = async () => {
    const newYear = startYear - 1;
    const genreIds =
      selectedGenres.length > 0 ? selectedGenres.map((genre) => genre.id) : [];
    try {
      const newMovies = await fetchMovies(newYear, genreIds);
      setMoviesByYear((prev) => ({ ...prev, [newYear]: newMovies }));
      setStartYear(newYear);
    } catch (error) {
      console.error(error);
    }
  };

  useInfiniteScroll(fetchNextYearMovies, fetchPreviousYearMovies, 100);

  const sortedYears = Object.keys(moviesByYear).sort(
    (a, b) => parseInt(a) - parseInt(b)
  );

  return (
    <div>
      <div className={styles.moviefixHead}>
        <div className={styles.header}>
          <Logo />
          <input
            className={styles.movieSearchInput}
            type="text"
            placeholder="Enter text to search"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
        </div>
        <div className={styles.movieGenres}>
          <GenreFilter />
        </div>
      </div>
      <div className={styles.movieDataWrapper}>
        {sortedYears.map((year) => (
          <div key={year}>
            <h2 className={styles.year}>{year}</h2>
            <div className={styles.movieList}>
              {moviesByYear[parseInt(year)].map((movie) => {
                if (movie.title && movie.title.includes(searchQuery)) {
                  return (
                    <Suspense
                      key={movie.id}
                      fallback={
                        <div style={{ color: "white" }}>Loading...</div>
                      }
                    >
                      <LazyMovieCard
                        key={movie.id}
                        title={movie.title}
                        genreIds={movie.genre_ids}
                        movieId={movie.id}
                        backdropPath={movie.backdrop_path}
                        overview={movie.overview}
                        withModalVariation={props.withModalVariation}
                      />
                    </Suspense>
                  );
                }
                return null;
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieFixMain;
