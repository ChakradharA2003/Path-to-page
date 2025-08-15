import React, { useEffect, useRef, useState } from "react";

const Home = () => {
  const navbarRef = useRef(null);
  const hasAnimated = useRef(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  // Effect for setting the theme from localStorage on initial load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.body.setAttribute("data-theme", savedTheme);
  }, []);

  // Function to toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.setAttribute("data-theme", newTheme);
  };

  useEffect(() => {
    // A single function to load all necessary animation libraries from a CDN.
    const loadScripts = () => {
      const scripts = [
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js",
        // Add the Lenis CDN link here
        "https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.27/studio-freight/lenis.min.js",
      ];
      let scriptsLoaded = 0;

      scripts.forEach((src) => {
        // Prevent adding duplicate scripts
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
        // Append scripts to the body to prevent render-blocking
        document.body.appendChild(script);
      });
    };

    // Initializes all the animations once the libraries are loaded.
    const initAnimations = () => {
      if (hasAnimated.current || !window.gsap) return;
      hasAnimated.current = true;

      window.gsap.registerPlugin(window.ScrollTrigger);

      // Animate Navbar elements
      window.gsap.from(navbarRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Animate Hero Text with Anime.js
      const textWrapper = document.querySelector(".hero-title");
      if (textWrapper && !textWrapper.querySelector(".letter")) {
        textWrapper.innerHTML = textWrapper.textContent.replace(
          /\S/g,
          "<span class='letter'>$&</span>"
        );
        window.anime.timeline({ loop: false }).add({
          targets: ".hero-title .letter",
          translateY: [-100, 0],
          opacity: [0, 1],
          easing: "easeOutExpo",
          duration: 1400,
          delay: (el, i) => 30 * i,
        });
      }

      window.gsap.from(".hero p, .cta-button", {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.2,
        delay: 0.5,
        ease: "power3.out",
      });

      // Animate section title on scroll
      window.gsap.from(".featured-products h2", {
        scrollTrigger: {
          trigger: ".featured-products h2",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Animate Featured Products on scroll
      window.gsap.from(".product-card", {
        scrollTrigger: {
          trigger: ".featured-products",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });

      // Animate Footer on scroll
      window.gsap.from(".footer-content > *", {
        scrollTrigger: {
          trigger: ".footer",
          start: "top 95%",
          toggleActions: "play none none none",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    };

    loadScripts();

    const handleScroll = () => {
      if (navbarRef.current) {
        if (window.scrollY > 50) {
          navbarRef.current.classList.add("scrolled");
        } else {
          navbarRef.current.classList.remove("scrolled");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function for smooth scrolling
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: targetElement,
          offsetY: 70, // Adjust this offset to account for the fixed navbar
        },
        ease: "power2.out",
      });
      setIsMenuOpen(false); // Close the mobile menu after clicking a link
    }
  };

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Playfair+Display:wght@700&family=Poppins:wght@400;600&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&display=swap');

    
    /* --- Theme Variables --- */
    body[data-theme='light'] {
      --bg-color: #fdf8f0; /* Parchment */
      --text-color: #5c544b; /* Dark Taupe */
      --nav-scroll-bg: rgba(253, 248, 240, 0.8);
      --card-bg: #fff;
      --card-shadow: rgba(0,0,0,0.05);
      --card-hover-shadow: rgba(0,0,0,0.1);
      --footer-bg: #3d405b;
      --footer-text: #fdf8f0;
      --accent-color-1: #c97b63; /* Muted Terracotta */
      --accent-color-2: #b99a6b; /* Muted Gold */
      --hero-text-color: #fff;
      --hero-overlay-bg: rgba(40, 30, 20, 0.6);
      --nav-link-color: #fff;
      --nav-scrolled-text: #5c544b;
      --hamburger-line-color: #fff;
      --hamburger-scrolled-line-color: #5c544b;
      --mobile-menu-bg: rgba(253, 248, 240, 0.95);
      --mobile-menu-text: #5c544b;
      --social-btn-before-bg: #fff;
      --social-icon-color: #3d405b;
    }

    body[data-theme='dark'] {
      --bg-color: #1a1b2a;
      --text-color: #fdf8f0;
      --nav-scroll-bg: rgba(20, 20, 40, 0.8);
      --card-bg: #2c2e43;
      --card-shadow: rgba(0,0,0,0.2);
      --card-hover-shadow: rgba(0,0,0,0.3);
      --footer-bg: #12131f;
      --footer-text: #fdf8f0;
      --accent-color-1: #e07a5f;
      --accent-color-2: #b99a6b;
      --hero-text-color: #fff;
      --hero-overlay-bg: rgba(20, 15, 10, 0.7);
      --nav-link-color: #fdf8f0;
      --nav-scrolled-text: #fdf8f0;
      --hamburger-line-color: #fdf8f0;
      --hamburger-scrolled-line-color: #fdf8f0;
      --mobile-menu-bg: rgba(28, 29, 46, 0.95);
      --mobile-menu-text: #fdf8f0;
      --social-btn-before-bg: #212121;
      --social-icon-color: #fdf8f0;
    }
    /* --- End Theme Variables --- */

    html, body {
      margin: 0;
      padding: 0;
      font-family: 'Poppins', sans-serif;
      background-color: var(--bg-color);
      color: var(--text-color);
      transition: background-color 0.4s ease, color 0.4s ease;
      overflow-x: hidden;
      scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
    }
html::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* Optional: just make it transparent */
}
    #root, .home-container {
      display: flex;
      flex-direction: column;
      width: 100%;
      box-sizing: border-box;
    }

    /* --- Disclaimer Banner --- */
    .disclaimer-banner {
      background-color: #111;
      color: #fff;
      text-align: center;
      padding: 0.5rem 1rem;
      font-size: 0.8rem;
      font-weight: 500;
      letter-spacing: 1px;
      z-index: 1001; /* Ensure it's above other content but below navbar */
      position: relative;
    }
    
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      position: fixed;
      top: 0; /* Will be adjusted if disclaimer is present */
      left: 0;
      width: 100%;
      z-index: 1000;
      transition: background-color 0.3s ease, box-shadow 0.3s ease, padding 0.3s ease, top 0.3s ease;
      box-sizing: border-box;
    }

    /* Adjust navbar top position based on disclaimer banner */
    body:has(.disclaimer-banner) .navbar {
        top: 36px; /* Adjust this value to match the height of your banner */
    }
    
    .navbar.scrolled {
      background-color: var(--nav-scroll-bg);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      padding: 0.5rem 2rem;
      top: 0; /* When scrolled, navbar sticks to the very top */
    }

    .logo {
      font-family: 'Cinzel Decorative';
      font-size: 1.8rem;
      font-weight: 700;
      color: var(--nav-link-color);
      transition: color 0.3s;
      z-index: 1001;
      display: flex;
      align-items: center;
    }
.logo-text {
  font-family: 'Cinzel Decorative';
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--nav-link-color);
  transition: color 0.3s;
}

    .logo img {
      height: 40px;
      margin-right: 10px;
    }

    .nav-links {
      display: flex;
      gap: 2rem;
      align-items: center;
    }

    .nav-links a {
      text-decoration: none;
      color: var(--nav-link-color);
      font-weight: 600;
      position: relative;
      transition: color 0.3s;
    }

    .navbar.scrolled .logo,
    .navbar.scrolled .nav-links a {
      color: var(--nav-scrolled-text);
    }

    .nav-links a::after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: -5px;
      left: 0;
      background-color: var(--accent-color-2);
      transition: width 0.3s;
    }

    .nav-links a:hover::after {
      width: 100%;
    }
    
    /* --- Hamburger Menu Styles --- */
    .hamburger {
      display: none;
      cursor: pointer;
      z-index: 1001;
    }

    .hamburger input { display: none; }

    .hamburger svg {
      height: 2.5em;
      transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    .line {
      fill: none;
      stroke: var(--hamburger-line-color);
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 3;
      transition: stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
                  stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1),
                  stroke 0.3s ease;
    }
    
    .navbar.scrolled .hamburger .line {
        stroke: var(--hamburger-scrolled-line-color);
    }

    .line-top-bottom { stroke-dasharray: 12 63; }

    .hamburger input:checked + svg { transform: rotate(-45deg); }

    .hamburger input:checked + svg .line-top-bottom {
      stroke-dasharray: 20 300;
      stroke-dashoffset: -32.42;
    }
    
    /* --- Theme Toggle Styles --- */
    .theme-checkbox {
      --toggle-size: 12px;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      width: 6.25em;
      height: 3.125em;
      background: -webkit-gradient(linear, left top, right top, color-stop(50%, #efefef), color-stop(50%, #2a2a2a)) no-repeat;
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
      width: 2.25em;
      height: 2.25em;
      position: absolute;
      top: 0.438em;
      left: 0.438em;
      background: linear-gradient(to right, #efefef 50%, #2a2a2a 50%) no-repeat;
      background-size: 205%;
      background-position: 100%;
      border-radius: 50%;
      transition: 0.4s;
    }

    .theme-checkbox:checked::before {
      left: calc(100% - 2.25em - 0.438em);
      background-position: 0;
    }

    .theme-checkbox:checked {
      background-position: 100%;
    }
    
    .theme-switcher-wrapper {
        display: flex;
        align-items: center;
    }

    .hero {
      height: 100vh;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      color: var(--hero-text-color);
      overflow: hidden;
      /* Add padding top to account for the fixed navbar and disclaimer */
      padding-top: 76px; /* Approx height of disclaimer + initial navbar */
      box-sizing: border-box;
    }

    #hero-video {
        position: absolute;
        top: 50%;
        left: 50%;
        min-width: 100%;
        min-height: 100%;
        width: auto;
        height: auto;
        z-index: -1;
        transform: translateX(-50%) translateY(-50%);
        background-size: cover;
    }

    .hero-content {
      background-color: var(--hero-overlay-bg);
      padding: 2rem;
      border-radius: 10px;
      z-index: 1;
      max-width: 90%;
    }

    .hero h1 {
      font-family: 'Playfair Display', serif;
      font-size: 4rem;
      margin: 0;
      font-weight: normal;
    }
    
    .hero-title .letter { display: inline-block; line-height: 1em; }

    .hero p { font-size: 1.5rem; margin: 1rem 0 2rem; }

    .cta-button {
      padding: 1rem 2rem;
      background-color: var(--accent-color-1);
      color: #fff;
      text-decoration: none;
      font-weight: 600;
      border-radius: 50px;
      transition: background-color 0.3s, transform 0.3s;
    }

    .cta-button:hover {
      background-color: #d46a4d;
      transform: translateY(-3px);
    }
    
    .featured-products {
      padding: 4rem 2rem;
      text-align: center;
    }

    .featured-products h2 {
      font-family: 'Playfair Display', serif;
      font-size: 2.5rem;
      margin-bottom: 2rem;
    }

    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .product-card {
      background: var(--card-bg);
      color: var(--text-color);
      border-radius: 10px;
      box-shadow: 0 8px 24px var(--card-shadow);
      overflow: hidden;
      transition: transform 0.3s, box-shadow 0.3s, background-color 0.4s, color 0.4s;
    }

    .product-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 12px 32px var(--card-hover-shadow);
    }

    .product-card img { width: 100%; height: 250px; object-fit: cover; }

    .product-card h3 {
      font-family: 'Playfair Display', serif;
      font-size: 1.5rem;
      margin: 1rem 0 0.5rem;
    }

    .product-card p {
      padding: 0 1.5rem;
      color: var(--text-color);
      opacity: 0.8;
    }

    .product-btn {
      padding: 0.8rem 1.5rem;
      background-color: var(--text-color);
      color: var(--bg-color);
      border: none;
      border-radius: 50px;
      cursor: pointer;
      margin: 1.5rem 0;
      transition: background-color 0.3s, color 0.3s;
    }

    .product-btn:hover {
      opacity: 0.8;
    }

    /* --- Root variables for easy theming --- */
    :root {
      --footer-bg-light: #fffaf0; /* floralwhite */
      --footer-text-light: #333333; /* Darker grey for contrast */
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
       margin-top: 4rem;
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
    .footer-section.quick-links .footer-links a,
    .footer-section.information .footer-links a {
      color: white;
      opacity: 0.85;
      font-weight: 500;
      text-decoration: none;
      transition: opacity 0.25s ease, color 0.25s ease;
    }
    .footer-section.information .footer-links a {
        color: white;
    }

    .footer-section.quick-links .footer-links a:hover,
    .footer-section.information .footer-links a:hover {
      color: var(--footer-accent);
      opacity: 1;
      text-decoration: underline;
    }


    /* --- Media Queries (Mobile-First Approach) --- */

    /* Default styles for mobile devices (up to 479px) */
    .hero h1 { font-size: 2.5rem; }
    .hero p { font-size: 1.2rem; }
    .logo { font-size: 1.5rem; }
    .navbar, .navbar.scrolled { padding: 0.5rem 1rem; }
    .hamburger { display: block; }
    .nav-links {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
      background-color: var(--mobile-menu-bg);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      justify-content: center;
      transform: translateX(-100%);
      transition: transform 0.3s ease-in-out;
    }
    .nav-links.active { transform: translateX(0); }
    .nav-links a {
      color: var(--mobile-menu-text);
      font-size: 1.5rem;
    }
    .nav-links a:hover::after { width: 0; }
    .theme-switcher-wrapper { margin-top: 2rem; }
    .featured-products { padding: 3rem 1rem; }
    .featured-products h2 { font-size: 2rem; }
    .product-grid { grid-template-columns: 1fr; }
    .footer-content {
      text-align: center;
      grid-template-columns: 1fr;
    }
    .footer-section { margin-bottom: 2rem; }
    .social-links { justify-content: center; }
    .footer-newsletter { margin-top: 1rem; }

    /* Small to Medium Devices (e.g., larger phones, 480px and up) */
    @media (min-width: 480px) {
      .hero h1 { font-size: 1.8rem; }
      .hero p { font-size: 1rem; }
      .product-grid { grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); }
    }

    /* Tablets (768px and up) */
    @media (min-width: 768px) {
      .hero h1 { font-size: 3.5rem; }
      .hero p { font-size: 1.4rem; }
      .featured-products { padding: 4rem 1.5rem; }
      .featured-products h2 { font-size: 2.2rem; }
      .product-grid { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
      .footer-content {
        text-align: left;
        grid-template-columns: repeat(2, 1fr);
      }
      .footer-section:last-child {
        grid-column: span 2;
        margin-top: 2rem;
      }
      .social-links { justify-content: flex-start; }
      
    }

    /* Desktops (992px and up) */
    @media (min-width: 992px) {
      .hero h1 { font-size: 4rem; }
      .hero p { font-size: 1.5rem; }
      .logo { font-size: 1.8rem; }
      .navbar, .navbar.scrolled { padding: 1rem 2rem; }
      .hamburger { display: none; }
      .nav-links {
        display: flex;
        flex-direction: row;
        position: static;
        width: auto;
        height: auto;
        background-color: transparent;
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
        transform: translateX(0);
        gap: 2rem;
      }
      .nav-links a {
        color: var(--nav-link-color);
        font-size: 1rem;
      }
      .navbar.scrolled .nav-links a { color: var(--nav-scrolled-text); }
      .nav-links a:hover::after { width: 100%; }
      .theme-switcher-wrapper { margin-top: 0; }
      .footer-content {
        grid-template-columns: repeat(4, 1fr);
      }
      .footer-section:last-child {
        grid-column: auto;
        margin-top: 0;
      }
    }

    /* Large Desktops (1200px and up) */
    @media (min-width: 1200px) {
      .navbar, .navbar.scrolled { padding: 1.5rem 4rem; }
      .nav-links { gap: 2.5rem; }
      .featured-products h2 { font-size: 2.5rem; }
    }

    /* Extra Large Desktops (1440px and up) */
    @media (min-width: 1440px) {
      .featured-products, .footer {
        padding-left: 6rem;
        padding-right: 6rem;
      }
      .hero h1 {
        font-size: 5rem;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      {/* Disclaimer Banner */}
      {/* <div className="disclaimer-banner">
        END OF SEASON SALE - UP TO 50% OFF
      </div> */}
      <div className="home-container">
        {/* Navbar */}
        <nav className="navbar" ref={navbarRef}>
          <div className="logo">
  <img
    src="/logo.png"
    alt="Path to Page Logo"
    width="40"
    height="40"
  />
  <span className="logo-text">Path to Page</span>
</div>


          <label className="hamburger">
            <input
              type="checkbox"
              checked={isMenuOpen}
              onChange={() => setIsMenuOpen(!isMenuOpen)}
            />
            <svg viewBox="0 0 32 32">
              <path
                className="line line-top-bottom"
                d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
              ></path>
              <path className="line" d="M7 16 27 16"></path>
            </svg>
          </label>
          <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
            {/* Smooth scroll link to home */}
            <a href="#top" onClick={(e) => handleSmoothScroll(e, "top")}>
              Home
            </a>
            <a href="/shop" onClick={() => setIsMenuOpen(false)}>
              Shop
            </a>
            <a href="/Wishlist" onClick={() => setIsMenuOpen(false)}>
              Wishlist
            </a>
            <a href="/cart" onClick={() => setIsMenuOpen(false)}>
              Cart
            </a>
            <a href="/about" onClick={() => setIsMenuOpen(false)}>
              About
            </a>
            <a href="/Myaccount " onClick={() => setIsMenuOpen(false)}>
              Profile
            </a>
              {/* <div className="theme-switcher-wrapper">
                <input
                  type="checkbox"
                  className="theme-checkbox"
                  onChange={toggleTheme}
                  checked={theme === "dark"}
                />
              </div> */}
          </div>
        </nav>

        {/* Hero Section */}
        <header className="hero" id="top">
          <video
            autoPlay
            loop
            muted
            playsInline
            id="hero-video"
            preload="none"
            poster="https://i.imgur.com/your-optimized-poster-image.jpg"
          >
            <source
              src="https://videos.pexels.com/video-files/6074179/6074179-uhd_2732_1440_25fps.mp4"
              type="video/mp4"
            />
            {/* Add a track element for captions */}
            <track
              kind="captions"
              src="/path/to/captions.vtt"
              srclang="en"
              label="English"
            />
            Your browser does not support the video tag.
          </video>
          <div className="hero-content">
            <h1 className="hero-title">
              Turn your camera roll into a roll of stories
            </h1>
            <p>
              Catch a moment. Trap it on paper. Sneak it into your book of
              adventures — before it escapes.
            </p>
            {/* <a
              href="#featured"
              className="cta-button"
              onClick={(e) => handleSmoothScroll(e, "featured")}
            >
              Begin Your Legacy
            </a> */}
          </div>
        </header>

        {/* Featured Products Section */}
        <section id="featured" className="featured-products">
          <h2>Our Collection Products</h2>
          <div className="product-grid">
            <div className="product-card">
              <img
                src="https://i.pinimg.com/736x/e0/62/01/e06201d44f84f51fceb8fc621d690740.jpg"
                alt="Travel Journal"
                width="300"
                height="250"
              />
              <h3>Journal's </h3>
              <p>
                A handcrafted, leather-bound companion for your travel memories.
              </p>
              <button className="product-btn">View Details</button>
            </div>
            <div className="product-card">
              <img
                src="https://i.pinimg.com/736x/95/37/4a/95374a33b9561048e09172d1a93be3ff.jpg"
                alt="Antique Compass"
                width="300"
                height="250"
              />
              <h3>BookMarks</h3>
              <p>A vintage-style brass compass to guide your wanderings.</p>
              {/* <button className="product-btn">View Details</button> */}
            </div>
            <div className="product-card">
              <img
                src="https://i.pinimg.com/1200x/4d/19/7d/4d197d92d0d727744b98a94773410cf2.jpg"
                alt="Fountain Pen"
                width="300"
                height="250"
              />
              <h3>Potli Bag</h3>
              <p>An elegant fountain pen for scripting your epic tales.</p>
              {/* <button className="product-btn">View Details</button> */}
            </div>
            {/* <div className="product-card">
              <img
                src="https://i.pinimg.com/1200x/5c/b6/75/5cb675352df67fb3d8ee439fa62ed363.jpg"
                alt="Thank You card"
                width="300"
                height="250"
              />
              <h3>Thank You card</h3>
              <p>An elegant fountain pen for scripting your epic tales.</p>
              <button className="product-btn">View Details</button>
            </div> */}
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section quick-links">
              <h3>Quick Links</h3>
              <ul className="footer-links">
                <li>
                  {/* Smooth scroll link to home */}
                  <a href="#top" onClick={(e) => handleSmoothScroll(e, "top")}>
                    Home
                  </a>
                </li>
                <li>
                  {/* Smooth scroll link to featured products */}
                  <a
                    href="#featured"
                    onClick={(e) => handleSmoothScroll(e, "featured")}
                  >
                    Shop
                  </a>
                </li>
                <li>
                  <a href="/cart">Cart</a>
                </li>
                <li>
                  <a href="/about">About</a>
                </li>
              </ul>
            </div>
            <div className="footer-section information">
              <h3>Information</h3>
              <ul className="footer-links">
                <li>
                  <a href="/privacy">Privacy Policy</a>
                </li>
                <li>
                  <a href="/terms">Terms of Service</a>
                </li>
                <li>
                  <a href="/faq">FAQ</a>
                </li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Contact Us</h3>
              <div className="contact-info">
                <p>Email: contact@pathtopage.com</p>
                <p>Phone: (123) 456-7890</p>
              </div>
              {/* Social Media Buttons */}
              <div className="social-links">
                <button className="button" aria-label="GitHub">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 496 512"
                  >
                    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3.3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.3-6.2-10.1-27.8 2.3-57.4 0 0 21.1-6.9 69.2 25.8 20.1-5.6 41.6-8.3 62.1-8.3 20.6 0 42.1 2.8 62.1 8.3 48.1-32.6 69.2-25.8 69.2-25.8 12.4 29.6 4.6 51.2 2.3 57.4 16 17.6 23.6 31.4 23.6 58.9 0 96.5-58.7 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                  </svg>
                </button>
                <button className="button" aria-label="Instagram">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 448 512"
                  >
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                  </svg>
                </button>
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
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="copyright">
              &copy; 2024 Path to Page. All Rights Reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
