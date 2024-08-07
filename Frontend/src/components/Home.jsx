import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
// import { useUser } from './Context/UserContext'; // Adjust the import path if needed
import { NavLink } from 'react-router-dom';
import Navbar from './shared/Navbar';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const { user } = useUser(); // Access user context

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="relative min-h-screen bg-gray-900 text-white flex flex-col items-center font-sans overflow-x-hidden">
      {/* Header Section */}
      {/* <header className="w-full py-4 px-4 md:px-8 bg-transparent z-10 relative">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300 cursor-default">
            NoteMaster
          </h1>
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-200 hover:text-white transition-colors duration-200 z-20 focus:outline-none"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-8 w-8" />
            ) : (
              <Bars3Icon className="h-8 w-8" />
            )}
          </button>
          <nav
            className={`${
              isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
            } md:flex md:space-x-4 md:translate-y-0 md:opacity-100 absolute md:static top-16 left-0 right-0 md:right-auto md:top-auto bg-gray-800 md:bg-transparent bg-opacity-95 md:bg-opacity-0 rounded-lg md:rounded-none shadow-lg md:shadow-none transition-all duration-300 ease-in-out transform z-10`}
          >
            <ul className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 py-4 md:py-0 px-4 md:px-0">
              <li>
                <a
                  href="/"
                  className="text-gray-200 hover:text-white transition-colors duration-200 text-center"
                >
                  Home
                </a>
              </li>
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
                  Contact
                </a>
              </li>
              {user ? (
                <li>
                  <span className="text-gray-200 text-center">
                    Hello, {user.fullname}
                  </span>
                </li>
              ) : (
                <>
                  <li>
                    <a
                      href="login"
                      className="text-gray-200 hover:text-white transition-colors duration-200 text-center"
                    >
                      Login
                    </a>
                  </li>
                  <li>
                    <a
                      href="signup"
                      className="text-gray-200 hover:text-white transition-colors duration-200 text-center"
                    >
                      Signup
                    </a>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header> */}

      {/* Hero Section */}

      <Navbar/>
      <section className="flex-1 flex flex-col items-center justify-center text-center py-8 px-4 md:px-8 cursor-default">
  <h2 className="text-2xl md:text-5xl font-extrabold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300">
    Simplify Your Note Management
  </h2>
  <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl overflow-visible">
    Organize your thoughts, ideas, and tasks with our minimalistic and powerful note management application.
  </p>
  <a
    href="/login"
    className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-lg hover:bg-blue-600 transition-all duration-200 transform hover:scale-105"
  >
    Start Now
  </a>
</section>


      {/* Features Section */}
      <section className="w-full max-w-full py-12 px-4 md:px-8 cursor-default">
        <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-blue-400">
          Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <h4 className="text-xl md:text-2xl font-semibold text-white mb-2 text-center">Create Notes</h4>
            <p className="text-gray-300 text-center">
              Add notes with groups, colors, and text. Customize each note to fit your needs.
            </p>
          </div>
          <div className="bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <h4 className="text-xl md:text-2xl font-semibold text-white mb-2 text-center">Organize Easily</h4>
            <p className="text-gray-300 text-center">
              Filter and arrange notes by group or color for quick access and organization.
            </p>
          </div>
          <div className="bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <h4 className="text-xl md:text-2xl font-semibold text-white mb-2 text-center">Drag and Drop</h4>
            <p className="text-gray-300 text-center">
              Rearrange your notes effortlessly with drag-and-drop functionality.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-800 py-6 mt-8">
        <div className="text-center text-gray-400">
          <p>© 2024 NoteMaster. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
