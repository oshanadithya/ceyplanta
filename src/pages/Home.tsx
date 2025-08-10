import '../styles/Home.css';
import estate from '../assets/estate1.jpeg';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const microgreensProducts = [
  { name: "Radish", description: "Spicy and crisp, perfect for salads.", image: "/images/raddish.png" },
  { name: "Kangkung", description: "Nutrient-rich, ideal for stir-fries.", image: "/images/kangkung.png" },
  { name: "Beetroot", description: "Sweet and earthy, great for juices and salads.", image: "/images/beetroot.png" },
  { name: "Amaranth", description: "Vibrant and nutritious, packed with antioxidants and great in soups or stir-fries.", image: "/images/amaranth.png" },
  { name: "Mustard", description: "Peppery and flavorful, commonly used in salads and Indian cuisine.", image: "/images/mustard.jpg" },
  { name: "Cabbage", description: "Crunchy and versatile, great for salads, stir-fries, and fermented dishes.", image: "/images/cabbage.png" },
  { name: "Kale", description: "Highly nutritious and rich in fiber, perfect for smoothies and sautés.", image: "/images/kale.png" },
  { name: "Basil", description: "Aromatic and flavorful, essential for pesto and Italian dishes.", image: "/images/basil2.png" },
  { name: "Coriander", description: "Fresh and citrusy, widely used in curries, salads, and garnishes.", image: "/images/cilantro.png" }
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState<number>(0);
  const [currentMicrogreensIndex, setCurrentMicrogreensIndex] = useState<number>(0);

  const featuredProducts = [
    { name: "Microgreens", description: "Fresh and nutritious microgreens, packed with vitamins." },
    { name: "Edible Flowers", description: "Fresh edible flowers, perfect for bouquets, gardens, decorations, and even culinary use" },
    { name: "Green Tea Leaves", description: "Hand-picked green tea leaves from our estate." },
    { name: "Herbal Plants", description: "Natural herbal plants grown with care and sustainability." },
    { name: "Cinnamon", description: "Pure 100% Handmade Cinnamon in premium quality." },
  ];

  useEffect(() => {
    const intervalFeatured = setInterval(() => {
      setCurrentFeaturedIndex((prevIndex) => (prevIndex + 1) % featuredProducts.length);
    }, 3000);

    const intervalMicrogreens = setInterval(() => {
      setCurrentMicrogreensIndex((prevIndex) => (prevIndex + 1) % microgreensProducts.length);
    }, 3000);


    return () => {
      clearInterval(intervalFeatured);
      clearInterval(intervalMicrogreens);
    };
  }, []);

  return (
    <div className="home">
        <motion.section
          className="hero-section"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="homelogo">
            <motion.img
              src="/logo_2.png"
              alt="Ceyplanta Logo"
              className="home-logo"
              initial={{ rotate: -5, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 80 }}
            />
          </div>
          <h1>Welcome to Greens</h1>
          <p><b>by Ceyplanta</b></p>
          <p>
            Nutritious organic microgreens, Edible Flowers, cinnamon, herbs & wellness gifting – fresh from our farm to your table.
          </p>
          <motion.button
            className="order-now-button"
            onClick={() => navigate('/buy-greens')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Order Now
          </motion.button>
          <div className="hero-links">
            <a href="/Ceyplanta Product Catalog Booklet.pdf" download className="download-catalog-button">Get Our Catalog 🥦</a>
            <a href="/Ceyplanta Recipe Card.pdf" download className="download-catalog-button">Get Recipe Book 🌮</a>
          </div>
        </motion.section>

        {/* Featured Products Carousel */}
        <motion.section
          className="featured-products"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2>Featured Products</h2>
          <motion.div
            className="product-slide"
            key={currentFeaturedIndex}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3>{featuredProducts[currentFeaturedIndex].name}</h3>
            <p>{featuredProducts[currentFeaturedIndex].description}</p>
          </motion.div>
        </motion.section>

        {/* Microgreens Section */}
        <motion.section
          className="microgreens-products"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2>🌱 Microgreens</h2>
          <motion.img
            src={microgreensProducts[currentMicrogreensIndex].image}
            alt={microgreensProducts[currentMicrogreensIndex].name}
            loading="lazy"
            className="microgreens-image"
            key={currentMicrogreensIndex}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          />
          <h3>{microgreensProducts[currentMicrogreensIndex].name}</h3>
          <p>{microgreensProducts[currentMicrogreensIndex].description}</p>
        </motion.section>

        {/* Wellness Section */}
        <motion.section
          className="microgreens-products"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2>🎁 Wellness Gifting by Ceyplanta</h2>
          <p>
            Celebrate health and sustainability with our beautifully curated gift boxes. Perfect for corporate events, welcome kits, hotel guests, or special occasions. Surprise your loved ones or clients with fresh organic microgreens, Flowers, Pencil Portrait Arts and many customizeable gifts with eco-friendly packaging.
          </p>
          <div className="gift-boxes-preview">
            <div className="gift-box">
              <img src="/images/Gift Sticker.png" alt="Wellness Gift Box" />
              <img src="/images/giftbox.jpeg" alt="Wellness Gift Box" />
              <h4>Wellness Gift Box</h4>
              <p>Includes microgreens, cinnamon, handmade items, flowers and fully customizable gifts.</p>
            </div>
          </div>
        </motion.section>


        {/* Wellness Section */}
        <motion.section
          className="microgreens-products"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2>🌱 Visit Our Nildola Estate</h2>
          <p>
            Our Nildola Estate, located in the lush hills, is where we grow our premium tea leaves,
            cinnamons, and other plants. Come and explore the beauty of nature and witness sustainable farming practices.
          </p>
          {/* <img src={estate} alt="Nildola Estate" className="estate-image" href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.4599722193348!2d80.1980338757051!3d6.589607522390115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae3c919c24315ab%3A0xc15fa364bd39ce2d!2sNildola%20Estate!5e0!3m2!1sen!2slk!4v1743340509119!5m2!1sen!2slk"/> */}
          <a href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.4599722193348!2d80.1980338757051!3d6.589607522390115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae3c919c24315ab%3A0xc15fa364bd39ce2d!2sNildola%20Estate!5e0!3m2!1sen!2slk!4v1743340509119!5m2!1sen!2slk" 
            target="_blank" 
            rel="noopener noreferrer">
            <img src={estate} alt="Nildola Estate" className="estate-image" />
          </a>
        </motion.section>

        {/* Other sections ... with same animation logic */}
      </div>
  );
};

export default Home;