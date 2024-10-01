import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const {id, selectedSize} = action.payload; // Destructure the id and selectedSize from the payload
      const existingProduct = state.items.find(
        item => item.id === id && item.selectedSize === selectedSize,
      ); // Check for existing product with the same size

      if (existingProduct) {
        existingProduct.quantity += 1; // Increase quantity if found
      } else {
        // Push new product with size and quantity
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },
    // Add more reducers as needed (e.g., removeFromCart)
  },
});

export const {addToCart} = cartSlice.actions;
export default cartSlice.reducer;
