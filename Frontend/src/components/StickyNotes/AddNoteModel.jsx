import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCheck } from "react-icons/fa";
import "../../App.css";

const AddNoteModel = ({ show, onClose, addNote, editingNote }) => {
  const [noteText, setNoteText] = useState("");
  const [noteColor, setNoteColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [customNoteColor, setCustomNoteColor] = useState("#ffffff");
  const [customTextColor, setCustomTextColor] = useState("#000000");
  const [selectedNoteColor, setSelectedNoteColor] = useState("");
  const [selectedTextColor, setSelectedTextColor] = useState("");

  useEffect(() => {
    if (editingNote) {
      setNoteText(editingNote.text);
      setNoteColor(editingNote.color);
      setTextColor(editingNote.textColor);
    } else {
      setNoteText("");
      setNoteColor("#ffffff");
      setTextColor("#000000");
    }
  }, [editingNote]);

  const noteColors = ["#f44336", "#e91e63", "#ffeb3b", "#4caf50", "#2196f3"];
  const textColors = ["#000000", "#ffffff", "#ff5722", "#4caf50", "#3f51b5"];

  const handleAddNote = () => {
    const newNote = {
      text: noteText,
      color: noteColor,
      textColor: textColor,
      position: { x: 100, y: 100 }  // Placeholder; actual position is determined in Notes.jsx
    };

    if (editingNote) {
      axios.put(`http://localhost:8000/api/v1/notes/${editingNote._id}`, newNote, { withCredentials: true })
        .then(response => {
          addNote(response.data.note);
          onClose();
        })
        .catch(error => {
          console.error('Error updating note:', error.response ? error.response.data : error);
        });
    } else {
      axios.post('http://localhost:8000/api/v1/notes', newNote, { withCredentials: true })
        .then(response => {
          addNote(response.data.note);
          setNoteText("");
          setNoteColor("#ffffff");
          setTextColor("#000000");
          setSelectedNoteColor("");
          setSelectedTextColor("");
          onClose();
        })
        .catch(error => {
          console.error('Error creating note:', error.response ? error.response.data : error);
        });
    }
  };

  const handleNoteColorSelection = (color) => {
    setNoteColor(color);
    setSelectedNoteColor(color);
  };

  const handleTextColorSelection = (color) => {
    setTextColor(color);
    setSelectedTextColor(color);
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{editingNote ? "Edit Note" : "Add Note"}</h2>
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Enter your note"
          style={{ color: textColor }}
        />
        <div className="color-picker">
          <div>Note Color:</div>
          {noteColors.map((color, index) => (
            <div
              key={index}
              className={`color-bubble ${selectedNoteColor === color ? "selected" : ""}`}
              style={{ backgroundColor: color }}
              onClick={() => handleNoteColorSelection(color)}
            >
              {selectedNoteColor === color && <FaCheck className="check-icon" />}
            </div>
          ))}
          <div
            className={`color-bubble ${selectedNoteColor === customNoteColor ? "selected" : ""}`}
            style={{ backgroundColor: customNoteColor }}
          >
            <input
              type="color"
              value={customNoteColor}
              onChange={(e) => {
                setCustomNoteColor(e.target.value);
                handleNoteColorSelection(e.target.value);
              }}
              className="custom-color-input"
            />
            {selectedNoteColor === customNoteColor && <FaCheck className="check-icon" />}
          </div>
        </div>
        <div className="color-picker">
          <div>Text Color:</div>
          {textColors.map((color, index) => (
            <div
              key={index}
              className={`color-bubble ${selectedTextColor === color ? "selected" : ""}`}
              style={{ backgroundColor: color }}
              onClick={() => handleTextColorSelection(color)}
            >
              {selectedTextColor === color && <FaCheck className="check-icon" />}
            </div>
          ))}
          <div
            className={`color-bubble ${selectedTextColor === customTextColor ? "selected" : ""}`}
            style={{ backgroundColor: customTextColor }}
          >
            <input
              type="color"
              value={customTextColor}
              onChange={(e) => {
                setCustomTextColor(e.target.value);
                handleTextColorSelection(e.target.value);
              }}
              className="custom-color-input"
            />
            {selectedTextColor === customTextColor && <FaCheck className="check-icon" />}
          </div>
        </div>
        <button onClick={handleAddNote}>{editingNote ? "Save Changes" : "Add Note"}</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AddNoteModel;
