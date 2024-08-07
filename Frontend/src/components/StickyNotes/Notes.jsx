import React, { useEffect, useState } from "react";
import Note from "./Note";
import AddNoteModal from './AddNoteModel';
import { FaPlus } from "react-icons/fa";
import "../../App.css";
import Navbar from "../shared/Navbar";
import axios from "axios";

const Notes = ({ notes = [], setNotes = () => {} }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/notes', { withCredentials: true })
      .then(response => {
        const fetchedNotes = response.data.notes;
        setNotes(fetchedNotes);
        localStorage.setItem("notes", JSON.stringify(fetchedNotes));
      })
      .catch(error => {
        console.error('Error fetching notes:', error.response ? error.response.data : error);
      });
  }, []);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    const updatedNotes = notes.map((note) => {
      const savedNote = savedNotes.find((n) => n.id === note.id);
      return savedNote ? { ...note, position: savedNote.position } : { ...note };
    });
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  }, [notes.length]);

  const handleDeleteNote = (id) => {
    if (!id) {
      console.error('No ID provided for deletion');
      return;
    }
  
    if (window.confirm("Are you sure you want to delete this note?")) {
      axios.delete(`http://localhost:8000/api/v1/notes/${id}`, { withCredentials: true })
        .then(response => {
          console.log('Note deleted:', response.data);
          // Remove note from state and local storage
          const updatedNotes = notes.filter((note) => note.id !== id);
          setNotes(updatedNotes);
          localStorage.setItem("notes", JSON.stringify(updatedNotes));
        })
        .catch(error => {
          console.error('Error deleting note:', error.response ? error.response.data : error);
          alert('Failed to delete the note. Please try again later.');
        });
    }
  };
  

  const addNote = (newNote) => {
    setNotes([...notes, newNote]);
    localStorage.setItem("notes", JSON.stringify([...notes, newNote]));
  };

  return (
    <div className="app-container">
      <Navbar/>
      <button className="add-note-button" onClick={() => setShowModal(true)}>
        <FaPlus size={24} />
      </button>
      <AddNoteModal show={showModal} onClose={() => setShowModal(false)} addNote={addNote} />
      <div className="notes-grid">
        {notes.map((note) => (
          <Note
            key={note.id}
            id={note.id} 
            content={note.text}
            color={note.color}
            textColor={note.textColor}
            dueDate={note.dueDate}
            onDelete={() => handleDeleteNote(note.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Notes;
