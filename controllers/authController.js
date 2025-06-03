import User from '../models/user.js';
import { hashPassword } from '../utils/hashPassword.js';

export async function registerUser(req, res) {
    try {
        const { full_name, email, password, role } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already in use.' });
        }

        // Hash password
        const hashedPwd = await hashPassword(password);

        // Create user
        const user = await User.create({
            full_name,
            email,
            password: hashedPwd,
            role: role || 'student',
        });

        return res.status(201).json({ message: 'User registered successfully', userId: user.id });
    } catch (error) {
        console.error('Register error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}
