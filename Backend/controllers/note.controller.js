// controllers/note.controller.js
import { Note } from '../models/note.model.js';

// Middleware to ensure the user is authenticated
import authenticateToken from '../middleware/auth.js';

// Create a new note
export const createNote = async (req, res) => {
  try {
    const { text, color, textColor, dueDate, position } = req.body;
    const userId = req.user.userId; // Get userId from token

    if (!text) {
      return res.status(400).json({ message: 'Note text is required', success: false });
    }

    const newNote = new Note({
      userId,
      text,
      color,
      textColor,
      dueDate,
      position
    });

    const savedNote = await newNote.save();
    return res.status(201).json({ message: 'Note created successfully', note: savedNote, success: true });
  } catch (error) {
    console.error('Error in createNote:', error);
    return res.status(500).json({ message: 'Internal server error', success: false });
  }
};

// Get notes for the current user
export const getNotes = async (req, res) => {
  try {
    const userId = req.user.userId; // Get userId from token

    const notes = await Note.find({ userId });
    return res.status(200).json({ notes, success: true });
  } catch (error) {
    console.error('Error in getNotes:', error);
    return res.status(500).json({ message: 'Internal server error', success: false });
  }
};

// Update a note by ID
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId; // Get userId from token

    const updatedNote = await Note.findOneAndUpdate(
      { _id: id, userId },
      req.body,
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found', success: false });
    }

    return res.status(200).json({ message: 'Note updated successfully', note: updatedNote, success: true });
  } catch (error) {
    console.error('Error in updateNote:', error);
    return res.status(500).json({ message: 'Internal server error', success: false });
  }
};

// Delete a note by ID
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId; // Get userId from token

    const deletedNote = await Note.findOneAndDelete({ _id: id, userId });

    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found', success: false });
    }

    return res.status(200).json({ message: 'Note deleted successfully', success: true });
  } catch (error) {
    console.error('Error in deleteNote:', error);
    return res.status(500).json({ message: 'Internal server error', success: false });
  }
};
