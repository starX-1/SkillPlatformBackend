import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinary.js';

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'skill-platform/videos',
        resource_type: 'video',
        allowed_formats: ['mp4', 'mov', 'avi'],
    },
});

const videoUpload = multer({ storage });
export default videoUpload;
