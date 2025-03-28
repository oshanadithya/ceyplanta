import "../styles/OffersAndDiscounts.css";
import { FaGift, FaTag } from "react-icons/fa";

const OffersAndDiscounts = () => {
  return (
    <div className="offers-page">
      <div className="offers-card">
        <h1>Exclusive Offers & Discounts</h1>
        <p>Enjoy special deals on our freshest microgreens and premium green tea selections!</p>

        {/* Offers Section */}
        <div className="offers-list">
          {/* <div className="offer-item">
            <FaLeaf className="offer-icon" />
            <h2>Fresh Microgreens Deal</h2>
            <p>Buy 4 packs of 100g, Get 1 Free! Available for all microgreen varieties.</p>
          </div> */}

          <div className="offer-item">
            <FaTag className="offer-icon" />
            <h2>Prepaid Subscription Offers</h2>
            <p>10% Discount for Customers Subscribe more than 3 months</p>
          </div>

          <div className="offer-item">
            <FaTag className="offer-icon" />
            <h2>Green Tea Discount</h2>
            <p>5% off on all green tea orders above Rs. 2000!</p>
          </div>

          {/* <div className="offer-item">
            <FaTag className="offer-icon" />
            <h2>Delivery Free</h2>
            <p>Free Delivery for Customer subscribe more than 4 months!</p>
          </div> */}

          <div className="offer-item">
            <FaGift className="offer-icon" />
            <h2>Welcome Offer</h2>
            <p>First-time customers get 10% off their first purchase.</p>
          </div>

          <div className="offer-item">
            <FaGift className="offer-icon" />
            <h2>Referral Program</h2>
            <p>Refer a friend and get 10% off your next month</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="cta-section">
          <p>Hurry! These offers are for a limited time only.</p>
          <a href="/buy-greens" className="shop-now-button">Shop Now</a>
        </div>
      </div>
    </div>
  );
};

export default OffersAndDiscounts;
