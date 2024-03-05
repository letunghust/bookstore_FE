import './App.css'
import {Outlet} from 'react-router-dom'
import Navbar from './components/Navbar'
import { useState, createContext } from 'react'

export const ThemeContext = createContext()
function App() {
  const [darkTheme, setDarkTheme] = useState(true);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
    console.log(darkTheme);
  };

  return (
    <ThemeContext.Provider value={{darkTheme, toggleTheme}}>   
       <Navbar/>
       <Outlet/>
    </ThemeContext.Provider>
  )
}

export default App
