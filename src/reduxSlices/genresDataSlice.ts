import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Genre {
  id: number;
  name: string;
}

const initialState: Genre[] = [];

export const genresSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {
    addGenres: (state, action: PayloadAction<Genre[]>) => {
      state.push(...action.payload);
    },
  },
});

export const { addGenres } = genresSlice.actions;
export default genresSlice.reducer;
