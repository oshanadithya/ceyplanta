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
          We offer variety of products and services. We provide nutritious
          green products like Microgreens, Green tea, Cinnamon and Herbal plants.
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

      <section className="microgreens-section">
        <h2>Our Organic Microgreens</h2>
        <p>
        Greens by Ceyplanta offers fresh, locally grown microgreens that pack a punch of flavor, nutrition, and sustainability. Our microgreens are young, nutrient-dense plants harvested at their peak, packed with vitamins, minerals, and antioxidants. We cultivate a wide variety of microgreens, including radish, mustard, kale, and more, providing healthy, eco-friendly options for individuals, restaurants, and businesses. At Greens by Ceyplanta, we believe in promoting healthier eating habits, supporting local agriculture, and providing a sustainable food source that’s perfect for salads, smoothies, sandwiches, and garnishes. Taste the difference with our fresh, hand-picked microgreens—straight from the farm to your table.
        </p>
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
        <img src={estate} alt="Nildola Estate" className="estate-image" />
        {/* <iframe
          src="https://www.google.com/maps/place/Nildola+Estate/@6.5897311,80.2007427,224a,35y,358.13h,2.24t/data=!3m1!1e3!4m6!3m5!1s0x3ae3c919c24315ab:0xc15fa364bd39ce2d!8m2!3d6.5896022!4d80.2006088!16s%2Fg%2F11vq9j_mqz?entry=ttu&g_ep=EgoyMDI1MDMyNS4xIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe> */}
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