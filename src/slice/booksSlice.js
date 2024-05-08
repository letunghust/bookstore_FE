import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    },
    // Thêm các reducer khác liên quan đến quản lý sách
  },
});

export const { setBooks } = booksSlice.actions;
export default booksSlice.reducer;