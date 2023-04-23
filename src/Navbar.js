import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiSearch } from "react-icons/hi";

const Navbar = () => {
  const [navbar, setNavbar] = useState(true);
  const [showSearchbar, setShowSearchbar] = useState(false);
  const changeBackground = (e) => {
    if (window.scrollY > 20) {
      setNavbar(false);
    } else {
      setNavbar(true);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => window.addEventListener("scroll", changeBackground);
  }, []);

  return (
    <div
      className={`fixed   left-0 right-0 top-0 transition-colors duration-500 ${
        navbar
          ? " opcaity-50 bg-gradient-to-b from-black to-transparent"
          : " bg-black"
      } `}
    >
      <div className="flex justify-between items-center h-14">
        <Link to="/" className="">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
            alt="Netflix Logo"
            className="h-6 ml-9"
          />
        </Link>

        <div className="flex items-center gap-14">
          <Link to="/movieSearch" className="flex gap-2 items-center">
            <div className="text-white">Search</div>

            <HiSearch
              className="text-white pt-1"
              onMouseEnter={() => setShowSearchbar(true)}
            />
          </Link>
          <Link to="/categories" className="text-white ">
            Categories
          </Link>

          <Link to="/profile" className="">
            <img
              src="https://ih1.redbubble.net/image.618427277.3222/flat,800x800,075,f.u2.jpg"
              alt="Netflix user"
              className="h-8 mr-8 rounded-md"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
