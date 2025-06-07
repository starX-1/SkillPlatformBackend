// routes/imageRoutes.js
import express from 'express';
import imageUpload from '../middlewares/imageUpload.js';
import { protect } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/isAdmin.js';

const router = express.Router();

router.post('/upload-thumbnail', protect, isAdmin, imageUpload.single('thumbnail'), (req, res) => {
    console.log("Image uploaded:", req.file);

    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }


    res.status(200).json({
        thumbnailUrl: req.file.path,
        cloudinaryId: req.file.filename,
    });
});

export default router;
