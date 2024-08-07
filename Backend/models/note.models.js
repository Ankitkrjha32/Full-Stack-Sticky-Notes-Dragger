import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  text: { type: String, required: true },
  color: { type: String },
  textColor: { type: String },
  dueDate: { type: Date },
  position: {
    x: { type: Number },
    y: { type: Number },
  },
}, { timestamps: true });

const Note = mongoose.model('Note', noteSchema);

export default Note;
