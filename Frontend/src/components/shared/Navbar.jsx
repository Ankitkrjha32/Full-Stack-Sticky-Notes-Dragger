import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link,useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, logout as logoutAction } from '../../redux/authSlice'; // Import the logout action
import axios from 'axios';
import { USER_API_END_POINT } from '../../utils/constant';
import { toast } from 'sonner';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = async () => {
    try {
      await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      dispatch(logoutAction());
      toast.message("Log Out Successfully");
      console.log(logout.message);
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };
  return (
    <header className="w-full py-4 px-4 md:px-8 bg-transparent z-10 relative">
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
            {user ? (
              <>
                <li>
                  <span className="text-center text-[16px] text-gray-50 font-serif uppercase"> Hello, {user.fullname}</span>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md shadow-lg hover:bg-blue-600 transition-all duration-200 transform hover:scale-105"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" className="text-gray-200 hover:text-white transition-colors duration-200 text-center">Home</Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-200 hover:text-white transition-colors duration-200 text-center">Features</Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-200 hover:text-white transition-colors duration-200 text-center">Contact</Link>
                </li>
                <li>
                  <Link to="/login" className="text-gray-200 hover:text-white transition-colors duration-200 text-center">Login</Link>
                </li>
                <li>
                  <Link to="/signup" className="text-gray-200 hover:text-white transition-colors duration-200 text-center">Signup</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
