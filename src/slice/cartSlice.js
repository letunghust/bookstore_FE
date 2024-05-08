import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // Logic để thêm sản phẩm vào giỏ hàng
    },
    removeFromCart: (state, action) => {
      // Logic để xóa sản phẩm khỏi giỏ hàng
    },
    // Thêm các reducer khác liên quan đến quản lý giỏ hàng
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;