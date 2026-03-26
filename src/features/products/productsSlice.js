import { createSlice } from "@reduxjs/toolkit";
import productsData from "../../api/products.json";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    all: productsData,
    filtered: productsData,
  },
  reducers: {
    // (optional) future use like search or category from navbar
  },
});

export default productsSlice.reducer;