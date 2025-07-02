import '../styles/Home.css';
import estate from '../assets/estate1.jpeg';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

const otherProducts = [
  { name: "Premium Ceylon Green Tea", description: "Pure and natural 100% organic hand plucked green tea leaves for a healthy life.", image: "/images/greentea.jpg" },
  { name: "Premium Ceylon Cinnamon", description: "High-quality Ceylon cinnamon for cooking and health benefits.", image: "/images/cinnamon-sticks.jpg" },
  { name: "Premium Ceylon Cinnamon Tea", description: "Infused togeth using hand manufactured ceylon cinnamon and tea for the best taste and aroma", image: "/images/cinnamontea.jpg" },
];

const Home: React.FC = () => {
  const navigate = useNavigate();

  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState<number>(0);
  const [currentMicrogreensIndex, setCurrentMicrogreensIndex] = useState<number>(0);
  const [currentProductsIndex, setCurrentProductsIndex] = useState<number>(0);

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

    const intervalProducts = setInterval(() => {
      setCurrentProductsIndex((prevIndex) => (prevIndex + 1) % otherProducts.length);
    }, 3000);

    return () => {
      clearInterval(intervalFeatured);
      clearInterval(intervalMicrogreens);
      clearInterval(intervalProducts);
    };
  }, []);

  return (
    <div className="home">
      <div className="hero-section">
        <div className="homelogo">
          <img src="/logo_2.png" alt="Ceyplanta Logo" className="home-logo" />
        </div>
        <h1>Welcome to Greens</h1><p><b>by Ceyplanta</b></p>
        <p>
          We offer variety of products and services, including nutritious
          green products like Microgreens, Green tea, Cinnamon, Herbs, Herbal Teas and Fruit Leathers.
        </p>
        <button className="order-now-button" onClick={() => navigate('/buy-greens')}>
          Order Now
        </button>
        <br></br>
        <br></br>
        <a href="/Ceyplanta Product Catalog Booklet.pdf"
          download
          className="download-catalog-button"
          style={{ marginTop: '1rem', display: 'inline-block' }}
        >
          Get Our Catalog 🥦
        </a>
        <br></br>
        <a href="/Ceyplanta Recipe Card.pdf"
          download
          className="download-catalog-button"
          style={{ marginTop: '1rem', display: 'inline-block' }}
        >
          Get Recipe Book 🌮
        </a>
      </div>

      <section className="microgreens-section">
        <h2>Our Organic Microgreens</h2>
        <p>
        Greens by Ceyplanta offers fresh, locally grown microgreens that pack a punch of flavor, nutrition, and sustainability. Our microgreens are young, nutrient-dense plants harvested at their peak, packed with vitamins, minerals, and antioxidants. We cultivate a wide variety of microgreens, including radish, mustard, kale, and more, providing healthy, eco-friendly options for individuals, restaurants, and businesses. At Greens by Ceyplanta, we believe in promoting healthier eating habits, supporting local agriculture, and providing a sustainable food source that’s perfect for salads, smoothies, sandwiches, and garnishes. Taste the difference with our fresh, hand-picked microgreens—straight from the farm to your table.
        </p>
      </section>

      <section className="available-at">
        <h2>Our Partners</h2>
        <div className="partners-container">
        <div className="partner">
            <img src="/partners/bluewater.jpg" alt="The Blue Water" />
            <p>The Blue Water</p>
          </div>
          <div className="partner">
            <img src="/partners/fitness_zone.jpg" alt="Fitness Zone" />
            <p>Fitness Zone</p>
          </div>
          
          <div className="partner">
            <img src="/partners/detailgallery.jpeg" alt="Detail Gallery" />
            <p>Detail Gallery</p>
          </div>
          {/* Add more partners as needed */}
        </div>
      </section>

      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-slide">
          <h3>{featuredProducts[currentFeaturedIndex].name}</h3>
          <p>{featuredProducts[currentFeaturedIndex].description}</p>
        </div>
      </section>

      <section className="microgreens-products">
        <h2>🌱 Microgreens</h2>
        <div className="microgreens-slide">
          <img src={microgreensProducts[currentMicrogreensIndex].image} className="microgreens-image" />
          <h3>{microgreensProducts[currentMicrogreensIndex].name}</h3>
          <p>{microgreensProducts[currentMicrogreensIndex].description}</p>
        </div>
      </section>

      <section className="nildola-estate">
        <h2>🌱 Visit Our Nildola Estate</h2>
        <p>
          Our Nildola Estate, located in the lush hills, is where we grow our premium green tea leaves,
          herbs, and other plants. Come and explore the beauty of nature and witness sustainable farming practices.
        </p>
        {/* <img src={estate} alt="Nildola Estate" className="estate-image" href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.4599722193348!2d80.1980338757051!3d6.589607522390115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae3c919c24315ab%3A0xc15fa364bd39ce2d!2sNildola%20Estate!5e0!3m2!1sen!2slk!4v1743340509119!5m2!1sen!2slk"/> */}
        <a href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.4599722193348!2d80.1980338757051!3d6.589607522390115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae3c919c24315ab%3A0xc15fa364bd39ce2d!2sNildola%20Estate!5e0!3m2!1sen!2slk!4v1743340509119!5m2!1sen!2slk" 
          target="_blank" 
          rel="noopener noreferrer">
          <img src={estate} alt="Nildola Estate" className="estate-image" />
        </a>
      </section>


      <section className="microgreens-products">
        <h2>🌱 Other Products</h2>
        <div className="microgreens-slide">
          <img src={otherProducts[currentProductsIndex].image} className="microgreens-image" />
          <h3>{otherProducts[currentProductsIndex].name}</h3>
          <p>{otherProducts[currentProductsIndex].description}</p>
        </div>
      </section>

      
    </div>
  );
};

export default Home;