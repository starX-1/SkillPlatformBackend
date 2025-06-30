import express, { json } from 'express';
import authRoutes from './routes/authRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import moduleRoutes from './routes/moduleRoutes.js'; // Assuming you have moduleRoutes defined
import lessonRoutes from './routes/lessonRoutes.js'; // Assuming you have lessonRoutes defined
import videoUpload from './routes/videoRoutes.js'; // Assuming you have videoRoutes defined
import imageRoutes from './routes/imageRoutes.js'; // Assuming you have imageRoutes defined
import pdfRoutes from './routes/pdfRoutes.js'; // Assuming you have pdfRoutes defined
import completionRoutes from './routes/completionRoutes.js'; // Assuming you have completionRoutes defined
import enrollmentRoutes from './routes/enrollmentRoutes.js'; // Assuming you have enrollmentRoutes defined
import sumissionRoutes from './routes/submissionRoutes.js'; // Assuming you have submissionRoutes defined
import cookieParser from 'cookie-parser';
import quizRoutes from './routes/quizRoutes.js';
import questionRoutes from './routes/questionRoutes.js';

import cors from 'cors';

const app = express();

app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000', // Adjust this to your frontend URL
    credentials: true, // Allow cookies to be sent with requests
}))

app.use(json());

// Basic route to check server status
app.get('/', (req, res) => {
    res.json({ message: 'Skills Platform API running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/modules', moduleRoutes); // Assuming you have moduleRoutes defined
app.use('/api/lessons', lessonRoutes); // Assuming you have lessonRoutes defined
app.use('/api/videos', videoUpload)
app.use('/api/images', imageRoutes)
app.use("/api/pdfs", pdfRoutes); // Assuming you have pdfRoutes defined
app.use("/api/completions", completionRoutes); // Assuming you have completionRoutes defined
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/sumissions", sumissionRoutes); // Assuming you have submissionRoutes defined
app.use("/api/quizzes", quizRoutes);
app.use("/api/questions", questionRoutes);


export default app;
