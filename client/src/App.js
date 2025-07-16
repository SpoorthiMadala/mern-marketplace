import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./pages/Home";
import MyProducts from "./components/MyProducts";
import AddProduct from "./pages/AddProduct";

function App() {
  const [user, setUser] = useState(localStorage.getItem("token") ? "user" : null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  if (!user) {
    return (
      <div className="auth-container">
        <SignIn onAuth={() => setUser("user")} />
        <hr />
        <SignUp onAuth={() => setUser("user")} />
      </div>
    );
  }

  return (
    <Router>
      <div className="navbar">
        <Link to="/" className="nav-btn">All Products</Link>
        <Link to="/my-products" className="nav-btn">My Products</Link>
        <Link to="/add-product" className="nav-btn">Add Product</Link>
        <button onClick={handleLogout} className="nav-btn logout">Logout</button>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-products" element={<MyProducts />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
