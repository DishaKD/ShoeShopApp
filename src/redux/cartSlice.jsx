// cartSlice.js
import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.items.find(
        item => item.id === action.payload.id,
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.items.push({...action.payload, quantity: 1});
      }
    },
    // Add more reducers as needed (e.g., removeFromCart)
  },
});

export const {addToCart} = cartSlice.actions;
export default cartSlice.reducer;
