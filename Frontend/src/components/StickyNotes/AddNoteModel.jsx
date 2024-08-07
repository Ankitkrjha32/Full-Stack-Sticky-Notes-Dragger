import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";

const AddNoteModal = ({ show, onClose, addNote }) => {
  const [noteText, setNoteText] = useState("");
  const [noteColor, setNoteColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [customNoteColor, setCustomNoteColor] = useState("#ffffff");
  const [customTextColor, setCustomTextColor] = useState("#000000");
  const [selectedNoteColor, setSelectedNoteColor] = useState("");
  const [selectedTextColor, setSelectedTextColor] = useState("");

  const noteColors = ["#f44336", "#e91e63", "#ffeb3b", "#4caf50", "#2196f3"];
  const textColors = ["#000000", "#ffffff", "#ff5722", "#4caf50", "#3f51b5"];

  const handleAddNote = () => {
    addNote({
      text: noteText,
      color: noteColor,
      textColor: textColor,
      id: Math.random().toString(36).substr(2, 9),
      position: { x: 100, y: 100 },
    });
    setNoteText("");
    setNoteColor("#ffffff");
    setTextColor("#000000");
    setSelectedNoteColor("");
    setSelectedTextColor("");
    onClose();
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
        <h2>Add a New Note</h2>
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
        <button onClick={handleAddNote}>Add Note</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AddNoteModal;
