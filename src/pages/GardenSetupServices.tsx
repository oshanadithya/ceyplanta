import React from "react";
import "../styles/ServicesProducts.css";

const GardenSetupServices: React.FC = () => {
  return (
    <div className="services-products">
      <h1 className="green-heading">Ceyplanta Indoor & Outdoor Garden Setup Services</h1>

      <div className="services">
        <h2>Grow Your Own Food. Beautify Your Space. Live Healthier.</h2>
        <p>
          Ceyplanta (Pvt) Ltd offers complete indoor and outdoor garden setup services for homes,
          apartments, offices, cafés, and restaurants across Colombo, Panadura, and Kalutara.
          We design, install, and maintain edible and decorative gardens — customized to your space and lifestyle.
        </p>

        <p>
          <b>Book a Free Garden Planning Visit:</b> <br />
          Call / WhatsApp: <b>+94 70 234 2433</b> <br />
          Website: <b>www.ceyplanta.com</b>
        </p>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="https://wa.me/94702342433"
            target="_blank"
            rel="noreferrer"
            style={{
              background: "#16a085",
              color: "white",
              padding: "10px 16px",
              borderRadius: "8px",
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
              borderRadius: "8px",
              textDecoration: "none",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            Visit Website
          </a>
        </div>
      </div>

      {/* Starter Packages */}
      <div className="products">
        <h2>🌱 Starter Packages</h2>

        <div className="grid-container">
          <div className="product-card green-card">
            <h3 className="pcname">🌿 Balcony Edible Garden – Starter Package</h3>
            <p className="pcicon"><b>Perfect for:</b> Apartments & Small Spaces</p>
            <p className="pcicon">Turn your balcony into a mini organic food garden.</p>
            <p className="pcicon"><b>Includes:</b></p>
            <p className="pcicon">
              ✔ 5–8 grow bags <br />
              ✔ Premium soil mix <br />
              ✔ 5–8 edible plants (Mint, Lettuce, Mi 2, Basil, Gotukola) <br />
              ✔ Professional installation <br />
              ✔ Plant care guidance <br />
              ✔ 1 free follow-up visit
            </p>
            <p className="pcicon"><b>Starting From:</b> Rs 18,500</p>
            <p className="pcicon">
              Optional Add-ons: Drip irrigation system, decorative pots upgrade, monthly maintenance plan
            </p>
          </div>

          <div className="product-card green-card">
            <h3 className="pcname">🌿 Home Edible Garden Setup</h3>
            <p className="pcicon"><b>Perfect for:</b> Houses with Garden Space</p>
            <p className="pcicon">Create your own chemical-free vegetable supply at home.</p>
            <p className="pcicon"><b>Includes:</b></p>
            <p className="pcicon">
              ✔ 10–25 grow bags <br />
              ✔ Chili (Mi 2 / Nai Miris / MiCH HY) <br />
              ✔ Capsicum / Cherry Tomato <br />
              ✔ Leafy greens (Mint, Basil, Lettuce, Gotukola) <br />
              ✔ Layout planning + installation <br />
              ✔ Basic watering system setup
            </p>
            <p className="pcicon"><b>Starting From:</b> Rs 35,000</p>
            <p className="pcicon">
              Optional: Automatic drip irrigation system, weekly/monthly maintenance
            </p>
          </div>

          <div className="product-card green-card">
            <h3 className="pcname">🌸 Decorative + Edible Premium Garden</h3>
            <p className="pcicon"><b>Perfect for:</b> Modern Homes, Offices & Cafés</p>
            <p className="pcicon">Combine beauty and food in one elegant garden design.</p>
            <p className="pcicon"><b>Includes:</b></p>
            <p className="pcicon">
              ✔ Decorative pots <br />
              ✔ Edible herb plants <br />
              ✔ Flowering plants <br />
              ✔ Styled layout design <br />
              ✔ Installation service
            </p>
            <p className="pcicon"><b>Custom Pricing</b> (based on design)</p>
          </div>
        </div>
      </div>

      {/* Irrigation */}
      <div className="services">
        <h2>💧 Irrigation Installation Services</h2>
        <p>
          Save water and time with smart watering solutions. We install:
          <br />✔ Basic drip irrigation systems
          <br />✔ Timer-based watering systems
          <br />✔ Water-saving setups for balconies & gardens
        </p>
        <p><b>Available as an add-on to all packages.</b></p>
      </div>

      {/* Maintenance */}
      <div className="products">
        <h2>🔁 Maintenance Plans (Recommended)</h2>
        <p>
          Keep your garden healthy and productive.
          <br /><b>Weekly Maintenance:</b> watering, pruning, fertilizing, pest monitoring
          <br /><b>Monthly Maintenance:</b> inspection, soil enhancement, plant replacement, seasonal adjustments
        </p>
        <p><b>Starting from:</b> Rs 3,000 per visit</p>
      </div>

      {/* How it works */}
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

      {/* Why choose */}
      <div className="products">
        <h2>🌿 Why Choose Ceyplanta?</h2>
        <p>
          ✔ Own nursery-grown plants <br />
          ✔ Premium soil mix <br />
          ✔ Affordable grow bag solutions <br />
          ✔ Custom designs <br />
          ✔ Reliable after-service <br />
          ✔ Based in Panadura – Serving Colombo & Kalutara
        </p>
      </div>
    </div>
  );
};

export default GardenSetupServices;
