import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="w-full py-4 px-4  md:px-8 bg-transparent z-10 relative">
      <div className="flex items-center justify-between ">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
          NoteMaster
        </h1>
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-200 hover:text-white transition-colors duration-200 absolute top-4 left-4 z-20"
        >
          {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
        <nav
          className={`md:flex md:space-x-4 ${
            isMenuOpen ? 'block' : 'hidden'
          } absolute md:static top-16 right-4 md:right-auto md:top-auto md:bg-transparent bg-gray-800 rounded-lg shadow-lg md:shadow-none md:rounded-none z-10`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 px-4 md:px-0">
            <li>
              <a
                href="#"
                className="text-gray-200 hover:text-white transition-colors duration-200 text-center"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-200 hover:text-white transition-colors duration-200 text-center"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-200 hover:text-white transition-colors duration-200 text-center"
              >
                Contact
              </a>
            </li>
            <li>
              <Link
                to="/login"
                className="text-gray-200 hover:text-white transition-colors duration-200 text-center"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className="text-gray-200 hover:text-white transition-colors duration-200 text-center"
              >
                Signup
              </Link>
            </li>
            <li>
              <a
                href="/"
                className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-600 transition-all duration-200 transform hover:scale-105 text-center"
              >
                Get Started
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
