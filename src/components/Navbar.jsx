import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBahtSign } from "react-icons/fa6";
import { FaAffiliatetheme, FaBoltLightning } from "react-icons/fa6";
import "./NavBar.css";
import { BsCart } from "react-icons/bs";
import { ThemeContext } from "../App";
import LoginForm from "../pages/LoginForm";
import {jwtDecode}  from "jwt-decode";
import axios from "axios";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const { darkTheme, toggleTheme } = useContext(ThemeContext);
  let [isLogedIn, setIsLogedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();
  // const toggleMenu = () => {
  //     setIsMenuOpen(!isMenuOpen);
  // }

  // get info from local storage to get role 
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);
        console.log(decodedToken._id)
        const userId = decodedToken._id;

        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/${userId}`);
                // console.log(response)
                // console.log('data' ,response.data.role)
                setUserRole(response.data.role);
            } catch(error) {
                console.log(error);
            }
        }
        // const userRole = decodedToken.role; // Lấy quyền từ payload của token
        // // setIsLoggedIn(true);
        // setUserRole(userRole);
        fetchUserData();
      } catch (error) {
        console.error("Error decoding token from localStorage:", error);
        // Xử lý lỗi hoặc đặt giá trị mặc định cho userRole
      }
    }
  }, []);

  // handle log out
  const handleLogout = () => {
    setIsLogedIn(false);
    localStorage.removeItem("token");
    navigate("/login");
  };

  // scroll page
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, []);

  // navItems here
  // const navItems = [
  //     {link: "Home", path: "/"},
  //     {link: "About", path: "/about"},
  //     {link: "Shop", path: "/shop"},
  //     // {link: "Admin", path: "/admin"},
  //     userRole === 'admin' ? {link: "Admin", path: "/admin"} : null,
  //     {link: "Blog", path: "/blog"},
  // ]
  const navItems = [
    { link: "Home", path: "/" },
    { link: "About", path: "/about" },
    { link: "Shop", path: "/shop" },
    { link: "Admin", path: "/admin" },
    { link: "Blog", path: "/blog" },
  ].filter((item) => item.link !== "Admin" || userRole === "admin");
  return (
    <header>
      <nav className={`flex justify-between`}>
        <div className="flex gap-5 ">
          {/* logo */}
          <Link to="/" className="logo flex items-center text-2xl font-bold ">
            <FaBahtSign className="mr-2" /> Books
          </Link>
          <ul className="flex space-x-4">
            {navItems.map(({ link, path }) => (
              <li key={path}>
                <Link to={path} className="">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex">
          <FaAffiliatetheme
            style={{ fontSize: "2rem" }}
            onClick={toggleTheme}
          />
          <Link to="/cart">
            <BsCart className="text-2xl" />
          </Link>
          {isLogedIn ? (
            <button onClick={handleLogout}> Logout </button>
          ) : (
            // <LoginForm setIsLogedIn={setIsLogedIn} />

            <Link to="/login">
              <button
                onClick={() => {
                  setIsLogedIn(true);
                  // navigate("/admin");
                }}
              >
                Login
              </button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
