import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useState, createContext, useEffect } from "react";
import Footer from "./components/Footer";
import { ToastContainer } from 'react-toastify';
import {Provider} from 'react-redux';
import store from "./store/configureStore"

export const ThemeContext = createContext();

function App() {
  const [darkTheme, setDarkTheme] = useState(true);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  return (
    <Provider store={store} >
      <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
        <div className={`${darkTheme ? "light" : "dark"}`}>
          <Navbar />
          <Outlet />
          <Footer />
        </div>
        <ToastContainer />
      </ThemeContext.Provider>
    </Provider>
  );
}

export default App;
