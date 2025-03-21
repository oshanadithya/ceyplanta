import { useState, useRef  } from "react";
import "../styles/buy-greens.css"; // Add styles for this page
import emailjs from 'emailjs-com';

const BuyGreens = () => {
    // Initialize EmailJS with your user ID
    emailjs.init('_BVjspFpxrJqFVQpM');
    const [cart, setCart] = useState<{ name: string; selectedWeight: string; selectedPrice: string }[]>([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    type Product = {
        id: number;
        name: string;
        description: string;
        image: string;
        nutritionalFacts: string[];
        benefits: string[];
        price: string;
        weightOptions: { weight: string; price: string }[];
        selectedPrice?: string;  // Add this line to make selectedPrice optional
        noStock: boolean;
    };
    const [products] = useState<Product[]>([
        {
            id: 1,
            name: "Radish",
            description: "Spicy and crisp, perfect for salads.",
            image: "/images/redraddish.jpg",
            nutritionalFacts: [
              "High in Vitamin C",
              "Rich in Antioxidants",
              "Low in Calories",
              "Contains Potassium",
              "Good Source of Fiber",
            ],
            benefits: [
              "Boosts Immunity",
              "Improves Digestion",
              "Good for Heart Health",
              "Supports Skin Health",
            ],
            price: "400",
            weightOptions: [
              { weight: "50g", price: "300" },
              { weight: "100g", price: "500" },
            ],
            noStock: false,
          },
          {
            id: 2,
            name: "Kangkung",
            description: "Nutrient-rich, ideal for stir-fries.",
            image: "/images/kangkung.jpg",
            nutritionalFacts: [
              "Rich in Iron",
              "High in Fiber",
              "Contains Vitamin A",
              "Good Source of Calcium",
            ],
            benefits: [
              "Prevents Anemia",
              "Aids Digestion",
              "Supports Eye Health",
              "Strengthens Bones",
            ],
            price: "350",
            weightOptions: [
              { weight: "50g", price: "350" },
              { weight: "100g", price: "550" },
            ],
            noStock: false,
          },
          {
            id: 3,
            name: "Beetroot",
            description: "Sweet and earthy, great for juices and salads.",
            image: "/images/beetroot.jpg",
            nutritionalFacts: [
              "Rich in Folate",
              "Good Source of Nitrates",
              "High in Fiber",
              "Contains Iron",
              "Rich in Antioxidants",
            ],
            benefits: [
              "Boosts Stamina",
              "Lowers Blood Pressure",
              "Supports Brain Function",
              "Promotes Detoxification",
            ],
            price: "450",
            weightOptions: [
              { weight: "50g", price: "400" },
              { weight: "100g", price: "700" },
            ],
            noStock: false,
          },
          {
            id: 4,
            name: "Amaranth",
            description:
              "bright green color and have a mild, slightly nutty flavor with a delicate crunch.",
            image: "/images/g-amaranth.jpg",
            nutritionalFacts: [
              "High in Vitamins A, C, and K",
              "Rich in Iron",
              "Good Source of Protein",
              "Contains Calcium",
            ],
            benefits: [
              "Supports Vision",
              "Boosts Immunity",
              "Strengthens Bones",
              "Promotes Healthy Skin",
            ],
            price: "500",
            weightOptions: [
              { weight: "50g", price: "350" },
              { weight: "100g", price: "600" },
            ],
            noStock: false,
          },
          {
            id: 5,
            name: "Red Amaranth",
            description:
              "Vibrant and nutritious, packed with antioxidants and great in soups or stir-fries.",
            image: "/images/amaranth.jpg",
            nutritionalFacts: [
              "High in Vitamins folate (Betalains), potassium, and magnesium",
              "Rich in antioxidants",
              "Good Source of Protein",
              "Contains Calcium",
            ],
            benefits: [
              "Supports Vision",
              "Boosts Immunity",
              "Strengthens Bones",
              "Promotes Healthy Skin",
            ],
            price: "500",
            weightOptions: [
              { weight: "50g", price: "350" },
              { weight: "100g", price: "600" },
            ],
            noStock: true,
          },
          {
            id: 6,
            name: "Mustard",
            description:
              "Peppery and flavorful, commonly used in salads and Indian cuisine.",
            image: "/images/mustard.jpg",
            nutritionalFacts: [
              "Rich in Vitamin K",
              "High in Antioxidants",
              "Contains Fiber",
              "Good Source of Magnesium",
            ],
            benefits: [
              "Aids Digestion",
              "Supports Heart Health",
              "Boosts Metabolism",
              "Has Anti-Inflammatory Properties",
            ],
            price: "700",
            weightOptions: [
              { weight: "50g", price: "600" },
              { weight: "100g", price: "1150" },
            ],
            noStock: true,
          },
          {
            id: 7,
            name: "Cabbage",
            description:
              "Crunchy and versatile, great for salads, stir-fries, and fermented dishes.",
            image: "/images/cabbage.jpg",
            nutritionalFacts: [
              "Rich in Vitamin C",
              "High in Fiber",
              "Contains Sulfur Compounds",
              "Good Source of Folate",
            ],
            benefits: [
              "Supports Gut Health",
              "Reduces Inflammation",
              "Strengthens Immunity",
              "Aids in Detoxification",
            ],
            price: "650",
            weightOptions: [
              { weight: "50g", price: "650" },
              { weight: "100g", price: "1200" },
            ],
            noStock: true,
          },
          {
            id: 8,
            name: "Kale",
            description:
              "Highly nutritious and rich in fiber, perfect for smoothies and sautés.",
            image: "/images/kale.jpg",
            nutritionalFacts: [
              "High in Vitamin A, C, and K",
              "Rich in Fiber",
              "Contains Omega-3 Fatty Acids",
              "Good Source of Calcium",
            ],
            benefits: [
              "Enhances Brain Function",
              "Supports Heart Health",
              "Promotes Healthy Skin",
              "Strengthens Bones",
            ],
            price: "400",
            weightOptions: [
              { weight: "50g", price: "400" },
              { weight: "100g", price: "750" },
            ],
            noStock: true,
          },
          {
            id: 9,
            name: "Basil",
            description:
              "Aromatic and flavorful, essential for pesto and Italian dishes.",
            image: "/images/basil.jpg",
            nutritionalFacts: [
              "Rich in Vitamin K",
              "Contains Manganese",
              "Good Source of Magnesium",
              "High in Antioxidants",
            ],
            benefits: [
              "Reduces Stress",
              "Supports Liver Health",
              "Fights Infections",
              "Aids Digestion",
            ],
            price: "600",
            weightOptions: [
              { weight: "50g", price: "600" },
              { weight: "100g", price: "1100" },
            ],
            noStock: true,
          },
          {
            id: 10,
            name: "Coriander",
            description:
              "Fresh and citrusy, widely used in curries, salads, and garnishes.",
            image: "/images/coriander.jpg",
            nutritionalFacts: [
              "High in Vitamin A, C, and K",
              "Rich in Potassium",
              "Good Source of Manganese",
              "Contains Antioxidants",
            ],
            benefits: [
              "Detoxifies Heavy Metals",
              "Aids Digestion",
              "Lowers Blood Sugar",
              "Supports Skin Health",
            ],
            price: "700",
            weightOptions: [
              { weight: "50g", price: "700" },
              { weight: "100g", price: "1350" },
            ],
            noStock: true,
          },
          {
            id: 11,
            name: "Premium Green Tea ",
            description:
              "Pure and natural 100% organic hand plucked green tea leaves for a healthy life.",
            image: "/images/greentea.jpg",
            nutritionalFacts: [
              "Contains Antioxidants",
            ],
            benefits: [
              "Detoxifies Heavy Metals",
              "Aids Digestion",
              "Lowers Blood Sugar",
              "Supports Skin Health",
            ],
            price: "800",
            weightOptions: [
              { weight: "20g", price: "250" },
              { weight: "50g", price: "400" },
              { weight: "100g", price: "650" },
            ],
            noStock: false,
          },
          {
            id: 12,
            name: "Premium Cinnamon",
            description:
              "High-quality Ceylon cinnamon for cooking and health benefits.",
            image: "/images/cinnamon-sticks.jpg",
            nutritionalFacts: [
              "Contains Antioxidants",
            ],
            benefits: [
              "Lower total cholesterol levels",
              "Aids Digestion",
              "Lower your triglycerides",
              "Supports Skin Health",
            ],
            price: "600",
            weightOptions: [
              { weight: "50g", price: "600" },
              { weight: "100g", price: "1100" },
            ],
            noStock: false,
          },
    ]);

    const cartRef = useRef<HTMLDivElement | null>(null);

    const handleScrollToCart = () => {
      cartRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
      
    const handleAddToCart = (product: any, selectedWeight: any) => {
        setCart((prevCart) => [
            ...prevCart,
            {
                name: product.name,
                selectedWeight: selectedWeight.weight,
                selectedPrice: selectedWeight.price,
            },
        ]);
    };

    const handleCheckout = () => {
        // Check if all required fields are filled
        if (!name || !email || !phone ) {
            alert('Please fill out all the required fields!');
            return;
        }

        // Construct the cart items list
        const cartItems = cart.map(item => `${item.name} - ${item.selectedWeight} - Rs. ${item.selectedPrice}`).join('\n');

        // Create the email content
        const checkoutMessage = `
            Name: ${name}
            Email: ${email}
            Phone: ${phone}
            Message: ${message}
            
            Cart:
            ${cartItems}
        `;

        // Send email using EmailJS
        sendEmailToAdmin(checkoutMessage);
    };

    const sendEmailToAdmin = (messageContent: any) => {
        // EmailJS service and template IDs
        const serviceID = 'service_18vf6wc'; // Replace with your service ID
        const templateID = 'template_xcb8ynu'; // Replace with your template ID

        // Send email using EmailJS
        emailjs.send(serviceID, templateID, {
            name,
            email,
            phone,
            message,
            cartItems: messageContent, // Pass cart items
        })
        .then(() => {
            alert('Your order has been placed successful. You will be contact soon by our team, Thank You!');
            // Reset form and cart
            setName('');
            setEmail('');
            setPhone('');
            setMessage('');
            setCart([]);
        })
        .catch((error) => {
            console.error('Error placing order!:', error);
            alert('There was an error placing your order. Please try again later!');
        });
    };

    const calculateTotal = () => {
        // Sum up the prices of the items in the cart
        return cart.reduce((total, item) => total + parseFloat(item.selectedPrice), 0);
    };

    const clearCart = () => {
      setCart([]); // Assuming `setCart` is your state updater for the cart
    };
  
    
    return (
        <div className="buy-greens-page">
          {/* Cart Icon */}
          <button className="cart-icon-btn" onClick={handleScrollToCart}>
                🛒 {/* You can replace this with any cart icon */}
            </button>
            <h1>Buy Greens</h1>
            <div className="product-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <img src={product.image} alt={product.name} className="product-image" />
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>

                        {product.noStock ? (
                            <button className="no-stock-btn" disabled>Not Available</button>
                        ) : (
                            <div className="price-and-weight">
                                {product.weightOptions.map((option) => (
                                    <button 
                                        key={option.weight} 
                                        className="weight-btn"
                                        onClick={() => handleAddToCart(product, option)}
                                    >
                                        {option.weight} - Rs. {option.price}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
    
            <br />
            <div ref={cartRef} className="cart">
              <h2>Your Cart</h2>
              {cart.length > 0 ? (
                  <div>
                      <ul>
                          {cart.map((item, index) => (
                              <li key={index}>
                                  {item.name} - {item.selectedWeight} - Rs. {item.selectedPrice}
                              </li>
                          ))}
                      </ul>
                      <h3>Total: Rs. {calculateTotal()}</h3>
                      
                      {/* Clear Cart Button */}
                      <button className="clear-cart-btn" onClick={clearCart}>
                          Clear Cart
                      </button>
                  </div>
              ) : (
                  <p>Your cart is empty.</p>
              )}
          </div>
    
            <div className="checkout-form">
                <h2>Checkout</h2>
                <input
                    type="text"
                    value={name}
                    placeholder="Your Name"
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    value={email}
                    placeholder="Your Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                  type="number"
                  value={phone}
                  placeholder="Your Phone Number"
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  inputMode="tel" // Optimizes for numeric input on mobile devices
                  pattern="[0-9]" // Only allows numbers to be entered
              />
                <textarea
                    value={message}
                    placeholder="Additional Details (Delivery Address / Need Support)"
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={handleCheckout}>Checkout</button>
            </div>
        </div>
    );
};

export default BuyGreens;