import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "../slice/booksSlice";
import cartReducer from "../slice/cartSlice";

const store = configureStore({
    reducer: {
        books: booksReducer,
        cart: cartReducer,
    },
})

export default store;