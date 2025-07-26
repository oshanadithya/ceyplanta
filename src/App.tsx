import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import ServicesProducts from './pages/ServicesProducts';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import BuyGreens from "./pages/BuyGreens";
import DiscountPage from './pages/OffersAndDiscounts';
import './App.css'
// import OpeningSoon from "./pages/OpenSoon";
import Footer from './components/Footer';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
    <Router>
      <div className="leaf-decor-wrapper">
        {/* Decorative Leaves */}
        <img src="/images/leaf1.png" className="leaf top-left" alt="Leaf Top Left" />
        <img src="/images/leaf2.png" className="leaf bottom-right" alt="Leaf Bottom Right" />
        <img src="/images/leaf1.png" className="leaf top-right" alt="Leaf Top Right" />
        <img src="/images/leaf2.png" className="leaf bottom-left" alt="Leaf Bottom Left" />

        <div className="app-container">
          <Sidebar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services-products" element={<ServicesProducts />} />
              <Route path="/buy-greens" element={<BuyGreens />} />
              <Route path="/offers" element={<DiscountPage />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/about-us" element={<AboutUs />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </Router>
    </HelmetProvider>
  );
}

export default App
