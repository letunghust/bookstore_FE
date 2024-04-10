import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useState, createContext, useEffect } from "react";
import Footer from "./components/Footer";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement } from "@stripe/react-stripe-js";

export const ThemeContext = createContext();

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY);
const stripePromise = loadStripe('pk_test_51P1hnME80pxaWCvIsuSE6XO7LLLuoWmZKjvuXDRD99v10auWXzuvCKHKtidf7tLUcSczK806Pvbt2PwRjUL6L3Jk00sNLNslNz');
function App() {
  const [darkTheme, setDarkTheme] = useState(true);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  return (
    // <Elements
    //   stripe={stripePromise}
    //   options={{
    //     clientSecret:
    //       "pi_3P3WUKE80pxaWCvI0rce7moD_secret_wbNwhXJj7LarsJaYScKpdS5GE",
    //     elements: { cardElement: CardElement },
    //   }}
    // >
      <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
        <div className={`${darkTheme ? "light" : "dark"}`}>
          <Navbar />
          <Outlet />
          <Footer />
        </div>
      </ThemeContext.Provider>
    // {/* </Elements> */}
  );
}

export default App;
