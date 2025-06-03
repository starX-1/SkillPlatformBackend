export function validateRegister(req, res, next) {
    const { full_name, email, password, role } = req.body;

    const missingFields = [];
    if (!full_name) missingFields.push('full_name');
    if (!email) missingFields.push('email');
    if (!password) missingFields.push('password');
    if (!role) missingFields.push('role');
    if (missingFields.length > 0) {
        return res.status(400).json({ message: `Missing required fields: ${missingFields.join(', ')}` });
    }

    if (!full_name || !email || !password) {
        return res.status(400).json({ message: 'full_name, email, and password are required.' });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ message: 'Invalid email format.' });
    }

    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
    }

    if (role && !['admin', 'student'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role.' });
    }

    next();
}
