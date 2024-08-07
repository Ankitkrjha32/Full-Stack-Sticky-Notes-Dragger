import express from "express";
import {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote
} from "../controllers/note.controller.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Middleware to protect routes
router.use(authenticateToken);

router.get("/", getAllNotes);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
