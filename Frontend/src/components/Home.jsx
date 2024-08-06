import React, { useState } from 'react';
import Navbar from '../components/shared/Navbar'

const Home = () => {
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

      <Navbar />

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center py-8 px-4 md:px-8">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300">
          Simplify Your Note Management
        </h2>
        <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl">
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
