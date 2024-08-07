import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="relative min-h-screen bg-gray-900 text-white flex flex-col items-center font-sans overflow-x-hidden">
      {/* Background Gradient */}
      {/* <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-gray-900 to-black opacity-70"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-800 via-gray-800 to-black opacity-40"></div>
        <div className="absolute left-1/4 top-1/4 w-[30rem] h-[30rem] bg-blue-500 rounded-full filter blur-2xl opacity-20 animate-pulse"></div>
        <div className="absolute right-1/4 top-1/4 w-[25rem] h-[25rem] bg-teal-500 rounded-full filter blur-2xl opacity-20 animate-pulse"></div>
        <div className="absolute right-1/3 bottom-1/3 w-[20rem] h-[20rem] bg-purple-500 rounded-full filter blur-2xl opacity-20 animate-pulse"></div>
      </div> */}

      {/* Header Section */}
      <header className="w-full py-4 px-4 md:px-8 bg-transparent z-10 relative">
        <div className={`flex items-center justify-between ${isMenuOpen ? 'justify-center' : ''}`}>
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
            NoteMaster
          </h1>
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-200 hover:text-white transition-colors duration-200 absolute top-4 right-4 z-20"
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
                  href="#pricing"
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
                <a
                  href="#team"
                  className="text-gray-200 hover:text-white transition-colors duration-200 text-center"
                >
                  Team
                </a>
              </li>
              <li>
                <a
                  href="login"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-600 transition-all duration-200 transform hover:scale-105 text-center"
                >
                  Login
                </a>
              </li>
              <li>
                <a
                  href="signup"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-600 transition-all duration-200 transform hover:scale-105 text-center"
                >
                  Signup
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center py-20 px-4 md:px-8">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300">
          Simplify Your Note Management
        </h2>
        <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl">
          Organize your thoughts, ideas, and tasks with our minimalistic and powerful note management application.
        </p>
        <a
          href="login"
          className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-lg hover:bg-blue-600 transition-all duration-200 transform hover:scale-105"
        >
          Start Now
        </a>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-full py-12 px-4 md:px-8">
        <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-blue-400">
          Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <h4 className="text-xl md:text-2xl font-semibold text-white mb-2">Create Notes</h4>
            <p className="text-gray-300">
              Add notes with groups, colors, and text. Customize each note to fit your needs.
            </p>
          </div>
          <div className="bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <h4 className="text-xl md:text-2xl font-semibold text-white mb-2">Organize Easily</h4>
            <p className="text-gray-300">
              Filter and arrange notes by group or color for quick access and organization.
            </p>
          </div>
          <div className="bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <h4 className="text-xl md:text-2xl font-semibold text-white mb-2">Drag and Drop</h4>
            <p className="text-gray-300">
              Rearrange your notes effortlessly with drag-and-drop functionality.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="w-full max-w-full py-12 px-4 md:px-8 bg-gray-800">
        <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-blue-400">
          Pricing
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-900 bg-opacity-70 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <h4 className="text-xl md:text-2xl font-semibold text-white mb-2">Free</h4>
            <p className="text-gray-300 mb-4">- Basic Note Management<br />- Limited Storage<br />- Community Support</p>
            <p className="text-3xl font-bold text-white">Rs 0</p>
          </div>
          <div className="bg-gray-900 bg-opacity-70 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <h4 className="text-xl md:text-2xl font-semibold text-white mb-2">Silver</h4>
            <p className="text-gray-300 mb-4">- Advanced Note Management<br />- More Storage<br />- Priority Support</p>
            <p className="text-3xl font-bold text-white">Rs 49 / month</p>
          </div>
          <div className="bg-gray-900 bg-opacity-70 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <h4 className="text-xl md:text-2xl font-semibold text-white mb-2">Gold</h4>
            <p className="text-gray-300 mb-4">- All Features<br />- Unlimited Storage<br />- 24/7 Support</p>
            <p className="text-3xl font-bold text-white">Rs 99 / month</p>
          </div>
        </div>
      </section>

      {/* Meet The Team Section */}
      <section id="team" className="w-full max-w-full py-12 px-4 md:px-8 bg-gray-900">
        <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-blue-400">
          Meet The Team
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <div className="bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <img
              src="https://media.licdn.com/dms/image/D5603AQHSPN9xArJvSA/profile-displayphoto-shrink_400_400/0/1716314347675?e=1728518400&v=beta&t=zWw6RnApeGJ1U7N2WtSHtcErt0HjRMdomBIgjcgTH-4"
              alt="Sami"
              className="h-40 w-40 rounded-full mb-4 mx-auto object-cover"
            />
            <h4 className="text-xl md:text-2xl font-semibold text-white mb-2  flex items-center justify-center">Manish Kumar</h4>
            <p className="text-gray-300  flex items-center justify-center">Frontend Developer</p>
          </div>
          <div className="bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <img
              src="https://media.licdn.com/dms/image/D5603AQFr7EYInaiTCg/profile-displayphoto-shrink_400_400/0/1708415564828?e=1728518400&v=beta&t=LDqMykRgZboJbVeSzsb4PBL7tNvdK4q3fcdmRH7YmcA"
              alt="Fardeen"
              className="h-40 w-40 rounded-full mb-4 mx-auto object-cover"
            />
            <h4 className="text-xl md:text-2xl font-semibold text-white mb-2 flex items-center justify-center">Ankit Kumar Jha</h4>
            <p className="text-gray-300 flex items-center justify-center">Full Stack Developer</p>
          </div>
          <div className="bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <img
              src="https://media.licdn.com/dms/image/D5635AQEWjHM81QqExA/profile-framedphoto-shrink_400_400/0/1715523521139?e=1723665600&v=beta&t=q4_oRanWH1fCwNGin7K-8VNb6Rzx9NiCcwFfRcF6j5M"
              alt="Asif"
              className="h-40 w-40 rounded-full mb-4 mx-auto object-cover"
            />
            <h4 className="text-xl md:text-2xl font-semibold text-white mb-2  flex items-center justify-center">Rio Deb</h4>
            <p className="text-gray-300  flex items-center justify-center">Frontend Developer</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="w-full py-4 px-4 md:px-8 bg-gray-800">
        <div className="text-center text-gray-400">
          &copy; 2023 NoteMaster. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
