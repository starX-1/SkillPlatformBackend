// middlewares/pdfUpload.js
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinary.js';

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'skill-platform/pdfs',
        resource_type: 'raw',
        allowed_formats: ['pdf'],
        public_id: (req, file) => {
            const name = file.originalname.split('.')[0];
            return `${Date.now()}-${name}`;
        }
    }

});

const pdfUpload = multer({ storage });
export default pdfUpload;
