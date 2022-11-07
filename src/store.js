import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from "./store/userSlice.js";

let cart = createSlice({
  name: "stock",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    addCount(state, action) {
      state[action.payload].count += 1;
    },
    addCart(state, action) {
      state.push(action.payload);
    },
  },
});

export let { addCount, addCart } = cart.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    cart: cart.reducer,
  },
});
