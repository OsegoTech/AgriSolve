import jwt from 'jsonwebtoken';
import { blacklistedTokens } from '../controllers/userAuthController.js';
import User from '../models/userAuthModel.js';

const verifyToken = async (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) {
        return res.status(401).json({ message: 'Access denied. No token provided' });
    }
    const token = authorizationHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Invalid message format' });
    }
    // Check if token is blacklisted
    if (blacklistedTokens.includes(token)) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
    const secretKey = process.env.JWT;
    const decoded = jwt.verify(token, secretKey);
    const user = await User.findById(decoded.userId);
    if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    req.user = { userId: user._id };
    next();
};

export { verifyToken };
