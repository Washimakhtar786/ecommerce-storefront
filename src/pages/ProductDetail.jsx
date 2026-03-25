import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { addToWishlist } from "../features/wishlist/wishlistSlice";
import "./ProductDetail.css";

function ProductDetail() {
  const { id } = useParams();
  const product = useSelector((state) => state.products.all.find((p) => p.id === parseInt(id)));
  const dispatch = useDispatch();

  if (!product) return <p>Product not found</p>;

  return (
    <div className="detail-container">
      <img src={product.image} alt={product.name} className="detail-image" />
      <div className="detail-info">
        <h1>{product.name}</h1>
        <p>${product.price}</p>
        <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
        <button onClick={() => dispatch(addToWishlist(product))}>Add to Wishlist</button>
      </div>
    </div>
  );
}

export default ProductDetail;