import '../styles/Home.css';
import estate from '../assets/estate1.jpeg';
import { useEffect, useState } from 'react';

const Home = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const featuredProducts = [
        { name: "Microgreens", description: "Fresh and nutritious microgreens, packed with vitamins." },
        { name: "Green Tea Leaves", description: "Hand-picked green tea leaves from our estate." },
        { name: "Herbal Plants", description: "Natural herbal plants grown with care and sustainability." },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredProducts.length);
        }, 3000); // Slide every 3 seconds
    
        return () => clearInterval(interval); // Cleanup the interval on component unmount
      }, []);

  return (
    <div className="home">
     <img src="/logo.png" alt="Ceyplanta Logo" className="home-logo" />
      <h1>🌱 Welcome to Ceyplanta</h1>
      <p>
        Ceyplanta is a platform offering a variety of products and services. We provide nutritious 
        green products like microgreens, green tea leaves and herbal plants, as well as services like 
        automated irrigation systems to help you grow and sustain your plants.
      </p>

        <br></br>
        <br></br>
       {/* Featured Products Section */}
       <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-slide">
          <h3>{featuredProducts[currentIndex].name}</h3>
          <p>{featuredProducts[currentIndex].description}</p>
        </div>
      </section>


        <br></br>
        <br></br>
      {/* Nildola Estate Section */}
      <section className="nildola-estate">
        <h2>🏞️ Visit Our Nildola Estate</h2>
        <p>
          Our Nildola Estate, located in the lush hills, is where we grow our premium green tea leaves, 
          herbs, and other plants. Come and explore the beauty of nature and witness sustainable farming practices.
        </p>
        <img src={estate} alt="Nildola Estate" className="estate-image" />
      </section>


    </div>
  );
};

export default Home;
