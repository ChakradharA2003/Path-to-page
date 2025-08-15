import React, { useState, useEffect, useRef } from "react";

// The main component for the shop page.
const ShopPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const hasAnimated = useRef(false);

  // Product data with links to detail pages
  const products = [
    {
      id: 1,
      name: "The Wanderer's Journal",
      price: 3500.0,
      description: "A handcrafted leather journal to document your journeys.",
      image:
        "https://i.pinimg.com/736x/e0/62/01/e06201d44f84f51fceb8fc621d690740.jpg",
      link: "/Journal",
    },
    {
      id: 2,
      name: "Vintage Bookmarks",
      price: 850.0,
      description: "A collection of unique, handcrafted bookmarks.",
      image:
        "https://i.pinimg.com/1200x/95/37/4a/95374a33b9561048e09172d1a93be3ff.jpg",
      link: "/Bookmark",
    },
    {
      id: 3,
      name: "Artisan Potli Bag",
      price: 1500.0,
      description: "Hand-stitched cloth bag for your travel essentials.",
      image:
        "https://i.pinimg.com/1200x/4d/19/7d/4d197d92d0d727744b98a94773410cf2.jpg",
      link: "/Potli",
    },
    {
      id: 4,
      name: "Traveler's Thank You Cards",
      price: 999.0,
      description: "Pack of 10 cards to share your gratitude on the go.",
      image:
        "https://i.pinimg.com/1200x/5c/b6/75/5cb675352df67fb3d8ee439fa62ed363.jpg",
      link: "/Thankyou",
    },
  ];

  // Function to handle navigation
  const handleNavigation = (path) => {
    window.location.href = path;
  };

  // New function to handle smooth scrolling to a section
  const handleSmoothScroll = (event, targetId) => {
    event.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
    }
  };

  // Toggles the theme between light and dark
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Animations
  useEffect(() => {
    const loadScripts = () => {
      const scripts = [
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js",
      ];
      let scriptsLoaded = 0;
      scripts.forEach((src) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          scriptsLoaded++;
          if (scriptsLoaded === scripts.length) initAnimations();
          return;
        }
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = () => {
          scriptsLoaded++;
          if (scriptsLoaded === scripts.length) {
            initAnimations();
          }
        };
        document.body.appendChild(script);
      });
    };

    const initAnimations = () => {
      if (hasAnimated.current || !window.gsap) return;

      window.gsap.registerPlugin(window.ScrollTrigger);

      window.gsap.from(".shop-header h1", {
        duration: 1,
        y: -50,
        opacity: 0,
        ease: "power3.out",
      });

      window.gsap.from(".shop-header p", {
        duration: 1,
        y: -30,
        opacity: 0,
        delay: 0.3,
        ease: "power3.out",
      });

      window.gsap.utils.toArray(".product-card").forEach((card, i) => {
        window.gsap.from(card, {
          duration: 1,
          y: 60,
          opacity: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });
      hasAnimated.current = true;
    };

    loadScripts();
  }, []);

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;600&display=swap');

    html { scroll-behavior: smooth; }
    
    body {
      margin: 0;
      padding: 0;
      font-family: 'Poppins', sans-serif;
    }

    .shop-page {
      background-color: #f4f1eb;
      padding: 4rem 2rem;
      min-height: 100vh;
      color: #4a4a4a;
      transition: background-color 0.4s, color 0.4s;
      position: relative;
    }
    
    /* Dark Mode Styles */
    .shop-page.dark-mode {
      background-color: #0d0d0eff;
      color: #e0e0e0;
    }
    .shop-page.dark-mode .shop-header h1 {
      color: #ffffff;
    }
    .shop-page.dark-mode .shop-header p,
    .shop-page.dark-mode .product-info p {
      color: #a0a0a0;
    }
    .shop-page.dark-mode .product-card {
      background-color: #2c303a;
      color: #e0e0e0;
      box-shadow: 0 8px 20px rgba(0,0,0,0.5);
    }
    .shop-page.dark-mode .product-info h3 {
      color: #ffffff;
    }
    .shop-page.dark-mode .action-btn {
      background-color: #4a4f5a;
      color: #ffffff;
    }
    .shop-page.dark-mode .action-btn:hover {
      background-color: #5a5f6a;
    }
    .shop-page.dark-mode .styled-wrapper .button:before {
      border-color: #ffffff;
    }
    .shop-page.dark-mode .button-elem svg {
      fill: #ffffff;
    }

    .shop-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .shop-header {
      text-align: center;
      margin-bottom: 4rem;
    }

    .shop-header h1 {
      font-family: 'Playfair Display', serif;
      font-size: 3.5rem;
      color: #333;
      margin: 0 0 0.5rem;
      transition: color 0.4s;
    }

    .shop-header p {
      font-size: 1.2rem;
      color: #777;
      transition: color 0.4s;
    }
    
    .shop-grid {
      display: grid;
      gap: 3rem; /* Increased gap */
      grid-template-columns: repeat(1, 1fr); /* Default to 1 column for mobile */
    }

.product-card {
  background: #fff;
  border-radius: 10px;
  width: 300px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  transition: all 0.4s ease;
  padding: 2.5rem;
  align-items: center;
  text-align: center;
  position:relative;
  right :200px

}

    .product-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 15px 30px rgba(0,0,0,0.12);
    }
    
    .product-image {
      width: 100%;
      position: relative;
      padding-bottom: 100%; /* Creates a square aspect ratio */
      border-radius: 8px;
      overflow: hidden;
    }
    
    .product-image img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }

    .product-card:hover .product-image img {
      transform: scale(1.05);
    }

    .product-info {
      padding: 0;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .product-info h3 {
      font-family: 'Playfair Display', serif;
      margin: 0 0 0.5rem;
      font-size: 1.8rem; /* Increased font size */
      transition: color 0.4s;
    }

    .product-info p {
      color: #666;
      margin-bottom: 2rem; /* Increased margin */
      font-size: 1.1rem; /* Increased font size */
      flex-grow: 1;
      transition: color 0.4s;
    }

    .action-btn {
      padding: 1rem 2rem; /* Increased padding */
      border: none;
      border-radius: 50px;
      font-size: 1.1rem; /* Increased font size */
      font-weight: 600;
      cursor: pointer;
      background-color: #333;
      color: #fff;
      transition: background-color 0.3s ease;
      align-self: center;
    }

    .action-btn:hover {
      background-color: #555;
    }
    
    /* --- Back Button Styles --- */
    .styled-wrapper {
      position: absolute;
      top: 1rem;
      left: 1rem;
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
      border: 2px solid #333;
      transition: all 0.4s;
    }

    .styled-wrapper .button:after {
      content: "";
      position: absolute;
      border-radius: 50%;
      inset: 5px;
      border: 3px solid #599a53;
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
      fill: #333;
      transition: fill 0.4s;
    }

    .styled-wrapper .button:hover .button-box,
    .styled-wrapper .button:focus .button-box {
      transition: 0.4s;
      transform: translateX(-44px);
    }

    /* --- Theme Toggle Switch Styles (From Uiverse.io by cuzpq) --- */
    .theme-toggle-wrapper {
      position: absolute;
      top: 1.5rem;
      right: 2rem;
      z-index: 1000;
    }
    
    .theme-checkbox {
      --toggle-size: 10px;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      width: 5.5em;
      height: 2.75em;
      background: linear-gradient(to right, #efefef 50%, #2a2a2a 50%) no-repeat;
      background-size: 205%;
      background-position: 0;
      transition: 0.4s;
      border-radius: 99em;
      position: relative;
      cursor: pointer;
      font-size: var(--toggle-size);
    }

    .theme-checkbox::before {
      content: "";
      width: 2em;
      height: 2em;
      position: absolute;
      top: 0.375em;
      left: 0.375em;
      background: linear-gradient(to right, #efefef 50%, #2a2a2a 50%) no-repeat;
      background-size: 205%;
      background-position: 100%;
      border-radius: 50%;
      transition: 0.4s;
    }

    .theme-checkbox:checked::before {
      left: calc(100% - 2em - 0.375em);
      background-position: 0;
    }

    .theme-checkbox:checked {
      background-position: 100%;
    }
    
    /* --- Root variables for easy theming --- */
    :root {
      --footer-bg-light: #fffaf0; /* floralwhite */
      --footer-text-light: #0c0c0cff; /* Darker grey for contrast */
      --footer-accent: #b99a6b; /* Muted Gold */
      --footer-shadow-light: rgba(0 0 0 / 0.1);
      --glass-bg-light: rgba(255 255 255 / 0.6);
      --glass-border-light: rgba(255 255 255 / 0.7);
      --social-btn-shadow: rgba(0 0 0 / 0.15);
      --footer-border-light: rgba(0 0 0 / 0.1);
    }

    .footer {
      background: var(--footer-bg-light);
      backdrop-filter: blur(10px) saturate(130%);
      -webkit-backdrop-filter: blur(10px) saturate(130%);
      box-shadow: 0 4px 24px var(--footer-shadow-light);
      border-top: 1px solid var(--footer-border-light);
      color: var(--footer-text-light);
      text-align: center;
      padding: 5rem 2rem;
      gap:10px;
      //  margin-top: 4rem;
      transition: background-color 0.5s ease, color 0.5s ease;
      font-family: 'Poppins', sans-serif;
      letter-spacing: 0.3px;
      user-select: none;
    }

    @media (prefers-color-scheme: dark) {
      :root {
        --footer-bg-dark: #12131f; /* Darker blue-black */
        --footer-text-dark: #fdf8f0; /* Parchment */
        --glass-bg-dark: rgba(30 30 30 / 0.25);
        --glass-border-dark: rgba(255 255 255 / 0.12);
        --footer-border-dark: rgba(255 255 255 / 0.12);
        --footer-shadow-dark: rgba(0 0 0 / 0.4);
      }

      .footer {
        background-color: var(--footer-bg-dark);
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
        box-shadow: none;
        border-top: 1px solid var(--footer-border-dark);
        color: var(--footer-text-dark);
      }
    }

    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 2.5rem;
      max-width: 1200px;
      margin: 0 auto;
      text-align: left;
    }

    .footer-section h3 {
      font-size: 1.4rem;
      margin-bottom: 1rem;
      font-family: 'Playfair Display', serif;
      color: var(--footer-accent);
      font-weight: 700;
      letter-spacing: 1.1px;
      text-transform: uppercase;
    }

    .footer-links li {
      list-style: none;
      margin-bottom: 0.6rem;
    }

    .footer-links a {
      color: var(--footer-text-light);
      text-decoration: none;
      opacity: 0.85;
      transition: opacity 0.25s ease, color 0.25s ease;
      font-weight: 500;
    }

    .footer-links a:hover {
      opacity: 1;
      color: var(--footer-accent);
      text-decoration: underline;
    }
  
    /* Visually hidden label for accessibility */
    .visually-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border: 0;
    }

    .footer-newsletter input {
      width: 100%;
      padding: 1rem 1.1rem;
      border-radius: 10px;
      border: 1.2px solid var(--glass-border-light);
      background: var(--glass-bg-light);
      backdrop-filter: blur(12px) saturate(120%);
      -webkit-backdrop-filter: blur(12px) saturate(120%);
      color: var(--footer-text-light);
      font-size: 1rem;
      font-weight: 600;
      letter-spacing: 0.3px;
      box-sizing: border-box;
      margin-bottom: 1rem;
      box-shadow: 0 2px 10px var(--footer-shadow-light);
      transition: all 0.3s ease;
    }

    .footer-newsletter input::placeholder {
      color: rgba(245, 244, 244, 0.5);
      font-weight: 400;
    }

    .footer-newsletter input:focus {
      outline: none;
      border-color: var(--footer-accent);
      background: rgba(255 255 255 / 0.8);
      box-shadow: 0 0 15px var(--footer-accent);
      color: var(--footer-text-light);
    }

    @media (prefers-color-scheme: dark) {
      .footer-newsletter input {
        background: var(--glass-bg-dark);
        border-color: var(--glass-border-dark);
        color: var(--footer-text-dark);
        box-shadow: 0 2px 12px var(--footer-shadow-dark);
      }
      .footer-newsletter input::placeholder {
        color: rgba(238, 238, 238, 0.5);
      }
      .footer-newsletter input:focus {
        border-color: var(--footer-accent);
        background: rgba(74, 144, 226, 0.25);
        box-shadow: 0 0 15px var(--footer-accent);
        color: var(--footer-text-dark);
      }
    }

    .footer-newsletter button {
      width: 100%;
      padding: 1rem;
      border-radius: 10px;
      border: 1.8px solid transparent;
      background: linear-gradient(145deg, #ffe5b4ce);
      color: #fff;
      font-size: 1.05rem;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 6px 14px rgba(74, 144, 226, 0.45);
      transition: all 0.3s ease;
      letter-spacing: 0.4px;
      text-transform: uppercase;
      user-select: none;
    }

    .footer-newsletter button:hover {
      background:#FFE5B4;
      box-shadow: 0 8px 18px rgba(53, 122, 189, 0.7);
      transform: translateY(-2px);
      color: #08080893;
      border-color: #285A8E;
    }

    .footer-newsletter button:active {
      transform: translateY(0);
      box-shadow: 0 4px 10px rgba(53, 122, 189, 0.35);
    }

    .social-links {
      display: flex;
      gap: 1.2rem;
      margin-top: 2rem;
      justify-content: center;
    }

    .social-links .button {
      cursor: pointer;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 1.5px solid rgba(255 255 255 / 0.3);
      background: var(--glass-bg-light);
      backdrop-filter: blur(12px) saturate(130%);
      -webkit-backdrop-filter: blur(12px) saturate(130%);
      box-shadow: 0 3px 10px var(--footer-shadow-light);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
      user-select: none;
      position: relative;
      overflow: hidden;
    }

    @media (prefers-color-scheme: dark) {
      .social-links .button {
        background: var(--glass-bg-dark);
        border-color: rgba(255 255 255 / 0.15);
        box-shadow: 0 3px 14px var(--footer-shadow-dark);
      }
    }

    .social-links .button svg {
      width: 26px;
      height: 26px;
      color: var(--footer-text-light);
      filter: drop-shadow(0 0 1px rgba(0,0,0,0.15));
      transition: color 0.3s ease;
      z-index: 10;
    }

    @media (prefers-color-scheme: dark) {
      .social-links .button svg {
        color: var(--footer-text-dark);
        filter: drop-shadow(0 0 2px rgba(0,0,0,0.25));
      }
    }

    .social-links .button:hover {
      transform: scale(1.1) translateY(-3px);
      box-shadow: 0 8px 20px rgba(74, 144, 226, 0.35);
      border-color: var(--footer-accent);
    }

    .social-links .button:hover svg {
      color: var(--footer-accent);
    }

    .social-links .button:active {
      transform: scale(0.95);
      box-shadow: 0 4px 10px rgba(74, 144, 226, 0.25);
    }

    .footer-bottom {
      text-align: center;
      margin-top: 3rem;
      border-top: 1px solid rgba(0, 0, 0, 0.05);
      padding-top: 1.2rem;
      font-size: 0.9rem;
      color: var(--footer-text-light);
      user-select: none;
      letter-spacing: 0.2px;
    }

    @media (prefers-color-scheme: dark) {
      .footer-bottom {
        border-top-color: rgba(255 255 255 / 0.1);
        color: var(--footer-text-dark);
      }
    }

    /* Override link colors for Quick Links and Information sections */
/* Override link colors for Quick Links and Information sections */
.footer-section.footer-quick-links .footer-links a,
.footer-section.footer-information .footer-links a {
  color: white;
  opacity: 0.85;
  font-weight: 500;
  text-decoration: none;
  transition: opacity 0.25s ease, color 0.25s ease;
}

.footer-section.footer-quick-links .footer-links a:hover,
.footer-section.footer-information .footer-links a:hover {
  color: var(--footer-accent);
  opacity: 1;
  text-decoration: underline;
}


    /* --- Media Queries (Adjustments for different screen sizes) --- */
    /* Small to Medium Devices (e.g., larger phones, 480px and up) */
    @media (min-width: 480px) {
      .shop-page {
        padding: 3rem 1.5rem;
      }
      .shop-header h1 {
        font-size: 2.5rem;
      }
      .shop-header p {
        font-size: 1.1rem;
      }
      .styled-wrapper {
        top: 1.5rem;
        left: 1.5rem;
      }
      .theme-toggle-wrapper {
        top: 1.5rem;
        right: 1.5rem;
      }
      .theme-checkbox {
        --toggle-size: 12px;
      }
      .product-card {
        flex: 1 1 100%;
      }
    }
    /* Tablets and up (768px and up) */
    @media (min-width: 768px) {
      .shop-page {
        padding: 4rem 2rem;
      }
      .shop-header h1 {
        font-size: 3rem;
      }
      .shop-header p {
        font-size: 1.2rem;
      }
      .styled-wrapper {
        top: 2rem;
        left: 2rem;
      }
      .theme-toggle-wrapper {
        top: 2.25rem;
        right: 2rem;
      }
      .styled-wrapper .button {
        width: 50px;
        height: 50px;
      }
      .styled-wrapper .button-elem {
        width: 18px;
        height: 18px;
        margin: 16px;
      }
      .styled-wrapper .button:hover .button-box,
      .styled-wrapper .button:focus:hover {
        transform: translateX(-50px);
      }
      .theme-checkbox {
        --toggle-size: 14px;
      }
      .product-card {
        padding: 2.5rem;
      }
      .shop-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    /* Large devices (1024px and up) */
    @media (min-width: 1024px) {
      .shop-header h1 {
        font-size: 3.5rem;
      }
      .shop-header p {
        font-size: 1.3rem;
      }
      .shop-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    /* Extra-large devices (1200px and up) */
    @media (min-width: 1200px) {
      .shop-grid {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className={`shop-page ${isDarkMode ? "dark-mode" : ""}`}>
        {/* Back Button */}
        <div className="styled-wrapper">
          <button
            className="button"
            aria-label="Go back"
            onClick={() => window.history.back()}
          >
            <div className="button-box">
              <span className="button-elem">
                <svg viewBox="0 0 44 44" preserveAspectRatio="xMidYMid meet">
                  <path
                    d="M15.9,21.5L27.6,9.8c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4L18.7,22l10.3,10.3c0.4,0.4,0.4,1,0,1.4s-1,0.4-1.4,0L15.9,22.9
          C15.5,22.5,15.5,21.9,15.9,21.5z"
                  ></path>
                </svg>
              </span>
              <span className="button-elem">
                <svg viewBox="0 0 44 44" preserveAspectRatio="xMidYMid meet">
                  <path
                    d="M15.9,21.5L27.6,9.8c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4L18.7,22l10.3,10.3c0.4,0.4,0.4,1,0,1.4s-1,0.4-1.4,0L15.9,22.9
          C15.5,22.5,15.5,21.9,15.9,21.5z"
                  ></path>
                </svg>
              </span>
            </div>
          </button>
        </div>

        {/* Theme Toggle Switch */}
        <div className="theme-toggle-wrapper">
          <input
            type="checkbox"
            className="theme-checkbox"
            id="theme-toggle"
            onChange={toggleTheme}
            checked={isDarkMode}
            aria-label="Toggle light and dark theme"
          />
        </div>

        <div className="shop-container">
          <header className="shop-header">
            <h1>Our Products</h1>
            <p>Handcrafted items and unique goods for the modern wanderer.</p>
          </header>

          <main className="shop-grid">
            {products.map((product) => (
              <div
                key={product.id}
                className="product-card"
                onClick={() => handleNavigation(product.link)}
                role="button"
                tabIndex="0"
                aria-label={`View details for ${product.name}`}
              >
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <button className="action-btn">View Product</button>
                </div>
              </div>
            ))}
          </main>
        </div>
      </div>
      <footer className="footer">
        <div className="footer-content">
          {/* <div className="footer-section footer-about">
            <h3>Our Story</h3>
            <p>
              Handcrafted goods inspired by the art of travel and storytelling.
              We believe in quality, craftsmanship, and the beauty of a
              well-told story.
            </p>
          </div> */}
          <div className="footer-section footer-quick-links">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li>
                <a href="#shop" onClick={(e) => handleSmoothScroll(e, "shop")}>
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleSmoothScroll(e, "about")}
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleSmoothScroll(e, "contact")}
                >
                  Contact
                </a>
              </li>
              <li>
                <a href="#faq" onClick={(e) => handleSmoothScroll(e, "faq")}>
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-section footer-information">
            <h3>Information</h3>
            <ul className="footer-links">
              <li>
                <a
                  href="#shipping"
                  onClick={(e) => handleSmoothScroll(e, "shipping")}
                >
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a
                  href="#privacy"
                  onClick={(e) => handleSmoothScroll(e, "privacy")}
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  onClick={(e) => handleSmoothScroll(e, "terms")}
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-section footer-contact">
            <h3>Contact Us</h3>
            <p>Email: info@wanderlustgoods.com</p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Address: 123 Artisan Alley, Travel Town, 12345</p>
            <div className="social-links">
              {/* Facebook Button */}
              <button className="button" aria-label="Facebook">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 512 512"
                >
                  <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V501.69C413.31 482.38 504 379.78 504 256z" />
                </svg>
              </button>
              {/* Twitter Button */}
              <button className="button" aria-label="Twitter">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 512 512"
                >
                  <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="footer-section footer-newsletter">
            <h3>Stay Connected</h3>
            <p>Subscribe to our newsletter for exclusive updates.</p>
            <form>
              {/* Adding an accessible label for the newsletter input */}
              <label htmlFor="newsletter-email" className="visually-hidden">
                Enter your email for the newsletter
              </label>
              <input
                type="email"
                id="newsletter-email"
                placeholder="Enter your email"
              />
              <button type="submit" aria-label="Subscribe to newsletter">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2023 Wanderlust Goods. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default ShopPage;
