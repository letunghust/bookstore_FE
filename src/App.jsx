import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useState, createContext, useEffect } from "react";
import Footer from "./components/Footer";

export const ThemeContext = createContext();
function App() {
  const [darkTheme, setDarkTheme] = useState(true);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };
  
  return (
    <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
      <div className={`${darkTheme ? "light" : "dark"}`}>
        <Navbar />
        <Outlet />
        <Footer/>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
