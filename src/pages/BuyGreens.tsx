import React, { useState } from "react";
import "../styles/buy-greens.css"; // Add styles for this page
import emailjs from 'emailjs-com';

const BuyGreens = () => {
    // Initialize EmailJS with your user ID
    emailjs.init('_BVjspFpxrJqFVQpM');
    const [cart, setCart] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [products, setProducts] = useState([
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
              { weight: "50g", price: "400" },
              { weight: "100g", price: "750" },
            ],
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
              { weight: "100g", price: "650" },
            ],
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
              { weight: "50g", price: "450" },
              { weight: "100g", price: "850" },
            ],
          },
          {
            id: 4,
            name: "Amaranth",
            description:
              "Vibrant and nutritious, packed with antioxidants and great in soups or stir-fries.",
            image: "/images/amaranth.jpg",
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
              { weight: "50g", price: "500" },
              { weight: "100g", price: "950" },
            ],
          },
          {
            id: 5,
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
              { weight: "50g", price: "700" },
              { weight: "100g", price: "1350" },
            ],
          },
          {
            id: 6,
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
          },
          {
            id: 7,
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
          },
          {
            id: 8,
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
          },
          {
            id: 9,
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
          },
          {
            id: 10,
            name: "Green Tea Leaves",
            description: "Pure and natural green tea leaves for a healthy lifestyle.",
            price: "800",
            image: "/images/greentea.jpg",
            weightOptions: [
              { weight: "50g", price: "400" },
              { weight: "100g", price: "800" },
              { weight: "200g", price: "1600" }
            ],
          },
          {
            id: 11,
            name: "Cinnamon",
            description: "High-quality Ceylon cinnamon for cooking and health benefits.",
            price: "600",
            image: "/images/cinnamon-sticks.jpg",
            weightOptions: [
              { weight: "50g", price: "300" },
              { weight: "100g", price: "600" },
              { weight: "200g", price: "1200" }
            ],
          },
    ]);
      
    const handleAddToCart = (product, selectedWeight) => {
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
        if (!name || !email || !phone || !message) {
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

    const sendEmailToAdmin = (messageContent) => {
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
        .then((response) => {
            alert('Your order has been placed successful. You will be contact soon by our team, Thank You!');
            // Reset form and cart
            setName('');
            setEmail('');
            setPhone('');
            setMessage('');
            setCart([]);
        })
        .catch((error) => {
            console.error('Error sending email:', error);
            alert('There was an error sending your checkout message.');
        });
    };

    const calculateTotal = () => {
        // Sum up the prices of the items in the cart
        return cart.reduce((total, item) => total + parseFloat(item.selectedPrice), 0);
    };

    return (
        <div className="buy-greens-page">
            <h1>Buy Greens</h1>
            <div className="product-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <img src={product.image} alt={product.name} />
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <div className="price-and-weight">
                            <label htmlFor={`weight-${product.id}`}>Select weight:</label>
                            <select
                                id={`weight-${product.id}`}
                                onChange={(e) => {
                                    const weight = e.target.value;
                                    const selectedWeight = product.weightOptions.find(
                                        (option) => option.weight === weight
                                    );
                                    if (selectedWeight) {
                                        product.price = selectedWeight.price; // Set the price when the weight is selected
                                    }
                                }}
                            >
                                {product.weightOptions.map((option) => (
                                    <option key={option.weight} value={option.weight}>
                                        {option.weight}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <br />
                        <button
                            className="add-to-cart"
                            onClick={() => {
                                const selectedWeight = product.weightOptions.find(
                                    (option) => option.weight === document.getElementById(`weight-${product.id}`).value
                                );
                                if (selectedWeight) {
                                    handleAddToCart(product, selectedWeight);
                                } else {
                                    alert("Please select a weight!");
                                }
                            }}
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>

            <br />
            <div className="cart">
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
                    type="tel"
                    value={phone}
                    placeholder="Your Phone Number"
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
                <textarea
                    value={message}
                    placeholder="Additional Details"
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />
                <button onClick={handleCheckout}>Checkout</button>
            </div>
        </div>
    );
};

export default BuyGreens;