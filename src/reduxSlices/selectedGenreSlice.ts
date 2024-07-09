import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedGenre {
  id: number;
  name: string;
}

const initialState: SelectedGenre[] = [];

export const selectedGenreSlice = createSlice({
  name: "selectedGenre",
  initialState,
  reducers: {
    toggleGenre: (state, action: PayloadAction<SelectedGenre>) => {
      const index = state.findIndex(genre => genre.id === action.payload.id);
      if (index === -1) {
        state.push(action.payload);
      } else {
        state.splice(index, 1);
      }
    },
    setAllGenres: (state) => {
      state.splice(0, state.length);
    },
  },
});

export const { toggleGenre, setAllGenres } = selectedGenreSlice.actions;
export default selectedGenreSlice.reducer;
