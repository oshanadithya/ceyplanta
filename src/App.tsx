import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import ServicesProducts from './pages/ServicesProducts';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import './App.css'

function App() {

  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services-products" element={<ServicesProducts />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/about-us" element={<AboutUs />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
