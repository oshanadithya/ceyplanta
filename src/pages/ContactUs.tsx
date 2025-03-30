import "../styles/ContactUs.css";
import { FaFacebookF, FaInstagram, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt  } from "react-icons/fa";

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
          <br></br>
          <div className="contact-item">
            <FaMapMarkerAlt className="text-red-600" />
            <br></br>
            <span>No 235, Galle Rd, Thalpitiya South, Wadduwa</span>
          </div>
          <br></br>
          <div className="map-container mb-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d990.6865978259807!2d79.92260282850302!3d6.678309531585808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae24f14e0e9d451%3A0x97e0fcaba4d9ff0b!2sCeyplanta!5e0!3m2!1sen!2slk!4v1743340285926!5m2!1sen!2slk"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
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
