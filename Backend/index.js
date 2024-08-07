import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRoute from './routes/user.route.js';
import noteRoutes from '././routes/note.route.js'




dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const PORT = process.env.PORT || 8000;

// APIs
app.use('/api/v1/user', userRoute);
app.use('/api/v1/notes', noteRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port ${PORT}`);
});
