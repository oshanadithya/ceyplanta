import { useState } from "react";
import { Link } from "react-router-dom";
import { FaTimes, FaBars } from "react-icons/fa";
import "../styles/sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <button className={`menu-toggle ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar Overlay for better UX */}
      <div className={`sidebar-overlay ${isOpen ? "active" : ""}`} onClick={() => setIsOpen(false)}></div>

      {/* Sidebar Navigation */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <img src="/logo_2.png" alt="Ceyplanta Logo" />
          </div>
          <h2>Ceyplanta</h2>
        </div>
        
        <ul className="sidebar-menu">
          <li><Link to="/" onClick={() => setIsOpen(false)}>🏠 Home</Link></li>
          <li><Link to="/services-products" onClick={() => setIsOpen(false)}>🛒 Products</Link></li>
          <li><Link to="/buy-greens" onClick={() => setIsOpen(false)}>🥬 Buy Greens</Link></li>
          <li><Link to="/about-us" onClick={() => setIsOpen(false)}>ℹ️ About Us</Link></li>
          <li><Link to="/contact-us" onClick={() => setIsOpen(false)}>📞 Contact Us</Link></li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;