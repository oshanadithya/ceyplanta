import { useState } from 'react';
import "../styles/cart.css"; // Add styles for cart page

const CartPage = () => {
  // Simulating a cart stored in state
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem('cart') || '[]') // Default to '[]' if 'cart' is null
  );
  
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phoneNumber: '',
  });

  const handleRemoveFromCart = (productId: any) => {
    const updatedCart = cart.filter((product: { id: any; }) => product.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update localStorage
  };

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleCheckout = () => {
    if (!userDetails.name || !userDetails.email || !userDetails.phoneNumber) {
      alert('Please fill in all details to proceed.');
      return;
    }
    // You can handle the form submission to the backend here
    alert('Checkout successful!');
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty. Add items to the cart!</p>
      ) : (
        <div className="cart-items">
          {cart.map((product: any) => (
            <div key={product.id} className="cart-item">
              <img src={product.image} alt={product.name} />
              <div className="item-details">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Price: Rs. {product.price}</p>
                <p>Weight: {product.selectedWeight}</p>
              </div>
              <button onClick={() => handleRemoveFromCart(product.id)} className="remove-from-cart">Remove</button>
            </div>
          ))}
        </div>
      )}

      <div className="checkout-form">
        <h2>Checkout</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={userDetails.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userDetails.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={userDetails.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <button onClick={handleCheckout} className="checkout-button">Checkout</button>
        </form>
      </div>
    </div>
  );
};

export default CartPage;
