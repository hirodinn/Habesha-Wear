import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as cartService from "../services/cartService";

export const getCart = createAsyncThunk(
  "cart/get",
  async (_, { rejectWithValue }) => {
    try {
      const data = await cartService.fetchCart();
      return Array.isArray(data) ? data[0] : data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addItemToCart = createAsyncThunk(
  "cart/addItem",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      return await cartService.addToCart(productId, quantity);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateItemQuantity = createAsyncThunk(
  "cart/updateItem",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      return await cartService.updateCartItem(productId, quantity);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const removeItem = createAsyncThunk(
  "cart/removeItem",
  async (productId, { rejectWithValue }) => {
    try {
      return await cartService.removeFromCart(productId);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Cart
      .addCase(getCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload?.products || [];
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add/Update/Remove actions update the entire items array from response
      .addMatcher(
        (action) =>
          [
            addItemToCart.fulfilled,
            updateItemQuantity.fulfilled,
            removeItem.fulfilled,
          ].includes(action.type),
        (state, action) => {
          state.loading = false;
          state.items = action.payload?.products || [];
        }
      )
      .addMatcher(
        (action) =>
          [
            addItemToCart.pending,
            updateItemQuantity.pending,
            removeItem.pending,
          ].includes(action.type),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) =>
          [
            addItemToCart.rejected,
            updateItemQuantity.rejected,
            removeItem.rejected,
          ].includes(action.type),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
