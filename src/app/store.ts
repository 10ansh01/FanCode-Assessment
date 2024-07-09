import { configureStore } from "@reduxjs/toolkit";
import genresSlice from "../reduxSlices/genresDataSlice";
import selectedGenreSlice from "../reduxSlices/selectedGenreSlice";

export const store = configureStore({
  reducer: {
    genres: genresSlice,
    selectedGenre: selectedGenreSlice
  },
});
