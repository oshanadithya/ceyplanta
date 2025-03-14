import '../styles/ServicesProducts.css';

const ServicesProducts = () => {
  return (
    <div className="services-products">
      <h1>🌿 Our Services & Products</h1>

      <section className="services">
        <h2>🌱 Sustainable Solutions for Your Green Space</h2>
        <p>
          We provide AI-powered automated irrigation systems that optimize water usage, ensuring your plants 
          thrive with minimal effort. Whether you’re a home gardener or a commercial grower, our smart irrigation 
          technology helps you save water, reduce costs, and boost plant health.
        </p>
        <p>
          Our eco-friendly delivery service ensures that all our fresh produce reaches you in peak condition—
          preserving taste, nutrients, and quality.
        </p>
      </section>

      <section className="products">
        <h2>🍃 Pure & Natural Green Offerings</h2>
        <p>
          Experience the goodness of highly nutritious homemade microgreens, cultivated with love and care. 
          These power-packed greens are perfect for healthy meals, providing a boost of vitamins, minerals, and antioxidants.
        </p>
        <p>
          From our lush tea plantation in Bulathsinhala, we bring you premium green tea leaves and herbal plants—
          grown naturally for a refreshing and healthy lifestyle.
        </p>
      </section>
    </div>
  );
};

export default ServicesProducts;