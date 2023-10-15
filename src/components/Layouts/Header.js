import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaMoon, FaSearch } from "react-icons/fa";
import {BsCartFill, BsPersonCircle, BsSun} from "react-icons/bs";
import { useCheckToken } from "../../hooks";
import { Search } from "../Sections/Search";
import { DropdownLoggedOut, DropdownLoggedIn } from "../index";
import { useCart } from "../../context";
import Logo from "../../assets/images/logo.svg";


export const Header = () => {
  const {cartList} = useCart();
  const [darkMode, setDarkMode] = useState( JSON.parse(localStorage.getItem("codeBook-darkMode")) || false);
  const [searchSection, setSearchSection] = useState(false);
  const [dorpDown, setDropDown] = useState(false);
  // const [isTokenExpired, setIsTokenExpired] = useState(useCheckToken());
  const isTokenExpired = useCheckToken();

  useEffect(() => {
    if(darkMode) {
      localStorage.setItem("codeBook-darkMode", JSON.stringify(darkMode));
      document.documentElement.classList.add("dark");
      document.body.classList.add("bg-slate-800");
    } else {
      localStorage.setItem("codeBook-darkMode", JSON.stringify(darkMode));
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("bg-slate-800");
    }
  }, [darkMode]);

  return (
    <header>      
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
              <Link to="/" className="flex items-center">
                <img src={Logo} className="h-8 -ml-2" alt="CodeBook Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">CodeBook</span>
              </Link>
              <div className="flex items-center relative">
                {!darkMode && <FaMoon onClick={() => setDarkMode(!darkMode)} className="cursor-pointer text-xl whitespace-nowrap text-gray-700 hover:text-gray-800 dark:text-white mr-5"/>}
                {darkMode && <BsSun onClick={() => setDarkMode(!darkMode)} className="cursor-pointer text-xl whitespace-nowrap text-gray-700 hover:text-gray-800 dark:text-white mr-5"/>}
                <FaSearch onClick={() => setSearchSection(!searchSection)} className="cursor-pointer text-xl whitespace-nowrap text-gray-700 hover:text-gray-800 dark:text-white mr-5"/>
                <Link to="cart" className="relative">
                  <span className="flex items-center justify-center absolute -top-2 left-2 w-4 h-4 bg-red-600 rounded-full text-white text-center text-xs">{cartList.length}</span>
                  <BsCartFill className="cursor-pointer text-xl whitespace-nowrap text-gray-700 hover:text-gray-800 dark:text-white mr-5"/>
                </Link>
                <BsPersonCircle onClick={() => setDropDown(!dorpDown)} className="cursor-pointer text-xl whitespace-nowrap text-gray-700 hover:text-gray-800 dark:text-white"/>
                {dorpDown && (isTokenExpired ? <DropdownLoggedOut setDropDown={setDropDown} />  :  <DropdownLoggedIn setDropDown={setDropDown} />)}
              </div>
          </div>
      </nav>
      {searchSection && <Search setSearchSection={setSearchSection} />}
    </header>
  )
}
