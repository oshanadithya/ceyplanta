import '../styles/Home.css';
import estate from '../assets/estate1.jpeg';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const microgreensProducts = [
  { name: "Radish", description: "Spicy and crisp, perfect for salads.", image: "/images/redraddish.jpg" },
  { name: "Kangkung", description: "Nutrient-rich, ideal for stir-fries.", image: "/images/kangkung.jpg" },
  { name: "Beetroot", description: "Sweet and earthy, great for juices and salads.", image: "/images/beetroot.jpg" },
  { name: "Amaranth", description: "Vibrant and nutritious, packed with antioxidants and great in soups or stir-fries.", image: "/images/amaranth.jpg" },
  { name: "Mustard", description: "Peppery and flavorful, commonly used in salads and Indian cuisine.", image: "/images/mustard.jpg" },
  { name: "Cabbage", description: "Crunchy and versatile, great for salads, stir-fries, and fermented dishes.", image: "/images/cabbage.jpg" },
  { name: "Kale", description: "Highly nutritious and rich in fiber, perfect for smoothies and sautés.", image: "/images/kale.jpg" },
  { name: "Basil", description: "Aromatic and flavorful, essential for pesto and Italian dishes.", image: "/images/basil.jpg" },
  { name: "Coriander", description: "Fresh and citrusy, widely used in curries, salads, and garnishes.", image: "/images/coriander.jpg" }
];

const Home: React.FC = () => {
  const navigate = useNavigate();

  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState<number>(0);
  const [currentMicrogreensIndex, setCurrentMicrogreensIndex] = useState<number>(0);

  const featuredProducts = [
    { name: "Microgreens", description: "Fresh and nutritious microgreens, packed with vitamins." },
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
      <div className="hero-section">
        <img src="/logo_2.jpg" alt="Ceyplanta Logo" className="home-logo" />
        <h1>Welcome to Ceyplanta</h1>
        <p>
          Ceyplanta is a platform offering a variety of products and services. We provide nutritious
          green products like microgreens, green tea leaves, and herbal plants, as well as services like
          automated irrigation systems to help you grow and sustain your plants.
        </p>
        <button className="order-now-button" onClick={() => navigate('/buy-greens')}>
          Order Now
        </button>
      </div>

      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-slide">
          <h3>{featuredProducts[currentFeaturedIndex].name}</h3>
          <p>{featuredProducts[currentFeaturedIndex].description}</p>
        </div>
      </section>

      <section className="nildola-estate">
        <h2>🌱 Visit Our Nildola Estate</h2>
        <p>
          Our Nildola Estate, located in the lush hills, is where we grow our premium green tea leaves,
          herbs, and other plants. Come and explore the beauty of nature and witness sustainable farming practices.
        </p>
        <img src={estate} alt="Nildola Estate" className="estate-image" />
      </section>

      <section className="microgreens-products">
        <h2>🌱 Microgreens</h2>
        <div className="microgreens-slide">
          <img src={microgreensProducts[currentMicrogreensIndex].image} className="microgreens-image" />
          <h3>{microgreensProducts[currentMicrogreensIndex].name}</h3>
          <p>{microgreensProducts[currentMicrogreensIndex].description}</p>
        </div>
      </section>
    </div>
  );
};

export default Home;