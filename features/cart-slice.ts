import { createSlice } from "@reduxjs/toolkit";
interface CartItem {
  id: number;
  image: string;
  name: string;
  description: string;
  price: number;
  color: string;
  quantity: number;
}
interface CartState {
  cartItems: CartItem[];
  totalQuantity: number;
}
const initialState: CartState = {
  cartItems: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cartItems.push({ ...action.payload, quantity: 1 });
      state.totalQuantity += 1;
    },
    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      state.totalQuantity -= 1;
    },
    updateCartItemQuantity: (state, action) => {
      const { index, quantity } = action.payload;
      state.cartItems[index].quantity = quantity;
    },
  },
});

export const { addToCart, removeFromCart, updateCartItemQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
