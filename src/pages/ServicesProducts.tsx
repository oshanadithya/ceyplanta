import React, { JSX, useState, useRef, useEffect } from "react";
import "../styles/ServicesProducts.css";
import { Leaf, Sprout, Droplet } from "lucide-react";

// Define the type for a product
type Product = {
  name: string;
  description: string;
  icon: JSX.Element;
};

// Define the type for the ProductCard props
type ProductCardProps = {
  product: Product;
  bgColor: string;
  hoverBgColor: string;
  onLearnMore: (product: Product) => void;
  className?: string; // Add className as an optional property
};

// ProductCard component
const ProductCard: React.FC<ProductCardProps> = ({ product, bgColor, hoverBgColor, onLearnMore, className }) => {
  return (
    <div className={`bg-white border border-gray-200 rounded-xl shadow-lg p-6 text-center transition-transform transform hover:scale-105 ${className}`}>
      <div className="flex justify-center mb-4" aria-hidden="true">
        {product.icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <button
        onClick={() => onLearnMore(product)}
        className={`${bgColor} text-white px-5 py-2 rounded-lg hover:${hoverBgColor} transition`}
        aria-label={`Learn more about ${product.name}`}
      >
        Learn More
      </button>
    </div>
  );
};

// Main ServiceProducts component
const ServiceProducts: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Scroll to the modal when it's opened
  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      modalRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isModalOpen]);

  // Define the products
  const greenProducts: Product[] = [
    { name: "Microgreens", description: "Fresh microgreens, rich in nutrients.", icon: <Sprout className="text-green-500 w-10 h-10" /> },
    { name: "Green Tea Leaves", description: "Organic green tea leaves for a refreshing brew.", icon: <Leaf className="text-green-500 w-10 h-10" /> },
    { name: "Herbal Leaves", description: "A variety of herbal leaves for medicinal and culinary use.", icon: <Leaf className="text-green-500 w-10 h-10" /> },
    { name: "Cinnamon", description: "Pure 100% Handmade Cinnamon in premium quality", icon: <Leaf className="text-green-500 w-10 h-10" /> },
  ];

  const agroTechProducts: Product[] = [
    { name: "Automated Irrigation Systems", description: "Smart irrigation solutions for efficient farming.", icon: <Droplet className="text-blue-500 w-10 h-10" /> },
  ];

  const microgreensDetails = {
    Microgreens: [
      { "name": "Radish", "description": "Spicy and crisp, perfect for salads.", "image": "/images/redraddish.jpg" },
      { "name": "Kangkung", "description": "Nutrient-rich, ideal for stir-fries.", "image": "/images/kangkung.jpg" },
      { "name": "Beetroot", "description": "Sweet and earthy, great for juices and salads.", "image": "/images/beetroot.jpg" },
      { "name": "Amaranth", "description": "Vibrant and nutritious, packed with antioxidants and great in soups or stir-fries.", "image": "/images/amaranth.jpg" },
      { "name": "Mustard", "description": "Peppery and flavorful, commonly used in salads and Indian cuisine.", "image": "/images/mustard.jpg" },
      { "name": "Cabbage", "description": "Crunchy and versatile, great for salads, stir-fries, and fermented dishes.", "image": "/images/cabbage.jpg" },
      { "name": "Kale", "description": "Highly nutritious and rich in fiber, perfect for smoothies and sautés.", "image": "/images/kale.jpg" },
      { "name": "Basil", "description": "Aromatic and flavorful, essential for pesto and Italian dishes.", "image": "/images/basil.jpg" },
      { "name": "Coriander", "description": "Fresh and citrusy, widely used in curries, salads, and garnishes.", "image": "/images/coriander.jpg" }
    ],
  };

  // Handle Learn More click
  const handleLearnMore = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="services-products">
      {/* <div className="container mx-auto px-6 py-12"> */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Our Products</h1>

        {/* Product Section with Adjusted Columns */}
        <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: AgroTech Products */}
          <div className="w-full">
            <h2 className="agrotech-heading">AgroTech by Ceyplanta</h2>
            <div className="grid-container">
              {agroTechProducts.map((product, index) => (
                <ProductCard
                  key={index}
                  product={product}
                  bgColor="bg-blue-500"         // Add bgColor
                  hoverBgColor="hover:bg-blue-600"  // Add hoverBgColor
                  className="product-card agrotech-card"
                  onLearnMore={handleLearnMore}
                />
              ))}
            </div>
          </div>
          <br></br>
          <br></br>
          {/* Right: Green Products */}
          <div className="w-full mt-12">
            <h2 className="green-heading">Greens by Ceyplanta</h2>
            <div className="grid-container">
              {greenProducts.map((product, index) => (
                <ProductCard
                  key={index}
                  product={product}
                  bgColor="bg-green-500"       // Add bgColor
                  hoverBgColor="hover:bg-green-600"  // Add hoverBgColor
                  className="product-card green-card"
                  onLearnMore={handleLearnMore}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Modal for product details */}
        {isModalOpen && selectedProduct && (
          <div ref={modalRef} className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-lg w-full">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedProduct.name}</h2>
              {selectedProduct.name === "Microgreens" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {microgreensDetails[selectedProduct.name].map((item, index) => (
                    <div key={index} className="flex flex-col items-center text-center">
                      <img src={item.image} alt={item.name} />
                      <br></br>
                      <strong className="text-lg">{item.name}</strong>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              )}
              <button
                onClick={closeModal}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
      {/* </div> */}
    </div>
  );
};


export default ServiceProducts;
