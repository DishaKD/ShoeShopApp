import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(
        'GET',
        'https://s3-eu-west-1.amazonaws.com/api.themeshplatform.com/products.json',
      );

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          const data = JSON.parse(xhr.responseText);
          resolve(data.data);
        } else {
          reject(new Error('Failed to fetch products'));
        }
      };

      xhr.onerror = () => {
        reject(new Error('Network error'));
      };

      xhr.send(); // Send the request
    });
  },
);

const productSlice = createSlice({
  name: 'products',
  initialState: {items: []},
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.items = action.payload; // Store fetched products in the state
    });
  },
});

export default productSlice.reducer;
