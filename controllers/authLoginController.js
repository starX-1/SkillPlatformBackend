import User from "../models/user.js";
import { comparePassword } from "../utils/hashPassword.js";
import { generateToken } from "../utils/generateToken.js";

export async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // check password 
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // generate token
        const token = generateToken(user);

        return res.status(200).json({
            user: {
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                role: user.role
            },
            token,
            message: 'Login successful'
        })
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}