import toast from "react-hot-toast";
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
                  {/* ADD TO CART */}
                  <button
                    className="btn cart"
                    onClick={() => {
                      dispatch(addToCart(p));
                      toast.success("Added to Cart 🛒");
                    }}
                  >
                    Add to Cart
                  </button>

                  {/* BUY NOW */}
                  <button
                    className="btn buy"
                    onClick={() => {
                      dispatch(addToCart(p));
                      toast.success("Proceeding to Checkout ⚡");
                    }}
                  >
                    Buy Now
                  </button>

                  {/* WISHLIST */}
                  <button
                    className="btn wishlist"
                    onClick={() => {
                      if (isInWishlist) {
                        dispatch(removeFromWishlist(p.id));
                        toast("Removed from Wishlist 💔");
                      } else {
                        dispatch(addToWishlist(p));
                        toast.success("Added to Wishlist ❤️");
                      }
                    }}
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