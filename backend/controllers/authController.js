import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/userModel.js'; // Adjust the path as necessary
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const user = new User({ email, password: encryptedPassword, fullName });
    await user.save();

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ id: user._id, email: user.email, token });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the password
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ message: 'Invalid Password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ id: user._id, email: user.email, token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in user', error });
  }
};
