import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import "./HomePage.css";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/products");
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || "Failed to fetch products");
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (error) return <p className="error">{error}</p>;

  return (
    <div className="container">
      <h1>Products</h1>
      <div className="products-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="product-card" key={product._id}>
              {product.image && <img src={product.image} alt={product.name} />}
              <h2>{product.name}</h2>
              <p>Price: ₹{product.price}</p>
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
