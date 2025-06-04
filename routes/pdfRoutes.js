// routes/pdfRoutes.js
import express from 'express';
import pdfUpload from '../middlewares/pdfUpload.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/upload', protect, pdfUpload.single('pdf'), (req, res) => {
    res.status(200).json({
        pdfUrl: req.file.path,
        cloudinaryId: req.file.filename,
    });
});

export default router;
