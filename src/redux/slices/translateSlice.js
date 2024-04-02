import { createSlice } from "@reduxjs/toolkit";
import { translateText } from "../actions/translateActions";

const initialState = {
  isLoading: false,
  isError: false,
  text: "",
};

const translateSlice = createSlice({
  name: "translate",
  initialState,
  // Senkron aksiyonları tanımladık
  reducers: {
    // Payload değerini texte aktar
    updateText: (state, action) => {
      state.text = action.payload;
    },
  },
  // Asenkron aksiyonları tanımladık
  extraReducers: (builder) => {
    builder.addCase(translateText.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(translateText.rejected, (state, action) => {
      alert(
        "An error occurred while processing. Please try again later"
      );
      state.isLoading = false;
      state.isError = action.error;
    });

    builder.addCase(translateText.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.text = action.payload;
    });
  },
});

export default translateSlice.reducer;
export const { updateText } = translateSlice.actions;
