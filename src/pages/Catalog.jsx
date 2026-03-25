import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  setCategory,
  setPrice,
  setRating,
  setSort,
  resetFilters,
} from "../features/products/productsSlice";

import { addToCart } from "../features/cart/cartSlice";

import {
  addToWishlist,
  removeFromWishlist,
} from "../features/wishlist/wishlistSlice";

import { Link } from "react-router-dom";

import "./Catalog.css";

function Catalog() {
  // ✅ ALL HOOKS INSIDE COMPONENT
  const products = useSelector((state) => state.products.filtered);
  const filters = useSelector((state) => state.products.filters);
  const wishlist = useSelector((state) => state.wishlist.items);

  const dispatch = useDispatch();

  return (
    <div className="catalog-page">
    <div className="container">
      <h1>Product Catalog</h1>

      <div className="layout">
        {/* SIDEBAR */}
        <div className="sidebar">
          <h3>Filters</h3>

          {/* CATEGORY */}
          <p><strong>Category</strong></p>
          <label>
            <input
              type="checkbox"
              onChange={() => dispatch(setCategory("Electronics"))}
            />
            Electronics
          </label>

          <label>
            <input
              type="checkbox"
              onChange={() => dispatch(setCategory("Clothing"))}
            />
            Clothing
          </label>

          {/* PRICE */}
          <p><strong>Max Price: ${filters.maxPrice}</strong></p>
          <input
            type="range"
            min="0"
            max="2000"
            value={filters.maxPrice}
            onChange={(e) => dispatch(setPrice(Number(e.target.value)))}
          />

          {/* RATING */}
          <p><strong>Rating</strong></p>
          <button onClick={() => dispatch(setRating(4))}>
            4⭐ & above
          </button>
          <button onClick={() => dispatch(setRating(3))}>
            3⭐ & above
          </button>

          {/* SORT */}
          <p><strong>Sort By</strong></p>
          <button onClick={() => dispatch(setSort("low"))}>
            Price Low → High
          </button>
          <button onClick={() => dispatch(setSort("high"))}>
            Price High → Low
          </button>

          {/* RESET */}
          <button onClick={() => dispatch(resetFilters())}>
            Reset Filters
          </button>
        </div>
        

        {/* PRODUCT GRID */}
        <div className="grid">
          {products.map((p) => {
            const isInWishlist = wishlist.find((i) => i.id === p.id);

            return (
              <div key={p.id} className="card">
                <Link to={`/product/${p.id}`}>
                  <img
                    src={p.image}
                    alt={p.name}
                    className="product-image"
                  />
                </Link>

                <h3>{p.name}</h3>
                <p className="price">${p.price}</p>

                {/* Rating */}
                {p.rating && (
                  <p className="rating">
                    {"⭐".repeat(p.rating)} ({p.rating})
                  </p>
                )}

                <div className="card-buttons">
                  <button
                    className="btn cart"
                    onClick={() => dispatch(addToCart(p))}
                  >
                    Add to Cart
                  </button>

                  <button className="btn buy">
                    Buy Now
                  </button>

                  <button
                    className="btn wishlist"
                    onClick={() =>
                      isInWishlist
                        ? dispatch(removeFromWishlist(p.id))
                        : dispatch(addToWishlist(p))
                    }
                  >
                    {isInWishlist ? "❤️" : "🤍"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    </div>
  );
}

export default Catalog;