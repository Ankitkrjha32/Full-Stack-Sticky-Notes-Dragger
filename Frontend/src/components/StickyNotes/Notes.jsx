import React, { useRef, useEffect, useState } from "react";
import Note from "./Note";
import AddNoteModal from './AddNoteModel';
import { FaPlus } from "react-icons/fa";
import "../../App.css";
import Navbar from "../shared/Navbar";

const Notes = ({ notes = [], setNotes = () => {} }) => {
  const noteRefs = useRef({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

    const updatedNotes = notes.map((note) => {
      const savedNote = savedNotes.find((n) => n.id === note.id);
      if (savedNote) {
        return { ...note, position: savedNote.position };
      } else {
        const position = determineNewPosition();
        return { ...note, position };
      }
    });

    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  }, [notes.length]);

  const determineNewPosition = () => {
    const maxX = window.innerWidth - 250;
    const maxY = window.innerHeight - 250;

    return {
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY),
    };
  };

  const handleDragStart = (note, e) => {
    const { id } = note;
    const noteRef = noteRefs.current[id];
    const rect = noteRef.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const startPos = note.position;

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

      if (checkForOverlap(id)) {
        noteRef.style.left = `${startPos.x}px`;
        noteRef.style.top = `${startPos.y}px`;
      } else {
        updateNotePosition(id, newPosition);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const checkForOverlap = (id) => {
    const currentNoteRef = noteRefs.current[id];
    const currentRect = currentNoteRef.getBoundingClientRect();

    return notes.some((note) => {
      if (note.id === id) return false;

      const otherNoteRef = noteRefs.current[note.id];
      const otherRect = otherNoteRef.getBoundingClientRect();

      const overlap = !(
        currentRect.right < otherRect.left ||
        currentRect.left > otherRect.right ||
        currentRect.bottom < otherRect.top ||
        currentRect.top > otherRect.bottom
      );

      return overlap;
    });
  };

  const updateNotePosition = (id, newPosition) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, position: newPosition } : note
    );
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const handleDeleteNote = (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      const updatedNotes = notes.filter((note) => note.id !== id);
      setNotes(updatedNotes);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
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
      {notes.map((note) => (
        <Note
          key={note.id}
          ref={(el) => (noteRefs.current[note.id] = el)}
          initialPos={note.position}
          content={note.text}
          color={note.color}
          textColor={note.textColor} // Pass textColor
          dueDate={note.dueDate}
          onDelete={() => handleDeleteNote(note.id)}
          onMouseDown={(e) => handleDragStart(note, e)}
        />
      ))}
    </div>
  );
};

export default Notes;
