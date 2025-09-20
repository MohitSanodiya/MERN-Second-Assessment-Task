import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQty } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";
import "./CardPage.css";

const CartPage = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemove = (_id) => {
    dispatch(removeFromCart(_id));
  };

  const handleQtyChange = (_id, qty) => {
    if (qty < 1) return; // minimum quantity = 1
    dispatch(updateQty({ _id, qty }));
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>
          Cart is empty. <Link to="/">Go Back</Link>
        </p>
      ) : (
        <div className="cart-grid">
          {cartItems.map((item) => (
            <div className="cart-item" key={item._id}>
              {item.image && <img src={item.image} alt={item.name} />}
              <div className="cart-details">
                <h2>{item.name}</h2>
                <p>Price: ₹{item.price}</p>
                <div>
                  Qty: 
                  <input
                    type="number"
                    value={item.qty}
                    onChange={(e) =>
                      handleQtyChange(item._id, Number(e.target.value))
                    }
                    min="1"
                  />
                </div>
                <button onClick={() => handleRemove(item._id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {cartItems.length > 0 && (
        <div className="cart-summary">
          <h2>Total: ₹{totalPrice}</h2>
          <button>Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
