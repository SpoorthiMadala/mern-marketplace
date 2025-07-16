import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">🛍️ MarketPlace</div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    </nav>
  );
}
