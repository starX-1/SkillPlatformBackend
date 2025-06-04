import express, { json } from 'express';
import authRoutes from './routes/authRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import moduleRoutes from './routes/moduleRoutes.js'; // Assuming you have moduleRoutes defined
import lessonRoutes from './routes/lessonRoutes.js'; // Assuming you have lessonRoutes defined
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



export default app;
