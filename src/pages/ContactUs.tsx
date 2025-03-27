import "../styles/ContactUs.css";
import { FaFacebookF, FaInstagram, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="contact-us">
      <div className="contact-card">
        <h1>Get in Touch</h1>
        <p>We’d love to hear from you! Reach out through any of the following methods:</p>

        {/* Contact Details */}
        <div className="contact-details">
          <div className="contact-item">
            <FaPhoneAlt className="contact-icon" />
            <br></br>
            <a href="tel:+94702342433">+94 70 234 2433</a>
          </div>
          <br></br>
          <div className="contact-item">
            <FaEnvelope className="contact-icon" />
            <br></br>
            <a href="mailto:ceyplanta@gmail.com">ceyplanta@gmail.com</a>
          </div>
          <div className="contact-item">
            {/* <FaEnvelope className="road-icon" /> */}
            <br></br>
            <a>66A 1/1, Hirana Road, Panadura</a>
          </div>
        </div>

        <br></br>
        <br></br>
        {/* Subscription Packages */}
        <div className="subscription-packages" >
          <h2>Subscription Packages</h2>
          <div className="package">
            <h3>Weekly Package</h3>
            <p>Enjoy our services for one week.</p>
            <p><strong>Price:</strong> LKR 500</p>
            <button className="request-button">Request</button>
          </div>
          <div className="package">
            <h3>Monthly Package</h3>
            <p>Enjoy our services for one month.</p>
            <p><strong>Price:</strong> LKR 1500</p>
            <button className="request-button">Request</button>
          </div>
        </div>

        {/* Social Media */}
        <div className="social-media">
          <a href="https://web.facebook.com/profile.php?id=61573903899364" 
             target="_blank" 
             rel="noopener noreferrer" 
             className="social-button facebook">
            <FaFacebookF className="social-icon" />
            Facebook
          </a>
          
          <a href="https://www.instagram.com/ceyplanta" 
             target="_blank" 
             rel="noopener noreferrer" 
             className="social-button instagram">
            <FaInstagram className="social-icon" />
            Instagram
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
