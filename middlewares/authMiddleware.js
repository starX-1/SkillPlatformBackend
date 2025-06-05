import jwt from 'jsonwebtoken';
import User from '../models/user.js';

/**
 * Middleware to protect routes by verifying JWT token from cookies.
 */
export async function protect(req, res, next) {
    const token = req.cookies.token; // ✅ Get token from cookie

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user to request (omit password)
        req.user = await User.findByPk(decoded.id, {
            attributes: { exclude: ['password'] },
        });

        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }

        next();
    } catch (error) {
        console.error('JWT verify error:', error);
        return res.status(401).json({ message: 'Not authorized, token failed' });
    }
}
