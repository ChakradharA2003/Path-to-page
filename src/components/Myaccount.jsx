import React, { useState, useEffect, useRef } from "react";

// The main MyAccount component
const MyAccount = () => {
  // State to track the currently active section

  const [profilePic, setProfilePic] = useState(() => {
    try {
      return localStorage.getItem("profilePic") || null;
    } catch (e) {
      console.error("localStorage read error:", e);
      return null;
    }
  });

  const inputFileRef = useRef(null); // [P2]

  // [P3] Keep localStorage in sync (write on change)
  useEffect(() => {
    try {
      if (profilePic) localStorage.setItem("profilePic", profilePic);
      else localStorage.removeItem("profilePic");
    } catch (e) {
      console.error("localStorage write error:", e);
    }
  }, [profilePic]); // [P3 end]
  const [activeSection, setActiveSection] = useState("account");

  // New state to manage the editing mode for Account Details
  const [isEditing, setIsEditing] = useState(false);

  // State for editable account data
  const [accountData, setAccountData] = useState({
    name: "Username",
    email: "Email",
    phoneNumber: "1234567891",
    password: "******",
    gender: "Select",
  });

  // State to temporarily hold form data during editing
  const [tempData, setTempData] = useState({ ...accountData });

  // New state for the credit card modal
  const [showCardModal, setShowCardModal] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardOwner, setCardOwner] = useState("");

  // Refs for the content container and menu items for animations
  const contentRef = useRef(null);
  const menuItemsRef = useRef([]);

  // useEffect hook to handle animations when the activeSection changes
  useEffect(() => {
    // GSAP animation for the content fade and slide
    const animateContent = () => {
      if (window.gsap && contentRef.current) {
        // We use a fromTo animation to ensure a smooth transition
        // from a hidden state (opacity 0) to a visible state (opacity 1)
        window.gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
        );
      }
    };

    animateContent();
  }, [activeSection]);

  // useEffect hook for the Anime.js animation on the sidebar menu items
  useEffect(() => {
    if (window.anime) {
      menuItemsRef.current.forEach((item) => {
        if (item && item.classList.contains("active")) {
          window.anime({
            targets: item,
            scale: [1, 1.05],
            boxShadow: [
              "0 0 0 rgba(0,0,0,0)",
              "0 8px 16px rgba(0, 0, 0, 0.15)",
            ],
            duration: 500,
            easing: "easeOutSine",
          });
        }
      });
    }
  }, [activeSection]);

  // Handler for saving account changes (mock function)
  const handleSave = () => {
    // In a real app, you would send this data to a server
    console.log("Saving account data:", tempData);
    setAccountData(tempData); // Update the main data with temporary data
    setIsEditing(false);
  };

  // Handler for canceling edits
  const handleCancel = () => {
    setTempData({ ...accountData }); // Revert temporary data to original
    setIsEditing(false);
  };

  // Handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to render the content for the selected section
  const renderContent = () => {
    switch (activeSection) {
      case "account":
        return (
          <div className="section-content" key="account-content">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              Account Details
            </h2>
            {isEditing ? (
              // Edit mode
              <div className="form-container">
                <style>
                  {`
      .form-container {
        background-color:white;
        padding: 2.5rem;
        border-radius: 1rem;
        box-shadow: 0 4px 20px rgba(8, 8, 8, 1);
        max-width: 500px;
        margin: auto;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      }

      .input-group {
        margin-bottom: 1.5rem;
      }

      .label {
        display: block;
        margin-bottom: 0.3rem;
        font-size: 0.9rem;
        font-weight: bold;
        color: #05060f99;
        transition: color .3s cubic-bezier(.25,.01,.25,1) 0s;
      }

      .input {
        width: 80%;
        height: 44px;
        background-color: #b3b0b02d;
        border-radius: 0.5rem;
        padding: 0 1rem;
        border: 2px solid transparent;
        font-size: 1rem;
        transition: 
          border-color .3s cubic-bezier(.25,.01,.25,1) 0s, 
          color .3s cubic-bezier(.25,.01,.25,1) 0s, 
          background .2s cubic-bezier(.25,.01,.25,1) 0s;
      }
  .input-group.gender {
  width: 87%;

}

.input-group.gender .input {
  width: 100%; /* makes select fill the 80% container */
}

      .input:hover, 
      .input:focus, 
      .input-group:hover .input {
        outline: none;
        border-color: #05060f;
        background-color: #ffffff;
      }

      .input-group:hover .label, 
      .input:focus + .label {
        color: #05060fc2;
      }

      select.input {
        height: 48px;
      }

      .button-container {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
      }

      .save-button, .cancel-button {
        padding: 0.75rem 1.5rem;
        border-radius: 0.5rem;
        font-weight: 600;
        font-size: 1rem;
        cursor: pointer;
        border: none;
        transition: all 0.3s ease;
      }

      .save-button {
        background: #111111ff;
        color: white;
      }
      .save-button:hover {
        background: #eaebeeff;
        color:black;
        transform: translateY(-2px);
      }

      .cancel-button {
        background: #121213ff;
        color: #fafafaf5;
      }
      .cancel-button:hover {
        background: #f7f7f7ff;
        color:black;
        transform: translateY(-2px);
      }
    `}
                </style>

                <div className="input-group">
                  <input
                    type="text"
                    name="name"
                    value={tempData.name}
                    onChange={handleChange}
                    className="input"
                    id="name"
                  />
                  <label className="label" htmlFor="name">
                    Name
                  </label>
                </div>

                <div className="input-group">
                  <input
                    type="email"
                    name="email"
                    value={tempData.email}
                    onChange={handleChange}
                    className="input"
                    id="email"
                  />
                  <label className="label" htmlFor="email">
                    Email
                  </label>
                </div>

                <div className="input-group">
                  <input
                    type="text"
                    name="phoneNumber"
                    value={tempData.phoneNumber}
                    onChange={handleChange}
                    className="input"
                    id="phone"
                  />
                  <label className="label" htmlFor="phone">
                    Phone Number
                  </label>
                </div>

                <div className="input-group">
                  <input
                    type="password"
                    name="password"
                    value={tempData.password}
                    onChange={handleChange}
                    className="input"
                    id="password"
                  />
                  <label className="label" htmlFor="password">
                    Password
                  </label>
                </div>

                <div className="input-group gender">
                  <select
                    name="gender"
                    value={tempData.gender}
                    onChange={handleChange}
                    className="input"
                    id="gender"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                  <label className="label" htmlFor="gender">
                    Gender
                  </label>
                </div>

                <div className="button-container">
                  <button onClick={handleSave} className="save-button">
                    Save
                  </button>
                  <button onClick={handleCancel} className="cancel-button">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // View mode
              <>
                {/* <p className="text-gray-600 mb-6">
                  Here you can view and update your personal information.
                </p> */}
                <div className="info-card">
                  <div className="info-item">
                    <strong>Name:</strong> <span>{accountData.name}</span>
                  </div>
                  <div className="info-item">
                    <strong>Email:</strong> <span>{accountData.email}</span>
                  </div>
                  <div className="info-item">
                    <strong>Phone Number:</strong>{" "}
                    <span>{accountData.phoneNumber}</span>
                  </div>
                  <div className="info-item">
                    <strong>Password:</strong> <span>placeholder</span>
                  </div>
                  <div className="info-item">
                    <strong>Gender:</strong> <span>{accountData.gender}</span>
                  </div>
                </div>
                <div className="mt-8">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="edit-button"
                  >
                    Edit
                    <svg viewBox="0 0 512 512">
                      <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" />
                    </svg>
                  </button>
                </div>
              </>
            )}
          </div>
        );
      case "payments":
        return (
          <div className="section-content" key="payments-content">
            <h2 className="text-4xl font-bold mb-6 text-gray-800">
              Payment Options
            </h2>
            <p className="text-gray-600 mb-8">
              Select your preferred method for secure transactions.
            </p>
            <ul className="payment-options space-y-4">
              <li
                className="payment-item"
                onClick={() => setShowCardModal(true)}
              >
                {/* <div className="payment-icon">💳</div> */}
                <span className="payment-text">Credit/Debit Card</span>
              </li>
              <li className="payment-item">
                {/* <div className="payment-icon"></div> */}
                <span className="payment-text">Netbanking</span>
              </li>
              <li className="payment-item">
                {/* <div className="payment-icon">📲</div> */}
                <span className="payment-text">UPI</span>
              </li>
            </ul>

            {showCardModal && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <div className="modal-header">
                    <h3 className="text-2xl font-bold">
                      Add Credit/Debit Card
                    </h3>
                    <button
                      className="close-button"
                      onClick={() => setShowCardModal(false)}
                    >
                      &times;
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="card-container">
                      <div className="card">
                        <span className="logo">
                          <svg
                            viewBox="0 0 256 83"
                            height="83"
                            width="256"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <defs>
                              <linearGradient
                                y2="100%"
                                y1="-2.006%"
                                x2="54.877%"
                                x1="45.974%"
                                id="logosVisa0"
                              >
                                <stop stopColor="#222357" offset="0%"></stop>
                                <stop stopColor="#254AA5" offset="100%"></stop>
                              </linearGradient>
                            </defs>
                            <path
                              transform="matrix(1 0 0 -1 0 82.668)"
                              d="M132.397 56.24c-.146-11.516 10.263-17.942 18.104-21.763c8.056-3.92 10.762-6.434 10.73-9.94c-.06-5.365-6.426-7.733-12.383-7.825c-10.393-.161-16.436 2.806-21.24 5.05l-3.744-17.519c4.82-2.221 13.745-4.158 23-4.243c21.725 0 35.938 10.724 36.015 27.351c.085 21.102-29.188 22.27-28.988 31.702c.069 2.86 2.798 5.912 8.778 6.688c2.96.392 11.131.692 20.395-3.574l3.636 16.95c-4.982 1.814-11.385 3.551-19.357 3.551c-20.448 0-34.83-10.87-34.946-26.428m89.241 24.968c-3.967 0-7.31-2.314-8.802-5.865L181.803 1.245h21.709l4.32 11.939h26.528l2.506-11.939H256l-16.697 79.963h-17.665m3.037-21.601l6.265-30.027h-17.158l10.893 30.027m-118.599 21.6L88.964 1.246h20.687l17.104 79.963h-20.679m-30.603 0L53.941 26.782l-8.71 46.277c-1.022 5.166-5.058 8.149-9.54 8.149H.493L0 78.886c7.226-1.568 15.436-4.097 20.41-6.803c3.044-1.653 3.912-3.098 4.912-7.026L41.819 1.245H63.68l33.516 79.963H75.473"
                              fill="url(#logosVisa0)"
                            ></path>
                          </svg>
                        </span>
                        <span className="remove">
                          <svg
                            viewBox="0 0 16 16"
                            className="bi bi-trash-fill"
                            fill="currentColor"
                            height="16"
                            width="16"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"></path>
                          </svg>
                        </span>
                        <span className="number">
                          {cardNumber || "**** **** **** ****"}
                        </span>
                        <span className="owner">{cardOwner || "John Doe"}</span>
                      </div>
                    </div>
                    <div className="card-input-group">
                      <label className="input-label">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) =>
                          setCardNumber(
                            e.target.value
                              .replace(/\s/g, "")
                              .replace(/(\d{4})/g, "$1 ")
                              .trim()
                          )
                        }
                        maxLength="19"
                        placeholder="e.g., 1234 5678 9012 3456"
                        className="input-field"
                      />
                    </div>
                    <div className="card-input-group">
                      <label className="input-label">Card Holder Name</label>
                      <input
                        type="text"
                        value={cardOwner}
                        onChange={(e) => setCardOwner(e.target.value)}
                        placeholder="e.g., John Doe"
                        className="input-field"
                      />
                    </div>
                    <button className="add-card-button">Add Card</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case "address":
        return (
          <div className="section-content" key="address-content">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Address</h2>
            <p className="text-gray-600 mb-6">
              Review or update your shipping and billing addresses.
            </p>
            <div className="info-card">
              <div className="info-item">
                <strong>Shipping Address:</strong>{" "}
                <span>123 Main St, Anytown, USA 12345</span>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="my-account-container">
      {/* Top control bar with Back Button & Dark Mode Toggle */}
      <div className="top-controls">
        {/* Back Button */}
        <div className="styled-wrapper" onClick={() => window.history.back()}>
          <button className="back-button">
            <div className="button-box">
              <span className="button-elem">
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="arrow-icon"
                >
                  <path
                    fill="currentColor"
                    d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
                  />
                </svg>
              </span>
              <span className="button-elem">
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="arrow-icon"
                >
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                </svg>
              </span>
            </div>
          </button>
        </div>

        {/* Dark Mode Toggle */}
        <input
          type="checkbox"
          className="theme-checkbox"
          onChange={(e) => {
            document.body.classList.toggle("dark-mode", e.target.checked);
          }}
        />
      </div>

      <h1 className="text-5xl font-extrabold mb-12 text-center text-white text-shadow-lg">
        My Account
      </h1>
      <div className="my-account-layout">
        {/* Left Sidebar */}
        <nav className="sidebar">
          <ul className="space-y-4">
            {["account", "payments", "address"].map((section, index) => (
              <li
                key={section}
                ref={(el) => (menuItemsRef.current[index] = el)}
                onClick={() => setActiveSection(section)}
                className={`menu-item ${
                  activeSection === section ? "active" : ""
                }`}
              >
                {section.charAt(0).toUpperCase() +
                  section.slice(1).replace("-", " ")}
              </li>
            ))}
          </ul>
        </nav>

        {/* Main Content Area */}
        <main ref={contentRef} className="main-content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

// CSS is included here to make the component self-contained
const style = document.createElement("style");
style.innerHTML = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800;900&display=swap');

body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', sans-serif;
  overflow: hidden; /* Hide body scrollbar */
}

.my-account-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh; /* Changed from padding to ensure full screen height */
  padding: 0; /* Removed padding */
  background: #2c3e50; /* A dark, classic blue-gray */
  background: -webkit-linear-gradient(to right, #3498db, #2c3e50);
  background: linear-gradient(to right, #3498db, #2c3e50);
}

.text-shadow-lg {
  text-shadow: 2px 2px 8px rgba(0,0,0,0.2);
}

.my-account-layout {
  display: flex;
  width: 100%; /* Changed to fill the full width */
  height: 100vh; /* Changed to fill the full height */
  background-color: #ffffff;
  border-radius: 0; /* Removed rounded corners for full screen look */
  overflow: hidden; /* Hide scrollbar in the main layout */
  box-shadow: none; /* Removed box shadow */
  padding: 0;
}
/* Hide the scrollbar but keep it functional for the main layout */
.my-account-layout::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.5rem;
}

.my-account-layout::-webkit-scrollbar-track {
    background: transparent;
}

.my-account-layout::-webkit-scrollbar-thumb {
    background-color: transparent;
}
.sidebar {
  width: 300px;
  flex-shrink: 0;
  padding: 3rem 2rem;
  background-color: floralwhite; /* Floral White background */
//   border-right: 1px solid #e2e8f0;
  overflow-y: auto; /* Scrollable sidebar content if needed */
}
.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
    position:relative;
  margin-top:60px;
  gap: 1.7rem; /* Increased gap between items */
}

.sidebar ul li {
  padding: 16px 24px; /* More padding for a bigger clickable area */
  background-color: white; /* White background */
  color: black; /* Black text */
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  font-size: 1.1rem;
  font-weight: 500;
}

.sidebar ul li:hover {
  background-color: #f1f1f1; /* Light gray on hover */
  transform: translateX(4px);
}

.sidebar ul li.active {
  background-color: #111010ff; /* Slightly darker for active */
  font-weight: bold;
}



.menu-item {
  font-family: 'Inter', sans-serif;
  color: #4b5563;
  cursor: pointer;
  padding: 1rem 1.5rem;
  border-radius: 0.75rem;
  font-size: 1.25rem;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  background-color: transparent;
}

.menu-item:hover {
  background-color: #f1f5f9;
  transform: translateX(5px);
}

.menu-item.active {
  background: #3b82f6; /* Blue accent color */
  color: #ffffff;
  font-weight: 700;
  box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);
  transform: translateX(0); /* Reset transform for active item */
}

.menu-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  transition: left 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.menu-item.active::before {
  left: 0;
}

.main-content {
  flex-grow: 1;
  padding: 3rem;
  background-color: white; 
  overflow-y: auto; /* Added for scrollable content */
}
// ----------------------------------------------
  .form-container {
        background-color: #ffffff;
        padding: 2.5rem;
        border-radius: 1rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
        max-width: 500px;
        margin: auto;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      }
      .input-label {
        display: block;
        font-weight: 600;
        color: #334155;
        margin-bottom: 0.5rem;
      }
      .input-field {
        width: 100%;
        padding: 0.75rem 1rem;
        border: 1px solid #cbd5e1;
        border-radius: 0.5rem;
        font-size: 1rem;
        color: #1e293b;
        background-color: #f8fafc;
        transition: all 0.3s ease;
      }
      .input-field:focus {
        border-color: #3b82f6;
        outline: none;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
        background-color: #ffffff;
      }
      .save-button, .cancel-button {
        padding: 0.75rem 1.5rem;
        border-radius: 0.5rem;
        font-weight: 600;
        font-size: 1rem;
        cursor: pointer;
        border: none;
        transition: all 0.3s ease;
      }
    //   .save-button {
    //     background-color: #f0f0f0ff;
    //     color: #ffffff;
    //   }
    //   .save-button:hover {
    //     background-color: #eaebeeff;
    //     transform: translateY(-2px);
    //   }
    //   .cancel-button {
    //     background-color: #e5e7eb;
    //     color: #1f2937;
    //   }
    //   .cancel-button:hover {
    //     background-color: #d1d5db;
    //     transform: translateY(-2px);
    //   }
      .space-y-6 > div {
        margin-bottom: 1.5rem;
      }
      .mt-8.flex.space-x-4 {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
      }
    


.info-card {
  padding: 4rem;
  background-color: #f8f9faff;
  border-radius: 1rem;
  box-shadow: 10px 4px 12px grey;
}

.info-item {
  padding: 1rem; /* more padding inside each item */
  margin-bottom: 0.75rem; /* gap between items */
  border-bottom: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.info-item:last-child {
  margin-bottom: 0;
  border-bottom: none;
}

.info-item:hover {
  background-color: #eef2f7; /* subtle background change on hover */
  transform: translateY(-2px); /* slight lift effect */
}

.info-item strong {
  color: #1e293b;
  width: 150px;
  display: inline-block;
}


.input-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
  margin-bottom: 0.5rem;
}

.input-field {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
  background-color: #ffffff;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.input-field:focus {
  outline: none;
  border-color: #0f0f0fff;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}
.edit-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 140px;
  height: 44px;
  border: none;
  padding: 0 20px;
  background-color: black;
  color: white;
  font-weight: 700;
  cursor: pointer;
  border-radius: 10px;
  margin-top:20px;
  margin-left:20px;
  box-shadow: 5px 5px 0px grey;
  transition: background-color 0.3s, color 0.3s, transform 0.3s, box-shadow 0.3s;
}

.edit-button svg {
  width: 16px;
  position: absolute;
  right: 0;
  margin-right: 20px;
  transition: right 0.3s, margin 0.3s;
}

.edit-button:hover {
  background-color: #f7f7f8ff;
  color: black; /* text changes to black */
  transform: translateY(-2px);
}

.edit-button:hover svg {
  right: 43%;
  margin: 0;
  fill:black;
}

.edit-button:active {
  transform: translate(3px, 3px);
  box-shadow: 2px 2px 0px white;
}


.edit-button, .save-button, .cancel-button {
  padding: 0.75rem 2rem;
  font-weight: 600;
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
}



.save-button {
  background-color: #10b981; /* Green for save */
  color: #ffffff;
  box-shadow: 0 4-x 12px rgba(16, 185, 129, 0.2);
  position: relative;
  overflow: hidden;
}

.save-button:hover {
  background-color: #059669;
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 6px 15px rgba(16, 185, 129, 0.4);
}

.cancel-button {
  background-color: #ef4444; /* Red for cancel */
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
  position: relative;
  overflow: hidden;
}

.cancel-button:hover {
  background-color: #dc2626;
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 6px 15px rgba(239, 68, 68, 0.4);
}

.payment-item {
  display: flex;
  align-items: center;
  padding: 1.25rem 2rem;
  border-radius: 1rem;
  background-color: #f1f5f9;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.125rem;
  font-weight: 500;
  color: #475569;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
.payment-options .payment-item {
  width: 500px;
  margin-bottom: 16px;
  padding: 26px;
  background-color: #05060f0a; /* same background as in input style */
  border-radius: 0.5rem;
  border: 2px solid transparent;
  font-size: 1rem;
  transition: border-color 0.3s cubic-bezier(.25,.01,.25,1),
              color 0.3s cubic-bezier(.25,.01,.25,1),
              background 0.2s cubic-bezier(.25,.01,.25,1);
  cursor: pointer; /* makes it feel clickable */
}

.payment-options .payment-item:last-child {
  margin-bottom: 0;
}

/* Hover / focus effect */
.payment-options .payment-item:hover,
.payment-options .payment-item:focus {
  outline: none;
  border-color: #05060f;
  color: #05060fc2; /* optional: change text color slightly */
}


.payment-item:hover {
  background-color: #e2e8f0;
  transform: translateX(10px) scale(1.02);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.payment-icon {
  font-size: 2rem;
  margin-right: 1.5rem;
  transition: transform 0.3s ease;
}

.payment-item:hover .payment-icon {
  transform: rotate(-10deg) scale(1.1);
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;
}

.modal-content {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 1rem;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  animation: scaleIn 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
}

.close-button {
  background: none;
  border: none;
  font-size: 2rem;
  color: #64748b;
  cursor: pointer;
  transition: color 0.2s ease;
}

.close-button:hover {
  color: #ef4444;
}

.card-container {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.card-input-group {
    margin-bottom: 1.5rem;
}

.add-card-button {
    width: 100%;
    padding: 1rem;
    font-weight: 700;
    border-radius: 0.75rem;
    border: none;
    background-color: #3b82f6;
    color: #ffffff;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
}

.add-card-button:hover {
    background-color: #2563eb;
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(59, 130, 246, 0.4);
}

/* Card styles from Uiverse.io */
.logo svg {
  height: 48px;
  width: 54px;
}

.card {
  background: radial-gradient(circle, white 0%, #d5d5d5 100%);
  width: 300px;
  height: 200px;
  border-radius: 20px;
  position: relative;
  box-shadow: 3px 3px 17px 0px rgba(0, 0, 0, 0.55);
  font-family: 'Inter', sans-serif;
  color: black;
}

.card .remove, .card .logo {
  position: absolute;
  display: inline-block;
  cursor: pointer;
}

.card .remove {
  top: 30px;
  right: 30px;
  opacity: .9;
  color: black;
}

.card .remove:hover {
  color: #f06b5d;
}

.card .logo {
  top: 20px;
  left: 30px;
  font-size: 3em;
  opacity: 1;
}

.card .number, .card .owner {
  display: block;
  position: absolute;
  left: 30px;
  cursor: default;
  color: black;
  opacity: .9;
  transition: color .7s ease-out;
}

.card .number {
  bottom: 60px;
  letter-spacing: 4px;
}

.card .owner {
  bottom: 30px;
  letter-spacing: 1px;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleIn {
  from { transform: scale(0.7); }
  to { transform: scale(1); }
}

/* Top controls container */
.top-controls {
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
}

/* Dark mode styles */
body.dark-mode {
  background-color: #000 !important;
  color: white !important;
}

body.dark-mode .my-account-layout {
  background-color: #121212 !important;
}

body.dark-mode .sidebar {
  background-color: #1e1e1e !important;
  color: white !important;
}

body.dark-mode .main-content {
  background-color: #1a1a1a !important;
  color: white !important;
}

/* From Uiverse.io by cuzpq */
.theme-checkbox {
  --toggle-size: 16px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 6.25em;
  height: 3.125em;
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


/* Back button styles from Uiverse.io */
/* Smaller back button */
.styled-wrapper .back-button {
  display: block;
  position: relative;
  width: 50px;   /* was 76px */
  height: 50px;  /* was 76px */
  background-color: transparent;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
}

.styled-wrapper .back-button:before {
  content: "";
  position: absolute;
  border-radius: 50%;
  inset: 5px; /* smaller inset for reduced size */
  border: 2px solid currentColor; /* thinner border */
  transition:
    opacity 0.4s cubic-bezier(0.77, 0, 0.175, 1) 80ms,
    transform 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) 80ms;
}

.styled-wrapper .back-button:after {
  content: "";
  position: absolute;
  border-radius: 50%;
  inset: 5px;
  border: 3px solid #599a53;
  transform: scale(1.3);
  opacity: 0;
  transition:
    opacity 0.4s cubic-bezier(0.165, 0.84, 0.44, 1),
    transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.styled-wrapper .button-box {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
}

.styled-wrapper .button-elem {
  display: block;
  width: 20px;  /* smaller arrow */
  height: 20px; /* smaller arrow */
  margin: 15px 12px 0 14px; /* adjusted spacing */
  fill: currentColor;
  transform: rotate(360deg);
}

.styled-wrapper .back-button:hover .button-box {
  transform: translateX(-45px); /* adjusted for smaller width */
  transition: 0.4s;
}





/* --- Media Queries for Responsiveness --- */

/* For all devices */
@media (max-width: 10000px) {
  .my-account-container {
    padding: 0; /* Ensures container has no padding on any screen size */
    justify-content: flex-start;
  }
  .my-account-layout {
    width: 100%;
    height: 100vh;
    border-radius: 0;
    box-shadow: none;
  }
  h1.text-5xl {
    display: none; /* Hide the main heading to save space */
  }
}

/* Tablet (portrait) and Mobile */
@media (max-width: 768px) {
  .my-account-layout {
    flex-direction: column;
  }
  .sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e2e8f0;
    padding: 1.5rem 1rem;
    overflow-y: hidden;
  }
  .sidebar ul {
    display: flex;
    justify-content: center;
    gap: 1rem;
    padding: 0;
  }
  .menu-item {
    padding: 0.75rem 1rem;
    font-size: 1rem;
    text-align: center;
  }
  .main-content {
    padding: 2rem 1.5rem;
    height: calc(100vh - 120px); /* Adjust height for main content on mobile */
  }
  .info-item strong {
    display: block;
    width: auto;
    margin-bottom: 0.25rem;
  }
  .info-item {
    display: block;
  }
  .modal-content {
    width: 95%;
    max-height: 90vh;
    overflow-y: auto;
  }
}

/* Smaller mobile devices */
@media (max-width: 480px) {
  .my-account-container {
    padding: 1rem;
  }
  .sidebar ul {
    flex-direction: column;
    gap: 0.5rem;
  }
  .menu-item {
    font-size: 0.875rem;
    padding: 0.75rem;
  }
  .main-content {
    padding: 1rem;
  }
}
`;
document.head.appendChild(style);

// Load the external animation libraries via CDN
const gsapScript = document.createElement("script");
gsapScript.src =
  "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
document.head.appendChild(gsapScript);

const animeScript = document.createElement("script");
animeScript.src =
  "https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js";
document.head.appendChild(animeScript);

// Exporting the main component as App for easy rendering
export default function App() {
  return <MyAccount />;
}
