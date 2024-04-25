import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBahtSign } from "react-icons/fa6";
import { FaAffiliatetheme, FaBoltLightning } from "react-icons/fa6";
import "./NavBar.css";
import { BsCart } from "react-icons/bs";
import { ThemeContext } from "../App";
// import LoginForm from "../pages/LoginForm";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Navbar = () => {
  // const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [isSticky, setIsSticky] = useState(false);
  const { darkTheme, toggleTheme } = useContext(ThemeContext);
  let [isLogedIn, setIsLogedIn] = useState(false);
  const [showPopup, setShowPopUp] = useState(false);
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();
  const defaultAvatar = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1280px-Flag_of_Vietnam.svg.png";
  // const toggleMenu = () => {
  //     setIsMenuOpen(!isMenuOpen);
  // }

  // get info from local storage to get role
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setIsLogedIn(true);
      try {
        const decodedToken = jwtDecode(storedToken);
        // console.log(decodedToken._id)
        const userId = decodedToken._id;

        const fetchUserData = async () => {
          try {
            const response = await axios.get(
              `${import.meta.env.VITE_BACKEND_URL}/user/${userId}`
            );
            // console.log(response)
            // console.log('data' ,response.data.role)
            setUserRole(response.data.role);
          } catch (error) {
            console.log(error);
          }
        };
        fetchUserData();
      } catch (error) {
        console.error("Error decoding token from localStorage:", error);
        // Xử lý lỗi hoặc đặt giá trị mặc định cho userRole
      }
    } else {
      setIsLogedIn(false);
    }
  }, []);
  // }, [setIsLogedIn]);

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

  // open pop up when click avatar
  const togglePopup = () => {
    setShowPopUp(!showPopup);
  }

  const navItems = [
    { link: "Home", path: "/" },
    { link: "Recommend", path: "/recommend" },
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
          <ul className="flex items-center">
            {navItems.map(({ link, path }) => (
              <li key={path} className="hover:bg-[#ccc] h-full flex items-center px-2" >
                <Link to={path} className="hover:text-blue-500 transition-colors duration-300 w-full" >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-x-2 items-center">
          {/* change light and dark theme */}
          <FaAffiliatetheme
            style={{ fontSize: "2rem" }}
            onClick={toggleTheme}
          />
          {/* link to cart */}
          <Link to="/cart">
            <BsCart className="text-2xl" />
          </Link>
          {/* {isLogedIn ? (
            <button onClick={handleLogout}> Logout </button>
          ) : (
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
          )} */}
          {isLogedIn ? (
            <div>
              <img src={defaultAvatar} alt="Avatar" onClick={togglePopup}  className="w-10 h-10 rounded-full cursor-pointer"/>
              {showPopup ? (
               <div className="absolute right-0 mt-2 bg-white rounded-md shadow-lg z-10">
                  <Link to='/profile'  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"> 
                      Your profile
                  </Link>
                  <button onClick={handleLogout}  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"> Logout </button>
                </div>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <Link to="/login"  className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
             Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
