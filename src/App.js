import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginWithToken, fetchProducts, logout } from "./store";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import Products from "./Products";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import Notes from "./Notes"; // Import the Notes component

const App = () => {
  const dispatch = useDispatch();
  const { products, auth } = useSelector((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(loginWithToken());
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // navigate to the root route on logout
  };

  return (
    <div>
      <h1>
        <Link to="/">Acme Product Search</Link>
      </h1>
      <Link to="/products">Products ({products.length})</Link>
      {!auth.id ? (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      ) : (
        <div>
          <button onClick={handleLogout}>
            Logout {auth.username} Your lucky number is {auth.luckyNumber}
          </button>
          <Link to="/profile">Profile</Link>
          {/* <Link to="/profile/notes">Notes</Link> */}
        </div>
      )}
      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/notes" element={<Notes />} />{" "}
        <Route path="/products/:filterString" element={<Products />} />
      </Routes>
    </div>
  );
};

export default App;
