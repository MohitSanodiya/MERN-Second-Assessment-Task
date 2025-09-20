import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <header className="header">
      <h><Link to="/">Home</Link></h>
      <div className="text-cl">
        <Link to="/cart">Cart ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</Link>
      </div>
    </header>
  );
};

export default Header;
