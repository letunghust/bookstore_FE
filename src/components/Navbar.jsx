import React, { useEffect, useState, useContext } from 'react'
import { Link } from "react-router-dom";
import { FaBahtSign } from "react-icons/fa6";
import { FaAffiliatetheme, FaBoltLightning } from "react-icons/fa6";
import './NavBar.css'
import { ThemeContext } from '../App';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky ] = useState(false);
    // const darkTheme = useContext(ThemeContext)
    const {darkTheme, toggleTheme} = useContext(ThemeContext)
    console.log(darkTheme)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }
  
    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY > 100) {
                setIsSticky(true);
            }
            else {
                setIsSticky(false);
            }
        }

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.addEventListener("scroll", handleScroll);
        }
    }, [])

    // navItems here
    const navItems = [
        {link: "Home", path: "/"},
        {link: "About", path: "/about"},
        {link: "Shop", path: "/shop"},
        {link: "Sell your book", path: "/admin/dashboard"},
        {link: "Blog", path: "/blog"}
    ]
  return (
    <header>
        <nav className='flex justify-between'>
            <div className='flex gap-5 '>
                {/* logo */}
                <Link to="/" className="logo flex items-center text-2xl font-bold text-gray-800">
                    <FaBahtSign className="mr-2" /> Books
                </Link>
                <ul className="flex space-x-4">
                    {navItems.map(({ link, path }) => (
                    <li key={path}>
                        <Link to={path} className="text-gray-800">
                        {link}
                        </Link>
                    </li>
                    ))}
                </ul>
            </div>
            <div className='flex'>
                <FaAffiliatetheme style={{ fontSize: "5rem" }} onClick={toggleTheme} />
                <FaBoltLightning style={{ fontSize: "5rem" }} onClick={toggleTheme} />
            </div>
        </nav>
    </header>
  )
}

export default Navbar