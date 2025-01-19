import express from 'express';
import User from '../mongodb/models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const router = express.Router();


router.post('/', async (req, res) => {
    const { name, email, password, credits, isLogin } = req.body;
  
    try {
      if (isLogin) {
        // Login Logic
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({ message: 'Invalid email' });
        }
  
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ message: 'Invalid password' });
        }
  
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ token, user });
      } else {
        // Signup Logic
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
        }
  
        const user = await User.create({ name, email, password, credits });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(201).json({ token, user });
      }
    } catch (error) {
      console.error(error.message); // Log the error message for debugging
      return res.status(500).json({ message: 'Something went wrong' });
    }
  });

export default router;