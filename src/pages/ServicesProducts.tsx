import React, { JSX, useState, useRef, useEffect } from "react";
import "../styles/ServicesProducts.css";
import { Factory, Wrench, Boxes, Droplets } from "lucide-react";

/* ================= TYPES ================= */

type Product = {
  name: string;
  description: string;
  icon: JSX.Element;
};

type ProductCardProps = {
  product: Product;
  onLearnMore: (product: Product) => void;
  className?: string;
};

// type MicrogreenDetail = {
//   name: string;
//   description: string;
//   image: string;
//   nutritionalFacts: string[];
//   benefits: string[];
// };

type StockItem = {
  name: string;
  spec?: string;
  inStock: boolean;
};

/* ================= STOCK DATA ================= */

const stockByCategory: Record<string, StockItem[]> = {
  "Agriculture & Crops Related Materials": [
  ],
};

/* ================= PRODUCT CARD ================= */

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onLearnMore,
  className,
}) => {
  return (
    <button
      type="button"
      onClick={() => onLearnMore(product)}
      className={`bg-white border border-gray-200 rounded-xl shadow-lg p-6 text-center transition-transform transform hover:scale-105 w-full ${className}`}
    >
      <div className="flex justify-center mb-4 text-gray-800">
        {product.icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {product.name}
      </h3>
      <p className="text-gray-600">{product.description}</p>
    </button>
  );
};

/* ================= MAIN COMPONENT ================= */

const ServiceProducts: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      modalRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isModalOpen]);

  /* ================= PRODUCTS ================= */

  const otherProductsAndServices: Product[] = [
    {
      name: "Industrial Materials & Machines (Local + Imported)",
      description:
        "Industrial-grade materials and machinery sourcing and supply.",
      icon: <Factory className="text-green-600 w-10 h-10" />,
    },
    {
      name: "Problem-Solution Services",
      description:
        "We analyze your requirement and provide the best solution.",
      icon: <Wrench className="text-green-600 w-10 h-10" />,
    },
    {
      name: "Automated Systems (Including Irrigation)",
      description:
        "Automation solutions including water irrigation systems.",
      icon: <Droplets className="text-green-600 w-10 h-10" />,
    },
    {
      name: "Agriculture & Crops Related Materials",
      description:
        "Inputs and materials related to crops and farming operations.",
      icon: <Boxes className="text-green-600 w-10 h-10" />,
    },
  ];

  const handleLearnMore = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const stockItems = selectedProduct
    ? stockByCategory[selectedProduct.name]
    : undefined;

  /* ================= RENDER ================= */

  return (
    <div className="services-products">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Other Products & Services
      </h1>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        

        {/* Left: AgroTech Products */}
          <div className="w-full">
            <div className="grid-container">
              {otherProductsAndServices.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                onLearnMore={handleLearnMore}
                className="product-card green-card"
              />
            ))}                   
            </div>
          </div>
      </section>

      {/* ================= MODAL ================= */}

      {isModalOpen && selectedProduct && (
        <div
          ref={modalRef}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50"
        >
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {selectedProduct.name}
            </h2>

            {/* STOCK LIST */}
            {stockItems ? (
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  Check on Buy Greens Page for availability.
                </h3>

                <ul className="space-y-2">
                  {stockItems.map((item, idx) => (
                    <li
                      key={idx}
                      className="
                        flex justify-between items-center
                        border border-gray-300 dark:border-gray-700
                        rounded-md p-3
                        bg-gray-50 dark:bg-gray-800
                      "
                    >
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {item.name}
                        {item.spec && (
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {" "}
                            ({item.spec})
                          </span>
                        )}
                      </span>

                      <span
                        className={`text-sm font-semibold ${
                          item.inStock
                            ? "text-green-700 dark:text-green-400"
                            : "text-red-700 dark:text-red-400"
                        }`}
                      >
                        {item.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-gray-700 dark:text-gray-300">
                Detailed information will be provided on request.
              </p>
            )}

            <button
              onClick={closeModal}
              className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
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
