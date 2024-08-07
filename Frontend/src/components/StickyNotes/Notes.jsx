import React, { useState, useEffect, createRef, useRef } from "react";
import axios from "axios";
import Note from "./Note";
import AddNoteModel from './AddNoteModel';
import { FaPlus } from "react-icons/fa";
import Navbar from "../shared/Navbar";
import "../../App.css";

const Notes = ({ notes = [], setNotes = () => {} }) => {
  const [showModel, setShowModel] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const noteRefs = useRef({});

  useEffect(() => {
    // Restore notes from localStorage
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(savedNotes);
  }, []);

  useEffect(() => {
    // Save notes to localStorage whenever they change
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const calculateNotePosition = (index) => {
    const margin = 20;
    const noteWidth = 200;
    const noteHeight = 200;
    const columns = Math.floor(window.innerWidth / (noteWidth + margin));
    const x = (index % columns) * (noteWidth + margin);
    const y = Math.floor(index / columns) * (noteHeight + margin);
    return { x, y };
  };

  const getNextAvailablePosition = () => {
    const margin = 20;
    const noteWidth = 200;
    const noteHeight = 200;

    let newPos = { x: 0, y: 0 };
    let overlap;

    do {
      newPos.x = Math.floor(Math.random() * (window.innerWidth - noteWidth));
      newPos.y = Math.floor(Math.random() * (window.innerHeight - noteHeight));
      overlap = checkForOverlap(null, newPos);
    } while (overlap);

    return newPos;
  };

  const checkForOverlap = (id, position) => {
    const noteRect = {
      left: position.x,
      top: position.y,
      right: position.x + 200, // Assuming width of 200px
      bottom: position.y + 200, // Assuming height of 200px
    };

    return notes.some((note) => {
      if (note._id === id) return false;

      const otherNoteRect = {
        left: note.position.x,
        top: note.position.y,
        right: note.position.x + 200,
        bottom: note.position.y + 200,
      };

      return !(
        noteRect.right < otherNoteRect.left ||
        noteRect.left > otherNoteRect.right ||
        noteRect.bottom < otherNoteRect.top ||
        noteRect.top > otherNoteRect.bottom
      );
    });
  };

  const handleAddNote = (newNote) => {
    const position = getNextAvailablePosition();
    newNote.position = position;

    axios.post('http://localhost:8000/api/v1/notes', newNote, { withCredentials: true })
      .then(response => {
        setNotes([...notes, response.data.note]);
        setShowModel(false);
      })
      .catch(error => {
        console.error('Error creating note:', error.response ? error.response.data : error);
      });
  };

  const handleMouseDown = (id, e) => {
    const noteRef = noteRefs.current[id].current;
    const rect = noteRef.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const handleMouseMove = (e) => {
      const newX = e.clientX - offsetX;
      const newY = e.clientY - offsetY;

      noteRef.style.left = `${newX}px`;
      noteRef.style.top = `${newY}px`;
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);

      const finalRect = noteRef.getBoundingClientRect();
      const newPosition = { x: finalRect.left, y: finalRect.top };

      if (checkForOverlap(id, newPosition)) {
        // Reset to original position if overlap is detected
        const originalNote = notes.find(note => note._id === id);
        noteRef.style.left = `${originalNote.position.x}px`;
        noteRef.style.top = `${originalNote.position.y}px`;
        return;
      }

      const updatedNotes = notes.map((note) =>
        note._id === id ? { ...note, position: newPosition } : note
      );
      setNotes(updatedNotes);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="app-container">
      <Navbar />
      <button className="add-note-button" onClick={() => setShowModel(true)}>
        <FaPlus size={24} />
      </button>
      <AddNoteModel 
        show={showModel} 
        onClose={() => { setShowModel(false); setEditingNote(null); }} 
        addNote={handleAddNote} 
        editingNote={editingNote}
      />
      <div className="notes-grid">
        {notes.map((note, index) => (
          <Note
            key={note._id}
            id={note._id}
            content={note.text}
            color={note.color}
            textColor={note.textColor}
            dueDate={note.dueDate}
            position={note.position || calculateNotePosition(index)}
            onDelete={(id) => {
              if (!id) {
                console.error('No ID provided for deletion');
                return;
              }

              if (window.confirm("Are you sure you want to delete this note?")) {
                axios.delete(`http://localhost:8000/api/v1/notes/${id}`, { withCredentials: true })
                  .then(() => {
                    const updatedNotes = notes.filter((note) => note._id !== id);
                    setNotes(updatedNotes);
                  })
                  .catch(error => {
                    console.error('Error deleting note:', error.response ? error.response.data : error);
                    alert('Failed to delete the note. Please try again later.');
                  });
              }
            }}
            onEdit={(id) => {
              const noteToEdit = notes.find(note => note._id === id);
              setEditingNote(noteToEdit);
              setShowModel(true);
            }}
            ref={noteRefs.current[note._id] ? noteRefs.current[note._id] : (noteRefs.current[note._id] = createRef())}
            onMouseDown={(e) => handleMouseDown(note._id, e)}
          />
        ))}
      </div>
    </div>
  );
};

export default Notes;
