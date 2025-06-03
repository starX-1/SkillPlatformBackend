export function validateModule(req, res, next) {
    const { title, module_order } = req.body;

    const errors = [];

    if (!title || typeof title !== 'string') {
        errors.push('Module title is required and must be a string.');
    }

    if (module_order !== undefined && typeof module_order !== 'number') {
        errors.push('Module order must be a number.');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
}
