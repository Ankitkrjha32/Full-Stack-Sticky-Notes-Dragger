import React, { forwardRef } from "react";
import { FaTrashAlt, FaCalendarAlt } from "react-icons/fa";
import "../../App.css";

const Note = forwardRef(
  ({ content, initialPos, onDelete, color, textColor, dueDate, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className="note"
        style={{
          left: `${initialPos?.x}px`,
          top: `${initialPos?.y}px`,
          position: "absolute",
          backgroundColor: color,
        }}
        {...props}
      >
        <div className="note-content" style={{ color: textColor }}>
          {content}
        </div>
        <div className="note-footer">
          {dueDate && (
            <div className="note-due-date">
              <FaCalendarAlt /> {new Date(dueDate).toLocaleDateString()}{" "}
              {new Date(dueDate).toLocaleTimeString()}
            </div>
          )}
          <button onClick={onDelete} className="delete-button">
            <FaTrashAlt />
          </button>
        </div>
      </div>
    );
  }
);

export default Note;
