import { createSlice } from "@reduxjs/toolkit";
import productsData from "../../api/products.json";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    all: productsData,
    filtered: productsData,
    filters: {
      categories: [],
      maxPrice: 2000,
      rating: 0,
      sort: "",
    },
  },

  reducers: {
    setCategory: (state, action) => {
      const category = action.payload;

      if (state.filters.categories.includes(category)) {
        state.filters.categories = state.filters.categories.filter(
          (c) => c !== category
        );
      } else {
        state.filters.categories.push(category);
      }

      applyFilters(state);
    },

    setPrice: (state, action) => {
      state.filters.maxPrice = action.payload;
      applyFilters(state);
    },

    setRating: (state, action) => {
      state.filters.rating = action.payload;
      applyFilters(state);
    },

    setSort: (state, action) => {
      state.filters.sort = action.payload;
      applyFilters(state);
    },

    resetFilters: (state) => {
      state.filters = {
        categories: [],
        maxPrice: 2000,
        rating: 0,
        sort: "",
      };
      state.filtered = state.all;
    },
  },
});

/* 🔥 FILTER LOGIC */
function applyFilters(state) {
  let data = [...state.all];

  // Category filter
  if (state.filters.categories.length > 0) {
    data = data.filter((p) =>
      state.filters.categories.includes(p.category)
    );
  }

  // Price filter
  data = data.filter((p) => p.price <= state.filters.maxPrice);

  // Rating filter
  data = data.filter((p) => (p.rating || 0) >= state.filters.rating);

  // Sorting
  if (state.filters.sort === "low") {
    data.sort((a, b) => a.price - b.price);
  } else if (state.filters.sort === "high") {
    data.sort((a, b) => b.price - a.price);
  }

  state.filtered = data;
}

export const {
  setCategory,
  setPrice,
  setRating,
  setSort,
  resetFilters,
} = productsSlice.actions;

export default productsSlice.reducer;