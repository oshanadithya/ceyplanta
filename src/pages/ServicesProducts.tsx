import React, { JSX, useState } from "react";
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
};

// ProductCard component
const ProductCard: React.FC<ProductCardProps> = ({ product, bgColor, hoverBgColor, onLearnMore }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 text-center transition-transform transform hover:scale-105">
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

  // Define the green products
  const greenProducts: Product[] = [
    { name: "Microgreens", description: "Fresh microgreens, rich in nutrients.", icon: <Sprout className="text-green-500 w-10 h-10" /> },
    { name: "Green Tea Leaves", description: "Organic green tea leaves for a refreshing brew.", icon: <Leaf className="text-green-500 w-10 h-10" /> },
    { name: "Herbal Leaves", description: "A variety of herbal leaves for medicinal and culinary use.", icon: <Leaf className="text-green-500 w-10 h-10" /> },
  ];

  // Define the agro-tech products
  const agroTechProducts: Product[] = [
    { name: "Automated Irrigation Systems", description: "Smart irrigation solutions for efficient farming.", icon: <Droplet className="text-blue-500 w-10 h-10" /> },
  ];

  // Define the microgreens details
  const microgreensDetails: { [key: string]: { name: string; description: string }[] } = {
    Microgreens: [
      { name: "Radish", description: "Spicy and crisp, perfect for salads." },
      { name: "Kangkung", description: "Nutrient-rich, ideal for stir-fries." },
      { name: "Beetroot", description: "Sweet and earthy, great for juices and salads." },
    ],
  };

  // Handle the "Learn More" button click
  const handleLearnMore = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Our Products</h1>
      <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="w-full">
          <h2 className="text-3xl font-semibold text-green-700 text-center mb-6">Green by Ceyplanta</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {greenProducts.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                bgColor="bg-green-500"
                hoverBgColor="bg-green-600"
                onLearnMore={handleLearnMore}
              />
            ))}
          </div>
        </div>

        <div className="w-full">
          <h2 className="text-3xl font-semibold text-blue-700 text-center mb-6">AgroTech by Ceyplanta</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {agroTechProducts.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                bgColor="bg-blue-500"
                hoverBgColor="bg-blue-600"
                onLearnMore={handleLearnMore}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal for displaying product details */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Details for {selectedProduct.name}</h2>
            {selectedProduct.name === "Microgreens" && (
              <ul>
                {microgreensDetails[selectedProduct.name].map((item, index) => (
                  <li key={index} className="mb-2">
                    <strong>{item.name}:</strong> {item.description}
                  </li>
                ))}
              </ul>
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
    </div>
  );
};

export default ServiceProducts;