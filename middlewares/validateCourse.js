export function validateCourse(req, res, next) {
    const { title, description, thumbnail_url } = req.body;

    const errors = [];

    if (!title) {
        errors.push('Title is required');
    }
    if (!description) {
        errors.push('Description is required');
    }

    if (!thumbnail_url) {
        errors.push('Thumbnail URL is required');
    }

    if (!title || typeof title !== 'string' || title.trim().length === 0) {
        errors.push('Title is required and must be a non-empty string.');
    }

    if (description && typeof description !== 'string' || description.trim().length === 0) {
        errors.push('Description is required and must be a non-empty string.');
    }

    if (thumbnail_url && typeof thumbnail_url !== 'string' || thumbnail_url.trim().length === 0) {
        errors.push('Thumbnail URL  is required and must be a non-empty string.');
    }

    // Optional: basic URL format validation for thumbnail_url
    if (thumbnail_url) {
        const urlPattern = /^(https?:\/\/[^\s$.?#].[^\s]*)$/i;
        if (!urlPattern.test(thumbnail_url)) {
            errors.push('Thumbnail URL must be a valid URL.');
        }
    }

    if (errors.length > 0) {
        return res.status(400).json({ message: 'Validation errors', errors });
    }

    next();
}
