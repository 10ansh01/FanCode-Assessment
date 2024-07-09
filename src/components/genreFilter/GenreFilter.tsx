import React from "react";
import styles from "./GenreFilter.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleGenre,
  setAllGenres,
} from "../../reduxSlices/selectedGenreSlice";

interface Genre {
  id: number;
  name: string;
}

export const GenreFilter: React.FC = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state: any) => state.genres);
  const selectedGenres = useSelector((state: any) => state.selectedGenre);

  const handleClick = (genre: Genre) => {
    if (genre.name === "All") {
      dispatch(setAllGenres());
    } else {
      dispatch(toggleGenre(genre));
    }
  };

  const isAllSelected = selectedGenres.length === 0;

  return (
    <div className={styles.genreFilters}>
      <p
        className={`${styles.genre} ${isAllSelected ? styles.selected : ""}`}
        onClick={() => handleClick({ id: 0, name: "All" })}
      >
        All
      </p>
      {genres.map((genre: Genre) => {
        const isSelected = selectedGenres.some(
          (selectedGenre: Genre) => selectedGenre.id === genre.id
        );

        return (
          <p
            key={Math.random()}
            className={`${styles.genre} ${isSelected ? styles.selected : ""}`}
            onClick={() => handleClick(genre)}
          >
            {genre.name}
          </p>
        );
      })}
    </div>
  );
};
