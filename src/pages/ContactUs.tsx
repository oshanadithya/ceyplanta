import '../styles/ContactUs.css';
import facebookLogo from '../assets/facebook-logo.png';

const ContactUs = () => {
  return (
    <div className="contact-us">
      <h1>📞 Contact Us</h1>
      <p>We're here to help you! Reach us through any of the following methods:</p>
      <div className="contact-details">
        <p><strong>Phone:</strong> <a href="tel:+94702342433">+94 70 234 2433</a></p>
        <p><strong>Email:</strong> <a href="mailto:ceyplanta@gmail.com">ceyplanta@gmail.com</a></p>
      </div>
      <div className="social-media">
        <a href="https://web.facebook.com/profile.php?id=61573903899364" 
           target="_blank" 
           rel="noopener noreferrer" 
           className="social-button">
          <img src={facebookLogo} alt="Facebook" className="social-icon" />
          Follow Us on Facebook
        </a>
      </div>
    </div>
  );
};

export default ContactUs;
