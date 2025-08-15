import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ===================================================================================
//
//  THIS CODE SHOULD BE IN YOUR Cart.jsx FILE
//
// ===================================================================================

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  // useEffect hook to load cart items from localStorage when the component mounts.
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(items);
  }, []);

  // Function to update localStorage whenever cartItems state changes.
  const updateLocalStorage = (items) => {
    localStorage.setItem("cart", JSON.stringify(items));
  };

  // Handles changing the quantity of an item in the cart.
  const handleQuantityChange = (id, amount) => {
    const updatedItems = cartItems
      .map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + amount;
          // If quantity becomes 0 or less, we'll remove it.
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        }
        return item;
      })
      .filter(Boolean); // filter(Boolean) removes any null items from the array.

    setCartItems(updatedItems);
    updateLocalStorage(updatedItems);
  };

  // Removes an item completely from the cart.
  const handleRemoveItem = (id) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
    updateLocalStorage(updatedItems);
  };

  // Calculates the total price of all items in the cart.
  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="page-container cart-page">
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items-container">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>₹{item.price.toFixed(2)}</p>
              </div>
              <div className="cart-item-quantity">
                <button onClick={() => handleQuantityChange(item.id, -1)}>
                  –
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item.id, 1)}>
                  +
                </button>
              </div>
              <div className="cart-item-total">
                ₹{(item.price * item.quantity).toFixed(2)}
              </div>
              <button
                className="cart-item-remove"
                onClick={() => handleRemoveItem(item.id)}
              >
                &times;
              </button>
            </div>
          ))}
          <div className="cart-summary">
            <h2>Total: ₹{calculateTotal()}</h2>
            <button className="checkout-button">Proceed to Checkout</button>
          </div>
        </div>
      )}
      <button className="nav-button" onClick={() => navigate("/")}>
        Back to Shop
      </button>
    </div>
  );
};

// ===================================================================================
//
//  THIS CODE SHOULD BE IN YOUR Wishlist.jsx FILE
//
// ===================================================================================
const Wishlist = () => {
  const navigate = useNavigate();
  return (
    <div className="page-container">
      <h1>My Wishlist</h1>
      <p>Your saved items are shown here.</p>
      <button className="nav-button" onClick={() => navigate("/")}>
        Back to Shop
      </button>
    </div>
  );
};

// ===================================================================================
//
//  THIS CODE SHOULD BE IN YOUR Journal.jsx FILE
//
// ===================================================================================
const Journal = () => {
  // Initialize the useNavigate hook to programmatically navigate between pages
  const navigate = useNavigate();
  // 'useState' is a React Hook that lets us add a "state variable" to our component.
  // Think of it as a piece of data that can change over time. When it changes, React will re-render the component.

  // This state holds the list of all journal products.
  const [journals, setJournals] = useState([
    {
      id: 201,
      name: "Leather-Bound Journal",
      price: 2500.0,
      description:
        "Hand-stitched leather cover with thick, cream-colored pages.",
      image:
        "https://i.pinimg.com/1200x/04/19/75/04197548c7016df0e3f283d231d6de2d.jpg",
      quantity: 1, // Default quantity when adding to cart
    },
    {
      id: 202,
      name: "Canvas Field Notebook",
      price: 1500.0,
      description:
        "Durable canvas cover, perfect for outdoor sketching and notes.",
      image:
        "https://i.pinimg.com/736x/52/64/5b/52645b4bf4a5e954cc2a501203a72990.jpg",
      quantity: 1,
    },
    {
      id: 203,
      name: "Linen Softcover Diary",
      price: 1800.0,
      description: "Elegant linen cover with a delicate floral pattern.",
      image:
        "https://i.pinimg.com/736x/16/6a/9a/166a9a275cf4de93dfafdb2e43cc6fbd.jpg",
      quantity: 1,
    },
    {
      id: 204,
      name: "Recycled Paper Sketchbook",
      price: 1200.0,
      description: "Eco-friendly journal with recycled kraft paper pages.",
      image:
        "https://i.pinimg.com/736x/24/26/07/24260783e4fb2fe6fa70363fe62a9eb3.jpg",
      quantity: 1,
    },
  ]);

  // This state holds the message shown in the notification pop-up.
  const [notification, setNotification] = useState("");
  // This state keeps track of whether dark mode is on or off. It's a boolean (true or false).
  const [isDarkMode, setIsDarkMode] = useState(false);

  // This function increases or decreases the quantity of a journal.
  const handleQuantityChange = (id, amount) => {
    // We get the previous list of journals.
    setJournals((prev) =>
      // 'map' creates a new list by applying a function to each item.
      prev.map((journal) =>
        // We find the journal with the matching ID.
        journal.id === id
          ? // If it matches, we create a new journal object with the updated quantity.
            // 'Math.max(1, ...)' ensures the quantity never goes below 1.
            { ...journal, quantity: Math.max(1, journal.quantity + amount) }
          : // If the ID doesn't match, we return the journal unchanged.
            journal
      )
    );
  };

  // This function adds a journal to the shopping cart.
  const handleAddToCart = (journal) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item.id === journal.id);

    if (existing) {
      existing.quantity += journal.quantity;
    } else {
      cart.push({ ...journal });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    setNotification(`${journal.name} has been added to your cart!`);
    setTimeout(() => {
      setNotification("");
      navigate("/cart"); // Now using the navigate function to go to the cart page.
    }, 1500);
  };

  // This function saves an item to the wishlist by adding it to localStorage.
  const handleSaveToWishlist = (journal) => {
    // Retrieve the current wishlist from localStorage or initialize an empty array.
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    // Check if the item already exists in the wishlist.
    const existing = wishlist.find((item) => item.id === journal.id);

    // If the item doesn't exist, add it to the wishlist.
    if (!existing) {
      wishlist.push(journal);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }

    // Now using the navigate function to go to the wishlist page.
    navigate("/wishlist");
  };

  // This function toggles the dark mode state.
  const toggleTheme = () => {
    // This sets 'isDarkMode' to the opposite of its current value (true -> false, false -> true).
    setIsDarkMode(!isDarkMode);
  };

  return (
    // The 'className' changes based on the 'isDarkMode' state, which triggers the CSS for dark mode.
    <>
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;600&display=swap');
    
        html { scroll-behavior: smooth; }

        .journal-page {
            font-family: 'Poppins', sans-serif;
            background-color: #f8f4ed;
            padding: 4rem 2rem;
            min-height: 100vh;
            color: #3b3a30;
            transition: background-color 0.4s, color 0.4s;
            position: relative;
            overflow: hidden; /* Hide overflow for the star animation */
        }

        .journal-page.dark-mode {
            background-color: #000000;
            color: #e0e0e0;
        }
        
        .journal-page.dark-mode .journal-header h1 {
            color: #ffffff;
        }
        
        .journal-page.dark-mode .journal-header p {
            color: #a0a0a0;
        }

        .journal-page.dark-mode .journal-card {
            background-color: #2c303a;
            color: #e0e0e0;
            box-shadow: 1px 1px 12px rgba(0, 0, 0, 0.5);
        }

        .journal-page.dark-mode .journal-name, .journal-page.dark-mode .journal-price {
            color: #ffffff;
        }
        
        .journal-page.dark-mode .styled-wrapper .button:before {
            border-color: #ffffff;
        }
        
        .journal-page.dark-mode .button-elem svg {
            fill: #ffffff;
        }
        
        .journal-page.dark-mode .quantity-control button {
            background-color: #4a5568;
            color: #e0e0e0;
        }
        
        .journal-page.dark-mode .CartBtn {
            background-color: #4a5568;
            color: #e0e0e0;
        }
        
        .journal-page.dark-mode .CartBtn:hover {
            background-color: #2d3748;
        }
        
        .journal-page.dark-mode .save-btn {
            background-color: #2d3748;
            color: #e0e0e0;
        }
        
        .journal-page.dark-mode .save-btn:hover {
            background-color: #1a202c;
        }


        .journal-container {
            max-width: 1200px;
            margin: 0 auto;
            position: relative;
            z-index: 20; /* Ensure content is above the animation */
        }

        .journal-header {
            text-align: center;
            margin-bottom: 3rem;
        }

        .journal-header h1 {
            font-family: 'Playfair Display', serif;
            font-size: 3.5rem;
            color: #3b3a30;
            margin: 0;
            transition: color 0.4s;
            overflow: hidden;
        }
        
        .journal-header p {
            font-size: 1.2rem;
            color: #8c887e;
            margin-top: 0.5rem;
            transition: color 0.4s;
        }

        .journal-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
        }

        .journal-card {
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.08);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            transition: all 0.3s ease;
        }

        .journal-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.12);
        }

        .journal-image {
            height: 220px;
            width: 100%;
            background-size: cover;
            background-position: center;
        }

        .journal-content {
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            flex-grow: 1;
        }

        .journal-name {
            font-family: 'Playfair Display', serif;
            font-size: 1.2rem;
            font-weight: 700;
            text-align: center;
            margin-bottom: auto;
        }

        .journal-price {
            font-family: 'Playfair Display', serif;
            font-size: 1.2rem;
            font-weight: 600;
            color: #555;
        }

        .controls-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            width: 100%;
            margin-top: 1rem;
        }

        .quantity-control {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .quantity-control button {
            background-color: #e2e8f0;
            color: #4a5568;
            border: none;
            border-radius: 50%;
            width: 32px;
            height: 32px;
            font-size: 1.2rem;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .quantity-control button:hover {
            background-color: #cbd5e0;
        }

        .CartBtn, .save-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            border: none;
            width: 100%;
            max-width: 250px;
            padding: 0.8rem 1.5rem;
            border-radius: 50px;
            cursor: pointer;
            font-weight: 600;
            transition: background-color 0.3s ease, transform 0.2s ease;
        }

        .CartBtn {
            background-color: #38b2ac;
            color: white;
            box-shadow: 0 4px 10px rgba(56, 178, 172, 0.2);
        }

        .CartBtn:hover {
            background-color: #319795;
            transform: translateY(-2px);
        }

        .CartBtn .IconContainer {
            margin-right: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .save-btn {
            position: relative;
            font-family: 'Poppins', sans-serif;
            background-color: #cbd5e0;
            color: #4a5568;
            box-shadow: 0 4px 10px rgba(203, 213, 224, 0.2);
            overflow: hidden;
            border: 2px solid #a0aec0;
            text-align: center;
            padding: 0.6rem 1.5rem;
        }

        .save-btn:hover {
            background-color: #e2e8f0;
            transform: translateY(-2px);
        }

        .save-btn span {
            position: relative;
            z-index: 10;
        }
        
        .save-btn .svg-wrapper {
            position: absolute;
            left: 5px;
            top: 50%;
            transform: translateY(-50%);
            width: 30px;
            height: 30px;
            background-color: transparent;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .save-btn .svg-wrapper-1 {
            width: 30px;
            height: 30px;
            position: absolute;
            top: 50%;
            left: 5px;
            transform: translateY(-50%);
            overflow: hidden;
            z-index: 1;
        }
        
        .save-btn .svg-wrapper-1 .svg {
            transition: all 0.5s ease-in-out;
        }
        
        .save-btn:hover .svg-wrapper-1 .svg {
            transform: translateX(30px);
        }

        /* Animation for the back button */
        .styled-wrapper {
            position: absolute;
            top: 1rem;
            left: 1rem;
            z-index: 1000;
        }
        .styled-wrapper .button {
            display: block;
            position: relative;
            width: 56px;
            height: 56px;
            margin: 0;
            overflow: hidden;
            outline: none;
            background-color: transparent;
            cursor: pointer;
            border: 0;
        }
        .styled-wrapper .button:before, .styled-wrapper .button:after {
            content: "";
            position: absolute;
            border-radius: 50%;
            inset: 7px;
        }
        .styled-wrapper .button:before {
            border: 3px solid black;
            transition: opacity 0.4s, transform 0.5s;
        }
        .styled-wrapper .button:after {
            border: 4px solid #599a53;
            transform: scale(1.3);
            transition: opacity 0.4s, transform 0.5s;
            opacity: 0;
        }
        .styled-wrapper .button:hover:before, .styled-wrapper .button:focus:before {
            transform: scale(0.7);
            opacity: 0;
        }
        .styled-wrapper .button:hover:after, .styled-wrapper .button:focus:after {
            transform: scale(1);
            opacity: 1;
        }
        .styled-wrapper .button-box {
            width: 56px;
            height: 56px;
            display: flex;
            position: relative;
            transform: translate(0);
            border-radius: 50%;
            overflow: hidden;
            transition: transform 0.5s, border-radius 0.3s, background-color 0.4s;
        }
        .styled-wrapper .button-elem {
            display: block;
            width: 20px;
            height: 20px;
            margin: 18px;
            transform: rotate(180deg);
            fill: black;
        }
        .styled-wrapper .button:hover .button-box, .styled-wrapper .button:focus .button-box {
            transform: translateX(-56px);
        }
        
        /* Animation for the theme toggle */
        .theme-toggle-wrapper {
            position: absolute;
            top: 1rem;
            right: 1rem;
            z-index: 1000;
        }
        .theme-checkbox {
            appearance: none;
            width: 4.5rem;
            height: 2.2rem;
            background: #ccc;
            border-radius: 2.5rem;
            position: relative;
            cursor: pointer;
            outline: none;
            transition: background-color 0.4s;
        }
        .theme-checkbox::before {
            content: '';
            width: 1.8rem;
            height: 1.8rem;
            background: #fff;
            border-radius: 50%;
            position: absolute;
            top: 0.2rem;
            left: 0.2rem;
            transition: transform 0.4s;
        }
        .theme-checkbox:checked {
            background: #3b3a30;
        }
        .theme-checkbox:checked::before {
            transform: translateX(2.3rem);
        }

        /* Notification box */
        .notification {
            position: fixed;
            top: 2rem;
            right: 2rem;
            background-color: #48bb78;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            animation: fadein 0.5s, fadeout 0.5s 1.5s;
            z-index: 9999;
        }
        @keyframes fadein {
            from { opacity: 0; transform: translateY(-20px); }
            to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeout {
            from { opacity: 1; }
            to   { opacity: 0; }
        }

        /* For Tablets and larger mobile phones (up to 992px wide). */
        @media (max-width: 992px) {
          .journal-page {
            padding: 4rem 1.5rem;
          }
          .journal-header h1 {
            font-size: 3rem;
          }
          .journal-grid {
            grid-template-columns: repeat(2, 1fr); /* 2 columns for large phones. */
          }
        }

        /* For smaller mobile phones (up to 600px wide). */
        @media (max-width: 600px) {
          .journal-page {
            padding: 4rem 1rem;
          }
          .journal-header h1 {
            font-size: 2.5rem;
          }
          .journal-grid {
            grid-template-columns: 1fr; /* 1 column for small phones. */
          }
           .styled-wrapper {
              top: 0.5rem;
              left: 0.5rem;
            }
            .styled-wrapper .button { width: 48px; height: 48px; }
            .styled-wrapper .button-elem { width: 16px; height: 16px; margin: 16px; }
            .styled-wrapper .button:hover .button-box,
            .styled-wrapper .button:focus .button-box { transform: translateX(-48px); }
            .theme-toggle-wrapper { top: 1rem; right: 1rem; }
            .notification {
                width: calc(100% - 2rem);
                right: 1rem;
                top: 1rem;
            }
        }
        `}
      </style>
      <div className={`journal-page ${isDarkMode ? "dark-mode" : ""}`}>
        {/* This is the back button. */}
        <div className="styled-wrapper">
          <button className="button" onClick={() => window.history.back()}>
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

        {/* This is the theme toggle switch. */}
        <div className="theme-toggle-wrapper">
          <input
            type="checkbox"
            className="theme-checkbox"
            checked={isDarkMode}
            onChange={toggleTheme}
          />
        </div>

        {/* This shows the notification only if the 'notification' state is not empty. */}
        {notification && <div className="notification">{notification}</div>}

        <div className="journal-container">
          <header className="journal-header">
            <h1>Artisanal Journals</h1>
            <p>Capture your thoughts with a touch of artistry.</p>
          </header>

          {/* This is the grid where all the journal cards will be displayed. */}
          <div className="journal-grid">
            {/* We 'map' over the 'journals' array to create a card for each journal. */}
            {journals.map((journal) => (
              // The 'key' is important for React to keep track of each item in the list.
              <div key={journal.id} className="journal-card">
                <div
                  className="journal-image"
                  style={{ backgroundImage: `url(${journal.image})` }}
                />
                <div className="journal-content">
                  <h3 className="journal-name">{journal.name}</h3>
                  <div className="journal-price">
                    {/* '.toFixed(2)' formats the price to have two decimal places (e.g., 2500.00). */}
                    ₹{journal.price.toFixed(2)}
                  </div>
                  <div className="controls-container">
                    <div className="quantity-control">
                      <button
                        onClick={() => handleQuantityChange(journal.id, -1)}
                      >
                        −
                      </button>
                      <span>{journal.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(journal.id, 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="CartBtn"
                      onClick={() => handleAddToCart(journal)}
                    >
                      <span className="IconContainer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="1em"
                          viewBox="0 0 576 512"
                          fill="rgb(17, 17, 17)"
                          className="cart"
                        >
                          <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
                        </svg>
                      </span>
                      <p className="text">Add to Cart</p>
                    </button>
                    <button
                      className="save-btn"
                      onClick={() => handleSaveToWishlist(journal)}
                    >
                      <div className="svg-wrapper-1">
                        <div className="svg-wrapper">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            stroke="currentColor"
                            height="24"
                            fill="none"
                            className="svg"
                          >
                            <path d="M20 12V7H4v14h9.5M18 5L20 7L22 5" />
                            <path d="M12 2v20c0-10 1-12 5-16s7 5 7 5" />
                            <path d="M4 14l9 9" />
                          </svg>
                        </div>
                      </div>
                      <span>Save</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Journal;
