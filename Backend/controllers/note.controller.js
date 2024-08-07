import Note from '../models/note.models.js'; 


// Create a new note
export const createNote = async (req, res) => {
  try {
    const { text, color, textColor, position, dueDate } = req.body;
    const newNote = new Note({
      userId: req.id,  // Assumes you have user ID from the isAuthenticated middleware
      text,
      color,
      textColor,
      position,
      dueDate
    });
    const savedNote = await newNote.save();
    res.status(201).json({ success: true, note: savedNote });
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.id });
    res.status(200).json({ success: true, notes });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching notes', error });
  }
};

// Update a note
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedNote = await Note.findOneAndUpdate({ _id: id, userId: req.id }, req.body, { new: true });
    if (!updatedNote) return res.status(404).json({ success: false, message: 'Note not found' });
    res.status(200).json({ success: true, note: updatedNote });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating note', error });
  }
};

// Delete a note
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNote = await Note.findOneAndDelete({ _id: id, userId: req.id });
    if (!deletedNote) return res.status(404).json({ success: false, message: 'Note not found' });
    res.status(200).json({ success: true, message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting note', error });
  }
};
