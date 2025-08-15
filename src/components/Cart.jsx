import React, { useState, useEffect } from "react";

const Cart = () => {
  // --- STATE MANAGEMENT ---
  const [cartItems, setCartItems] = useState([]);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light";
  });
  const [exitingItems, setExitingItems] = useState({});

  // This effect runs once on component mount to load cart data and set up a listener for storage changes.
  useEffect(() => {
    // Load initial cart data from localStorage
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);

    // Function to handle storage events from other tabs/windows
    const handleStorageChange = (e) => {
      if (e.key === "cart") {
        const newCart = JSON.parse(e.newValue) || [];
        setCartItems(newCart);
      }
    };

    // Add event listener to react to cart changes from other pages
    window.addEventListener("storage", handleStorageChange);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // This effect runs whenever cartItems change to save them back to localStorage.
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Effect to handle theme changes
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  // --- FUNCTIONS ---

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Function to handle quantity changes.
  const handleQuantityChange = (id, amount) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  // Function to remove an item from the cart with a CSS animation.
  const handleRemoveItem = (id) => {
    setExitingItems({ ...exitingItems, [id]: true });
    // After the animation duration, remove the item from the state.
    setTimeout(() => {
      setCartItems(cartItems.filter((item) => item.id !== id));
      setExitingItems((prev) => {
        const newItems = { ...prev };
        delete newItems[id];
        return newItems;
      });
    }, 500); // This should match the CSS transition duration
  };

  // Function to handle the checkout process.
  const handleCheckout = () => {
    // Create a final order object.
    const orderDetails = {
      orderId: `ORD-${Date.now()}`,
      items: cartItems,
      total: total,
    };
    // Save the order to localStorage for the Thank You page.
    localStorage.setItem("lastOrder", JSON.stringify(orderDetails));
    // Redirect to the thank you page.
    window.location.href = "/thankyou";
  };

  // --- CALCULATIONS ---
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingCost = subtotal > 4000 ? 0 : 150;
  const taxRate = 0.18; // GST
  const taxAmount = subtotal * taxRate;
  const total = subtotal + shippingCost + taxAmount;

  // --- STYLES ---
  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;600&display=swap');

    :root, .light {
        --bg-color: #F8F5F2;
        --text-color: #333;
        --secondary-text-color: #777;
        --card-bg: #FFFFFF;
        --border-color: #EAEAEA;
        --shadow-color: rgba(0,0,0,0.07);
        --checkout-btn-bg: #A2B5CD;
        --checkout-btn-hover-bg: #8E9EAD;
        --explore-btn-bg: #5c544b;
        --explore-btn-hover-bg: #4a453d;
        --accent-color: #599a53;
        --score-green: #2ecc71;
    }

    .dark {
        --bg-color: #000000;
        --text-color: #ecf0f1;
        --secondary-text-color: #bdc3c7;
        --card-bg: #1a1a1a;
        --border-color: #333333;
        --shadow-color: rgba(255,255,255,0.07);
        --checkout-btn-bg: #5e83a5;
        --checkout-btn-hover-bg: #4a6e8f;
        --explore-btn-bg: #7f8c8d;
        --explore-btn-hover-bg: #95a5a6;
        --accent-color: #6fbf69;
        --score-green: #27ae60;
    }

    .cart-page {
      font-family: 'Poppins', sans-serif;
      background-color: var(--bg-color);
      color: var(--text-color);
      padding: 2rem 1rem;
      min-height: 100vh;
      transition: background-color 0.4s, color 0.4s;
    }
    
    .fixed-controls-container {
        position: fixed;
        top: 2rem;
        left: 2rem;
        right: 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 1001;
        pointer-events: none;
    }

    .fixed-controls-container > * {
        pointer-events: auto;
    }
    
    .cart-container {
      max-width: 1200px;
      margin: 0 auto;
      padding-top: 6rem;
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 2rem;
    }

    .empty-cart-container {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        width: 100%;
        text-align: center;
    }
    
    .cart-header-container {
      grid-column: 1 / -1;
      margin-bottom: 1rem;
    }

    /* CSS Animation for header */
    @keyframes text-fade-in {
      from { transform: translateY(-100px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    .cart-header .letter {
      display: inline-block;
      opacity: 0;
      animation: text-fade-in 1.4s ease-out forwards;
    }
    
    .cart-header .letter:nth-child(1) { animation-delay: 0s; }
    .cart-header .letter:nth-child(2) { animation-delay: 0.03s; }
    .cart-header .letter:nth-child(3) { animation-delay: 0.06s; }
    .cart-header .letter:nth-child(4) { animation-delay: 0.09s; }
    .cart-header .letter:nth-child(5) { animation-delay: 0.12s; }
    .cart-header .letter:nth-child(6) { animation-delay: 0.15s; }
    .cart-header .letter:nth-child(7) { animation-delay: 0.18s; }
    .cart-header .letter:nth-child(8) { animation-delay: 0.21s; }
    .cart-header .letter:nth-child(9) { animation-delay: 0.24s; }
    .cart-header .letter:nth-child(10) { animation-delay: 0.27s; }
    .cart-header .letter:nth-child(11) { animation-delay: 0.3s; }
    .cart-header .letter:nth-child(12) { animation-delay: 0.33s; }
    .cart-header .letter:nth-child(13) { animation-delay: 0.36s; }

    .cart-header {
      font-family: 'Playfair Display', serif;
      font-size: 2.5rem;
      color: var(--text-color);
      margin: 0;
      font-weight: normal;
    }

    .cart-items-list, .cart-summary {
      background: var(--card-bg);
      border-radius: 15px;
      padding: 2rem;
      box-shadow: 0 10px 30px var(--shadow-color);
      transition: background-color 0.4s;
    }

    /* CSS transition for fading in cart items on load */
    @keyframes fade-in {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .cart-item {
      display: flex;
      align-items: center;
      margin-bottom: 1.5rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid var(--border-color);
      opacity: 0;
      animation: fade-in 0.5s ease-out forwards;
    }
    
    /* Stagger the animations */
    .cart-item:nth-child(1) { animation-delay: 0.2s; }
    .cart-item:nth-child(2) { animation-delay: 0.4s; }
    .cart-item:nth-child(3) { animation-delay: 0.6s; }
    .cart-item:nth-child(4) { animation-delay: 0.8s; }
    .cart-item:nth-child(5) { animation-delay: 1.0s; }


    .cart-item.exiting {
        transition: opacity 0.5s ease-in, transform 0.5s ease-in;
        opacity: 0;
        transform: translateX(-100px);
    }
    
    .cart-item:last-child {
      border-bottom: none; margin-bottom: 0; padding-bottom: 0;
    }

    .cart-item-image img {
      width: 100px; height: 100px; object-fit: cover; border-radius: 10px; margin-right: 1.5rem;
    }

    .cart-item-details { flex-grow: 1; }
    .cart-item-details h3 { margin: 0 0 0.5rem; font-size: 1.2rem; color: var(--text-color); }
    .cart-item-details p { margin: 0; color: var(--secondary-text-color); }

    .cart-item-actions { display: flex; align-items: center; gap: 1rem; }

    .quantity-control { display: flex; align-items: center; border: 1px solid #ddd; border-radius: 50px; }
    .quantity-control button { background: none; border: none; font-size: 1.2rem; cursor: pointer; padding: 0.5rem 1rem; color: var(--secondary-text-color); }
    .quantity-control span { padding: 0 0.5rem; font-weight: 600; }

    .remove-btn { background: none; border: none; color: #ff6b6b; cursor: pointer; font-size: 1.2rem; transition: color 0.3s; }
    .remove-btn:hover { color: #e03131; }

    .cart-summary { align-self: start; }
    .cart-summary h2 { font-family: 'Playfair Display', serif; margin-top: 0; color: var(--text-color); }

    .summary-row { display: flex; justify-content: space-between; margin-bottom: 1rem; font-size: 1rem; }
    .summary-row.total { font-size: 1.2rem; font-weight: 600; margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color); }
    
    .checkout-btn { width: 100%; padding: 1rem; background-color: var(--checkout-btn-bg); color: #fff; font-size: 1.1rem; font-weight: 600; border: none; border-radius: 50px; cursor: pointer; transition: all 0.3s ease; margin-top: 1rem; }
    .checkout-btn:hover { background-color: var(--checkout-btn-hover-bg); transform: translateY(-3px); }
    
    .empty-cart-message {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2rem;
        max-width: 500px;
        margin: 0 auto;
    }
    
    .empty-cart-message h2 {
      text-align: center;
      padding: 0;
      margin: 0;
    }

    .empty-cart-message p {
      text-align: center;
      padding: 0;
      margin: 0;
    }

    .empty-cart-message a {
        display: inline-block;
        margin-top: 1.5rem;
        padding: 0.8rem 2rem;
        background-color: var(--explore-btn-bg);
        color: #fff;
        text-decoration: none;
        border-radius: 50px;
        transition: background-color 0.3s;
    }
    .empty-cart-message a:hover {
        background-color: var(--explore-btn-hover-bg);
    }
    
    .empty-cart-image {
        width: 100%;
        max-width: 300px;
        height: auto;
        margin-bottom: 2rem;
    }

    /* --- BACK BUTTON STYLES --- */
    .styled-wrapper {
        position: fixed;
        top: 1.5rem;
        left: 1.5rem;
        z-index: 1000;
    }
    .styled-wrapper .button {
        display: block;
        position: relative;
        width: 44px;
        height: 44px;
        margin: 0;
        overflow: hidden;
        outline: none;
        background-color: transparent;
        cursor: pointer;
        border: 0;
    }

    .styled-wrapper .button:before {
        content: "";
        position: absolute;
        border-radius: 50%;
        inset: 5px;
        border: 2px solid var(--text-color);
        transition: all 0.4s;
    }

    .styled-wrapper .button:after {
        content: "";
        position: absolute;
        border-radius: 50%;
        inset: 5px;
        border: 3px solid var(--accent-color);
        transform: scale(1.3);
        transition: all 0.4s;
        opacity: 0;
    }

    .styled-wrapper .button:hover:before,
    .styled-wrapper .button:focus:before {
        opacity: 0;
        transform: scale(0.7);
    }

    .styled-wrapper .button:hover:after,
    .styled-wrapper .button:focus:after {
        opacity: 1;
        transform: scale(1);
    }

    .styled-wrapper .button-box {
        display: flex;
        position: absolute;
        top: 0;
        left: 0;
    }
    
    .styled-wrapper .button-elem {
        display: block;
        width: 16px;
        height: 16px;
        margin: 14px;
        transform: rotate(360deg);
    }

    .styled-wrapper .button-elem svg {
        fill: var(--text-color);
        transition: fill 0.4s;
    }

    .styled-wrapper .button:hover .button-box,
    .styled-wrapper .button:focus .button-box {
        transition: 0.4s;
        transform: translateX(-44px);
    }

    /* --- Theme Toggle Switch Styles (From Uiverse.io by cuzpq) --- */
    .theme-toggle-wrapper {
        position: fixed;
        top: 1.5rem;
        right: 1.5rem;
        z-index: 1000;
    }
    
    .theme-checkbox {
      --toggle-size: 12px;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      width: 6.25em;
      height: 3.125em;
      background: -webkit-gradient(linear, left top, right top, color-stop(50%, #efefef), color-stop(50%, #2a2a2a)) no-repeat;
      background: -o-linear-gradient(left, #efefef 50%, #2a2a2a 50%) no-repeat;
      background: linear-gradient(to right, #efefef 50%, #2a2a2a 50%) no-repeat;
      background-size: 205%;
      background-position: 0;
      -webkit-transition: 0.4s;
      -o-transition: 0.4s;
      transition: 0.4s;
      border-radius: 99em;
      position: relative;
      cursor: pointer;
      font-size: var(--toggle-size);
    }

    .theme-checkbox::before {
      content: "";
      width: 2.25em;
      height: 2.25em;
      position: absolute;
      top: 0.438em;
      left: 0.438em;
      background: -webkit-gradient(linear, left top, right top, color-stop(50%, #efefef), color-stop(50%, #2a2a2a)) no-repeat;
      background: -o-linear-gradient(left, #efefef 50%, #2a2a2a 50%) no-repeat;
      background: linear-gradient(to right, #efefef 50%, #2a2a2a 50%) no-repeat;
      background-size: 205%;
      background-position: 100%;
      border-radius: 50%;
      -webkit-transition: 0.4s;
      -o-transition: 0.4s;
      transition: 0.4s;
    }

    .theme-checkbox:checked::before {
      left: calc(100% - 2.25em - 0.438em);
      background-position: 0;
    }

    .theme-checkbox:checked {
      background-position: 100%;
    }


    /* --- Media Queries --- */
    @media (max-width: 768px) {
        .cart-container {
            grid-template-columns: 1fr;
            padding-top: 5rem;
            gap: 1.5rem;
        }
        .fixed-controls-container {
            top: 1rem;
            left: 1rem;
            right: 1rem;
        }
        .styled-wrapper, .theme-toggle-wrapper {
            top: 1rem;
            left: 1rem;
            right: 1rem;
        }
        .theme-toggle-wrapper {
            right: 1rem;
            left: auto;
        }
        .styled-wrapper .button {
            width: 44px;
            height: 44px;
        }
        .styled-wrapper .button-elem {
            width: 16px;
            height: 16px;
            margin: 14px;
        }
        .styled-wrapper .button:hover .button-box,
        .styled-wrapper .button:focus .button-box {
            transform: translateX(-44px);
        }
        .cart-items-list, .cart-summary {
            padding: 1.5rem;
        }
        .cart-header {
            font-size: 2rem;
        }
        .cart-item {
            flex-direction: column;
            align-items: center;
            text-align: center;
        }
        .cart-item-image img {
            margin-right: 0;
            margin-bottom: 1rem;
        }
        .cart-item-actions {
            margin-top: 1rem;
        }
        .checkout-btn {
            padding: 0.8rem;
        }
        .summary-row {
            font-size: 0.9rem;
        }
    }

  `;

  const headerText = "Your Cart".split("").map((letter, index) => (
    <span key={index} className="letter">
      {letter}
    </span>
  ));

  return (
    <>
      <style>{styles}</style>
      <div className={`cart-page ${theme}`}>
        <div className="fixed-controls-container">
          <div className="styled-wrapper">
            <button
              className="button"
              onClick={() => window.history.back()}
              aria-label="Go back to previous page"
            >
              <div className="button-box">
                <span className="button-elem">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
                  </svg>
                </span>
                <span className="button-elem">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
                  </svg>
                </span>
              </div>
            </button>
          </div>
          <div className="theme-toggle-wrapper">
            <input
              type="checkbox"
              className="theme-checkbox"
              id="theme-toggle"
              checked={theme === "dark"}
              onChange={toggleTheme}
            />
      
          </div>
        </div>
        {cartItems.length > 0 ? (
          <div className="cart-container">
            <div className="cart-header-container">
              <h1 className="cart-header">{headerText}</h1>
            </div>
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  id={`cart-item-${item.id}`}
                  className={`cart-item ${
                    exitingItems[item.id] ? "exiting" : ""
                  }`}
                >
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p>₹{item.price.toFixed(2)}</p>
                  </div>
                  <div className="cart-item-actions">
                    <div className="quantity-control">
                      <button onClick={() => handleQuantityChange(item.id, -1)}>
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item.id, 1)}>
                        +
                      </button>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      &times;
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <h2>Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>
                  {shippingCost === 0 ? "Free" : `₹${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="summary-row">
                <span>Tax (18% GST)</span>
                <span>₹{taxAmount.toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <button className="checkout-btn" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        ) : (
          <div className="empty-cart-container">
            <div className="empty-cart-message">
              {/* <img
                src="/public/3d cart.jpg"
                alt="An empty shopping cart"
                className="empty-cart-image"
              /> */}
              <h2>Your cart is currently empty.</h2>
              <p>Looks like you haven't added any memories to your cart yet.</p>
              <a href="/Shop">Explore Our Collections</a>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
