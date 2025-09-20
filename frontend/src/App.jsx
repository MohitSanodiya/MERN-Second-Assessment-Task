import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import "./App.css"


// Private Route Component
const PrivateRoute = ({ children }) => {
  return localStorage.getItem("token") ? children : <Navigate to="/login" />;
};


const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<Login />} />        
        <Route path="/register" element={<Register />} /> 
      </Routes>
    </Router>
  );
};

export default App;
