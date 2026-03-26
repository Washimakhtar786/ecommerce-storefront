import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { addToCart } from "../features/cart/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../features/wishlist/wishlistSlice";

import { Link } from "react-router-dom";
import "./Catalog.css";

function Catalog() {
  const products = useSelector((state) => state.products.filtered);
  const wishlist = useSelector((state) => state.wishlist.items);

  const dispatch = useDispatch();

  return (
    <div className="catalog-page">
      <div className="container">
        <h1 className="title">Product Catalog</h1>

        {/* PRODUCT GRID ONLY */}
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

                {/* Rating (only display, no filter) */}
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
  );
}

export default Catalog;