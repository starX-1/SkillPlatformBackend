import express, { json } from 'express';
import authRoutes from './routes/authRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import moduleRoutes from './routes/moduleRoutes.js'; // Assuming you have moduleRoutes defined
import lessonRoutes from './routes/lessonRoutes.js'; // Assuming you have lessonRoutes defined
import videoUpload from './routes/videoRoutes.js'; // Assuming you have videoRoutes defined
import imageRoutes from './routes/imageRoutes.js'; // Assuming you have imageRoutes defined
import pdfRoutes from './routes/pdfRoutes.js'; // Assuming you have pdfRoutes defined
import completionRoutes from './routes/completionRoutes.js'; // Assuming you have completionRoutes defined
const app = express();

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
app.use('api/images', imageRoutes)
app.use("/api/pdfs", pdfRoutes); // Assuming you have pdfRoutes defined
app.use("/api/completions", completionRoutes); // Assuming you have completionRoutes defined



export default app;
