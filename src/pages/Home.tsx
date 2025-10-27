import '../styles/Home.css';
import estate from '../assets/estate1.jpeg';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion  } from 'framer-motion';

const microgreensProducts = [
  { name: "Beetroot", description: "Sweet and earthy, great for juices and salads.", image: "/images/beetroot.png" },
  { name: "Cabbage", description: "Crunchy and versatile, great for salads, stir-fries, and fermented dishes.", image: "/images/cabbage2.png" },
  { name: "Pea Shoots", description: "Delicate, sweet, and packed with vitamins A, C, and K — perfect for salads and sandwiches.", image: "/images/peasprouts.png" },
  { name: "Micro Corn Shoot", description: "Golden-yellow and naturally sweet microgreens, ideal for gourmet dishes.", image: "/images/cornshoot.png" },
  { name: "Customized Mix Microgreen Pack", description: "Mix your favorite microgreens for a balanced, nutrient-rich meal plan.", image: "/images/Microgreen-mix.png" },
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState<number>(0);
  // const [currentMicrogreensIndex, setCurrentMicrogreensIndex] = useState<number>(0);

  const featuredProducts = [
    { name: "Microgreens", description: "Fresh and nutritious microgreens, packed with vitamins." },
    { name: "Edible Flowers", description: "Fresh edible flowers, perfect for bouquets, gardens, decorations, and even culinary use" },
    { name: "Green Tea Leaves", description: "Hand-picked green tea leaves from our estate." },
    { name: "Herbal Plants", description: "Natural herbal plants grown with care and sustainability." },
    { name: "Cinnamon", description: "Pure 100% Handmade Cinnamon in premium quality." },
    { name: "Salad Packs", description: "Fresh Handmade Premium Salad Packs" },
  ];

  useEffect(() => {
    const intervalFeatured = setInterval(() => {
      setCurrentFeaturedIndex((prevIndex) => (prevIndex + 1) % featuredProducts.length);
    }, 5000); // 5 seconds for featured products
  
  
    return () => {
      clearInterval(intervalFeatured);
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
          {/* Corner flower decorations */}
          <img src="/images/marigold.png" alt="Flower Left" className="corner-flower left" />
          <img src="/images/wishbone.png" alt="Flower Left" className="corner-flower left2" />
          <img src="/images/dianthus.png" alt="Flower Right" className="corner-flower left3" />

          <div className="homelogo">
            <motion.img
              src="/logo_3.png"
              alt="Ceyplanta Logo"
              className="home-logo"
              initial={{ rotate: -5, scale: 2 }}
              animate={{ rotate: 0, scale: 2.8 }}
              transition={{ type: 'spring', stiffness: 80 }}
            />
          </div>
          {/* <h1>Welcome to Greens</h1> */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <motion.h1
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
            >
              Welcome to <span style={{ color: "#4CAF50" }}>Greens</span>
            </motion.h1>
          </motion.div>     
          <p><b>by Ceyplanta</b></p>
          <p>
            Nutritious organic microgreens, Edible Flowers, herbs, premium salad packs & wellness gifting – fresh from our farm to your hands.
          </p>
          <motion.button
            className="order-now-button"
            onClick={() => navigate('/buy-greens')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Order Now
          </motion.button>
          <br></br>
          <div className="hero-links">
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

        {/* Wellness Section */}
        <motion.section
          className="microgreens-products"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2>Freshness and Wellness by Ceyplanta</h2>
          <p>
            Celebrate health and sustainability with our beautifully curated gift boxes. Perfect for corporate events, welcome kits, hotel guests, or special occasions. Surprise your loved ones or clients with fresh organic microgreens, flowers, pencil portrait arts, and many customizable gifts with eco-friendly packaging.
          </p>

          <div className="gift-boxes-preview">
            <div className="gift-box">
              <div className="gift-images">
                <img src="/images/Gift Sticker.png" alt="Gift Sticker" />
                <img src="/images/giftbox.jpeg" alt="Wellness Gift Box" />
              </div>
              <h4>Wellness Gift Box</h4>
              <p>
                Includes microgreens, cinnamon, handmade items, flowers and fully customizable gifts.
              </p>
            </div>
          </div>

          {/* Fixed microgreens display */}
          <div className="microgreens-grid">
            {microgreensProducts.map((item, index) => (
              <div key={index} className="microgreen-item">
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
            ))}
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

          <div className="estate-gallery">
            <img src="/images/es1.jpeg" alt="Nildola Estate view 1" />
            <img src="/images/es2.jpeg" alt="Nildola Estate view 2" />

            <a
              href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.4599722193348!2d80.1980338757051!3d6.589607522390115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae3c919c24315ab%3A0xc15fa364bd39ce2d!2sNildola%20Estate!5e0!3m2!1sen!2slk!4v1743340509119!5m2!1sen!2slk"
              target="_blank"
              rel="noopener noreferrer"
              className="estate-center"
            >
              <img src={estate} alt="Nildola Estate Main" className="estate-image" />
            </a>

            <img src="/images/es3.jpeg" alt="Nildola Estate view 3" />
            <img src="/images/es4.jpeg" alt="Nildola Estate view 4" />
          </div>
        </motion.section>
      </div>
  );
};

export default Home;