import React, { JSX, useEffect, useMemo, useRef, useState } from "react";
import "../styles/ServicesProducts.css";
import { Factory, Wrench } from "lucide-react";

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

type StockItem = {
  name: string;
  spec?: string;
  inStock: boolean;
};

/* ================= STOCK DATA ================= */

const stockByCategory: Record<string, StockItem[]> = {
  "Agriculture & Crops Related Materials": [],
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

  // ✅ This section is on the SAME page (no route).
  const gardenSectionRef = useRef<HTMLDivElement | null>(null);
  const [showGardenSection, setShowGardenSection] = useState(false);

  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      modalRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isModalOpen]);

  /* ================= PRODUCTS ================= */

  const otherProductsAndServices: Product[] = useMemo(
    () => [
      {
        name: "Industrial Materials & Machines (Local + Imported)",
        description:
          "Industrial-grade materials and machinery sourcing and supply.",
        icon: <Factory className="text-green-600 w-10 h-10" />,
      },
      {
        name: "Indoor & Outdoor Garden Setup Solution Services",
        description:
          "Edible + decorative garden setup, installation, irrigation, and maintenance for homes, apartments, offices, and restaurants.",
        icon: <Wrench className="text-green-600 w-10 h-10" />,
      },
      // {
      //   name: "Agriculture & Crops Related Materials",
      //   description:
      //     "Inputs and materials related to crops and farming operations.",
      //   icon: <Boxes className="text-green-600 w-10 h-10" />,
      // },
    ],
    []
  );

  const handleLearnMore = (product: Product) => {
    // ✅ Special behavior for Garden Setup: show section on same page.
    if (product.name === "Indoor & Outdoor Garden Setup Solution Services") {
      setShowGardenSection(true);

      // Scroll to the content after it is rendered.
      setTimeout(() => {
        gardenSectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 50);

      // (Optional) also open modal? We will NOT open modal for this item.
      return;
    }

    // Default behavior for other cards: open modal.
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

      {/* ================= GARDEN SETUP CONTENT (SAME PAGE) ================= */}

      {showGardenSection && (
        <div ref={gardenSectionRef} style={{ marginTop: 40 }}>
          <h1 className="green-heading">
            Ceyplanta Indoor & Outdoor Garden Setup Services
          </h1>

          <div style={{ textAlign: "center", margin: "100px 0" }}>
            <img
              src="/images/gs1.png"
              alt="Ceyplanta Garden Setup Service"
              style={{
                height: "600px",
                width: "100%",
                maxWidth: "900px",
                borderRadius: "12px",
                boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
              }}
            />
          </div>
        
          <div className="services">
            <h2>Grow Your Own Food. Beautify Your Space. Live Healthier.</h2>
            <p>
              Ceyplanta (Pvt) Ltd offers complete indoor and outdoor garden setup
              services for homes, apartments, offices, cafés, and restaurants
              across Starting from Negombo to Down South Areas. We design, install, and
              maintain edible and decorative gardens — customized to your space
              and lifestyle.
            </p>

            <p>
              <b>Book a Free Garden Planning Visit:</b>
              <br />
              Call / WhatsApp: <b>+94 70 234 2433</b>
              <br />
              Website: <b>www.ceyplanta.com</b>
            </p>

            <div
              style={{
                display: "flex",
                gap: 12,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <a
                href="https://wa.me/94702342433"
                target="_blank"
                rel="noreferrer"
                style={{
                  background: "#16a085",
                  color: "white",
                  padding: "10px 16px",
                  borderRadius: 8,
                  textDecoration: "none",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
              >
                WhatsApp Now
              </a>

              <a
                href="https://www.ceyplanta.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  background: "#2c3e50",
                  color: "white",
                  padding: "10px 16px",
                  borderRadius: 8,
                  textDecoration: "none",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
              >
                Visit Ceyplanta.com
              </a>

              <button
                type="button"
                onClick={() => setShowGardenSection(false)}
                style={{
                  background: "white",
                  color: "#2c3e50",
                  padding: "10px 16px",
                  borderRadius: 8,
                  border: "1px solid rgba(0,0,0,0.15)",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.06)",
                  cursor: "pointer",
                }}
              >
                Hide Details
              </button>
            </div>
          </div>

          <div style={{ textAlign: "center", margin: "100px 0" }}>
            <img
              src="/images/gs2.jpg"
              alt="Ceyplanta Garden Setup Service"
              style={{
                height: "600px",
                width: "100%",
                maxWidth: "900px",
                borderRadius: "12px",
                boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
              }}
            />
          </div>

          <div className="products">
            <h2>🌱 Starter Packages</h2>

            <div className="grid-container">
              <div className="product-card green-card">
                <h3 className="pcname">
                  🌿 Balcony Edible Garden – Starter Package
                </h3>
                <p className="pcicon">
                  <b>Perfect for:</b> Apartments & Small Spaces
                </p>
                <p className="pcicon">
                  Turn your balcony into a mini organic food garden.
                </p>
                <p className="pcicon">
                  <b>Includes:</b>
                </p>
                <p className="pcicon">
                  ✔ 5–8 grow bags <br />
                  ✔ Premium soil mix <br />
                  ✔ 5–8 edible plants (Mint, Lettuce, Mi 2, Basil, Gotukola){" "}
                  <br />
                  ✔ Professional installation <br />
                  ✔ Plant care guidance <br />
                  ✔ 1 free follow-up visit
                </p>
                <p className="pcicon">
                  <b>Starting From:</b> Rs 18,500
                </p>
                <p className="pcicon">
                  Optional Add-ons: Drip irrigation system, decorative pots
                  upgrade, monthly maintenance plan
                </p>
              </div>

              <div className="product-card green-card">
                <h3 className="pcname">🌿 Home Edible Garden Setup</h3>
                <p className="pcicon">
                  <b>Perfect for:</b> Houses with Garden Space
                </p>
                <p className="pcicon">
                  Create your own chemical-free vegetable supply at home.
                </p>
                <p className="pcicon">
                  <b>Includes:</b>
                </p>
                <p className="pcicon">
                  ✔ 10–25 grow bags <br />
                  ✔ Chili (Mi 2 / Nai Miris / MiCH HY) <br />
                  ✔ Capsicum / Cherry Tomato <br />
                  ✔ Leafy greens (Mint, Basil, Lettuce, Gotukola) <br />
                  ✔ Layout planning + installation <br />
                  ✔ Basic watering system setup
                </p>
                <p className="pcicon">
                  <b>Starting From:</b> Rs 35,000
                </p>
                <p className="pcicon">
                  Optional: Automatic drip irrigation system, weekly/monthly
                  maintenance
                </p>
              </div>

              <div className="product-card green-card">
                <h3 className="pcname">🌸 Decorative + Edible Premium Garden</h3>
                <p className="pcicon">
                  <b>Perfect for:</b> Modern Homes, Offices & Cafés
                </p>
                <p className="pcicon">
                  Combine beauty and food in one elegant garden design.
                </p>
                <p className="pcicon">
                  <b>Includes:</b>
                </p>
                <p className="pcicon">
                  ✔ Decorative pots <br />
                  ✔ Edible herb plants <br />
                  ✔ Flowering plants <br />
                  ✔ Styled layout design <br />
                  ✔ Installation service
                </p>
                <p className="pcicon">
                  <b>Custom Pricing</b> (based on design)
                </p>
              </div>
            </div>
          </div>

          <div className="services">
            <h2>💧 Irrigation Installation Services</h2>
            <p>
              Save water and time with smart watering solutions. We install:
              <br />
              ✔ Basic drip irrigation systems
              <br />
              ✔ Timer-based watering systems
              <br />
              ✔ Water-saving setups for balconies & gardens
            </p>
            <p>
              <b>Available as an add-on to all packages.</b>
            </p>
          </div>

          <div className="products">
            <h2>🔁 Maintenance Plans (Recommended)</h2>
            <p>
              Keep your garden healthy and productive.
              <br />
              <b>Weekly Maintenance:</b> watering, pruning, fertilizing, pest
              monitoring
              <br />
              <b>Monthly Maintenance:</b> inspection, soil enhancement, plant
              replacement, seasonal adjustments
            </p>
            <p>
              <b>Starting from:</b> Rs 3,000 per visit
            </p>
          </div>

          <div className="services">
            <h2>🛠 How It Works</h2>
            <p>
              1) Contact us <br />
              2) Free site visit & measurement <br />
              3) Customized garden plan <br />
              4) Quotation sent via WhatsApp <br />
              5) 50% advance payment <br />
              6) Installation <br />
              7) Ongoing maintenance support
            </p>
          </div>

          <div className="products">
            <h2>🌿 Why Choose Ceyplanta?</h2>
            <p>
              ✔ Own nursery-grown plants <br />
              ✔ Premium soil mix <br />
              ✔ Affordable grow bag solutions <br />
              ✔ Custom designs <br />
              ✔ Reliable after-service <br />
              ✔ Based in Panadura – Serving Across Western province to Down South
            </p>
          </div>
        </div>
      )}

      {/* ================= MODAL (for other items) ================= */}

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
