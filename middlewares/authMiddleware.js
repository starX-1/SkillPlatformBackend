import jwt from 'jsonwebtoken';
import User from '../models/user.js';
/**
 * Middleware to protect routes by verifying JWT token.
 * If the token is valid, it attaches the user to the request object.
 * If not, it sends a 401 Unauthorized response.
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */

export async function protect(req, res, next) {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach user to req object (omit password)
            req.user = await User.findByPk(decoded.id, {
                attributes: { exclude: ['password'] },
            });

            if (!req.user) {
                return res.status(401).json({ message: 'User not found' });
            }

            next();
        } catch (error) {
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
}
