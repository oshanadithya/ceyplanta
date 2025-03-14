import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      {/* Sidebar Navigation */}
      <div className={`sidebar ${isOpen ? "open" : ""}`} onMouseLeave={() => setIsOpen(false)}>
        <h2>Ceyplanta</h2>
        <ul>
          <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/services-products" onClick={() => setIsOpen(false)}>Products</Link></li>
          <li><Link to="/about-us" onClick={() => setIsOpen(false)}>About Us</Link></li>
          <li><Link to="/contact-us" onClick={() => setIsOpen(false)}>Contact Us</Link></li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
