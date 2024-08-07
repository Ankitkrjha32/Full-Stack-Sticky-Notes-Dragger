import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Notes from './components/StickyNotes/Notes';
import { useSelector } from 'react-redux';
import './App.css';

function ProtectedRoute({ element, ...rest }) {
  const user = useSelector((state) => state.auth.user);
  return user ? element : <Navigate to="/login" />;
}

function App() {
  const [notes, setNotes] = React.useState([
    { id: 1, text: "Ankit Kumar Jha ", color: " #1a202c", position: { x: 100, y: 100 } },
    { id: 2, text: "Full Stack Developer ", color: " #1a202c", position: { x: 100, y: 200 } },
    { id: 3, text: " Team Ram hackathon COPS", color: " #1a202c", position: { x: 100, y: 300 } },
  ]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/notes" element={<ProtectedRoute element={<Notes notes={notes} setNotes={setNotes} />} />} />
      </Routes>
    </Router>
  );
}

export default App;
