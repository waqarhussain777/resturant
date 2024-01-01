import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'waqar777';

export const login = async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    try {
        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).send('Invalid username');
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send('Invalid username or password');
        }

        // Generate JWT
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};
