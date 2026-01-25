import "../styles/ContactUs.css";
import { FaFacebookF, FaInstagram, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="contact-us">
      <div className="contact-card">
        <h1>Get in Touch</h1>
        <p>We’d love to hear from you! Reach out through any of the following methods:</p>

        {/* Contact Details */}
        <div className="contact-details">
          <div className="contact-item">
            <FaPhoneAlt className="contact-icon" style={{ color: "#25D366" }}/>
            <br />
            <a href="tel:+94702342433">+94 70 234 2433</a>
          </div>
          <br />
          <div className="contact-item">
            <FaEnvelope className="contact-icon" style={{ color: "#f73e3eff" }} />
            <br />
            <a href="mailto:ceyplanta@gmail.com">ceyplanta@gmail.com</a>
          </div>
          <br />
          <div className="contact-item">
            <FaMapMarkerAlt className="contact-icon" style={{ color: "#49a7ffff" }} />
            <br />
            <a>Branch 01. | No 235, Galle Rd, Thalpitiya South, Wadduwa, Sri Lanka</a>
            <br />
            <br />
            <a>Branch 02. | Nidola Estate, Kudadola Estate Road, Thannahena, Bulathsinhala, Sri Lanka</a>
          </div>
          <br />
          <div className="contact-item">
            <FaWhatsapp className="contact-icon" style={{ color: "#25D366" }} />
            <br />
            <a
              href="https://wa.me/94702342433?text=Hello%20Ceyplanta!"
              target="_blank"
              rel="noopener noreferrer"
            >
              Inquiries on WhatsApp 
            </a>
          </div>
          <br />
          <div className="map-container mb-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.4600149399776!2d80.19573788388861!3d6.589602176396931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae3c919c24315ab%3A0xc15fa364bd39ce2d!2sNildola%20Estate!5e0!3m2!1sen!2slk!4v1769361753832!5m2!1sen!2slk"
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
          <a
            href="https://web.facebook.com/profile.php?id=61573903899364"
            target="_blank"
            rel="noopener noreferrer"
            className="social-button facebook"
          >
            <FaFacebookF className="social-icon" />
            Facebook
          </a>

          <a
            href="https://www.instagram.com/ceyplanta"
            target="_blank"
            rel="noopener noreferrer"
            className="social-button instagram"
          >
            <FaInstagram className="social-icon" />
            Instagram
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
