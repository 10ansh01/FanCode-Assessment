export interface Genre {
    id: number;
    name: string;
  }
  
export interface Movie {
    id: number;
    title: string;
    genre_ids: number[];
    backdrop_path: string;
    overview: string;
  }
  
export interface MoviesByYear {
    [year: number]: Movie[];
  }
  