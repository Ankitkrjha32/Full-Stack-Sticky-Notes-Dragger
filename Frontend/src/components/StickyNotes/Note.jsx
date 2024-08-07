import React, { forwardRef } from "react";
import { FaTrashAlt, FaCalendarAlt, FaEdit } from "react-icons/fa";
import "../../App.css";

const Note = forwardRef(({ id, content, onDelete, onEdit, color, textColor, dueDate, position, onMouseDown }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        backgroundColor: color,
        color: textColor,
        border: "1px solid black",
        userSelect: "none",
        padding: "10px",
        width: "200px",
        cursor: "move",
      }}
      onMouseDown={onMouseDown}
    >
      <div className="note-content">{content}</div>
      <div className="note-footer">
        {dueDate && (
          <div className="note-due-date">
            <FaCalendarAlt /> {new Date(dueDate).toLocaleDateString()}{" "}
            {new Date(dueDate).toLocaleTimeString()}
          </div>
        )}
        <button onClick={() => onEdit(id)} className="edit-button">
          <FaEdit />
        </button>
        <button onClick={() => onDelete(id)} className="delete-button">
          <FaTrashAlt />
        </button>
      </div>
    </div>
  );
});

export default Note;
