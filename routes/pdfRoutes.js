// routes/pdfRoutes.js
import express from 'express';
import pdfUpload from '../middlewares/pdfUpload.js';
import { protect } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/isAdmin.js';

const router = express.Router();

router.post('/upload', protect, isAdmin, pdfUpload.single('pdf'), (req, res) => {
    res.status(200).json({
        pdfUrl: req.file.path,
        cloudinaryId: req.file.filename,
    });
});

export default router;
