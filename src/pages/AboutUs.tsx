import '../styles/ServicesProducts.css';

const ServicesProducts = () => {
  return (
    <div className="services-products">
      <section className="about-us">
        <h2>🌍 About Ceyplanta</h2>
        <p>
          At Ceyplanta, we are dedicated to sustainable agriculture and eco-friendly solutions. 
          Our mission is to provide high-quality, naturally grown products while integrating technology 
          to optimize cultivation and distribution. Based in Sri Lanka, we focus on homegrown microgreens, 
          premium tea, Cinnamon, Herbs, Herbal Teas, Fruit Leathers and AI-powered smart irrigation to support healthier lifestyles and greener communities.
        </p>
      </section>
      <h2>🌿 Our Services & Products</h2>
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
      <section className="gallery">
        <h2>📸 Gallery</h2>
        <div className="gallery-grid">
          <img src="/images/gallery/1.jpeg" alt="Gallery 1" />
          <img src="/images/gallery/2.jpeg" alt="Gallery 2" />
          <img src="/images/gallery/3.jpeg" alt="Gallery 3" />
          <img src="/images/gallery/4.jpeg" alt="Gallery 4" />
          <img src="/images/gallery/5.jpeg" alt="Gallery 5" />
          <img src="/images/gallery/6.jpeg" alt="Gallery 6" />
          <img src="/images/gallery/7.jpeg" alt="Gallery 7" />
          <img src="/images/gallery/8.jpeg" alt="Gallery 8" />
          <img src="/images/gallery/9.jpeg" alt="Gallery 9" />
          <img src="/images/gallery/10.jpeg" alt="Gallery 10" />
          <img src="/images/gallery/11.jpeg" alt="Gallery 11" />
          <img src="/images/gallery/12.jpeg" alt="Gallery 12" />
          <img src="/images/gallery/13.jpeg" alt="Gallery 13" />
          <img src="/images/gallery/14.jpeg" alt="Gallery 14" />
          <img src="/images/gallery/15.jpeg" alt="Gallery 15" />
          <img src="/images/gallery/16.jpeg" alt="Gallery 16" />
          <img src="/images/gallery/17.jpeg" alt="Gallery 17" />
          <img src="/images/gallery/18.jpeg" alt="Gallery 18" />
          <img src="/images/gallery/19.jpeg" alt="Gallery 19" />
          <img src="/images/gallery/20.jpeg" alt="Gallery 20" />
          <img src="/images/gallery/21.jpeg" alt="Gallery 21" />
          <img src="/images/gallery/22.jpeg" alt="Gallery 22" />
          {/* Add more images as needed */}
        </div>
      </section>
    </div>
  );
};

export default ServicesProducts;