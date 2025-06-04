import express from 'express';
import videoUpload from '../middlewares/videoUpload.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// POST /api/videos/upload
router.post('/upload', protect, videoUpload.single('video'), (req, res) => {
    res.status(200).json({
        videoUrl: req.file.path,
        cloudinaryId: req.file.filename,
    });
});

export default router;
