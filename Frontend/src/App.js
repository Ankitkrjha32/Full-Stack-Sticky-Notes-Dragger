import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import "./App.css"
import Notes from './components/StickyNotes/Notes'; // Import the correct Notes component

function App() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      text: "Ankit Kumar Jha ",
      color: " #1a202c",
      position: { x: 100, y: 100 },
    },
    {
    id: 2,
    text: "Full Stack Developer ",
    color: " #1a202c",
    position: { x: 100, y: 100 },
  },
    {
      id: 3,
      text: " Team Ram hackathon COPS",
      color: " #1a202c",
      position: { x: 100, y: 200 },
    },
  ]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/notes" element={<Notes notes={notes} setNotes={setNotes} />} />
      </Routes>
    </Router>
  );
}

export default App;
