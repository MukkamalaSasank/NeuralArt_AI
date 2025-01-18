import express from 'express';
import User from '../mongodb/models/user.js'; // Adjust the path as necessary
import bcrypt from 'bcryptjs'; // For password hashing
import jwt from 'jsonwebtoken'; // For generating JWT tokens

const router = express.Router();

// Combined Route for Signup and Login
router.post('/', async (req, res) => {
    const { name, email, password, isLogin } = req.body;

    try {
        if (isLogin) {
            // Login Logic
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials' }); // Updated
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' }); // Updated
            }

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({ token, user }); // Updated
        } else {
            // Signup Logic
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' }); // Updated
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ name, email, password: hashedPassword });
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(201).json({ token, user }); // Updated
        }
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong', error: error.message }); // Updated
    }
});

export default router;