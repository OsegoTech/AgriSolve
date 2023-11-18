import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userAuthModel.js';

// ACCESS TOKEN GENERATION
export const generateAccessToken = (userId) => {
    const payload = { userId };
    const secretKey = process.env.JWT;
    const options = { expiresIn: '10m' };
    return jwt.sign(payload, secretKey, options);
};

// REFRESH TOKEN GENERATION
export const generateRefreshToken = (userId) => {
    const payload = { userId };
    const secretKey = process.env.JWT;
    const options = { expiresIn: '7d' };
    return jwt.sign(payload, secretKey, options);
};

export const blacklistedTokens = []; // Array to store blacklisted tokens

// Register User
export const registerUser = async (req, res) => {
    const { name, email, password, isFarmer } = req.body;

    try {
        // Check if the username exists
        const existingEmail = await User.findOne({ email });
        if (!name || !password) return res.status(400).json({ message: 'Name and Password required' });
        if (existingEmail) {
            return res.status(400).json({ error: 'Email already taken.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new User
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            isFarmer: isFarmer || false
        });
        await newUser.save();

        res.status(200).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find if user has been registered
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email' });
        }

        // Compare the password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            // Generate a JWT
            const accessToken = generateAccessToken(user._id);
            const refreshToken = generateRefreshToken(user._id);

            res.json({ accessToken, refreshToken });
        } else {
            return res.status(401).json({ error: 'Invalid password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const logoutUser = async (req, res) => {
    try {
        // Extract the access token from the authorization header
        const authorizationHeader = req.headers['authorization'];
        const accessToken = authorizationHeader.split(' ')[1];

        // Verify the access token
        const secretKey = process.env.JWT;
        const decodedAccessToken = jwt.verify(accessToken, secretKey);

        if (!decodedAccessToken) {
            return res.status(401).json({ message: 'Invalid access token' });
        }

        const userId = decodedAccessToken.userId;

        // Invalidate the access token by blacklisting it
        blacklistedTokens.push(accessToken);

        // Send a logout response
        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const refreshAccessToken = (req, res) => {
    const refreshToken = req.body.refreshToken;

    if (!refreshToken || blacklistedTokens.includes(refreshToken)) {
        return res.status(401).json({ error: 'Invalid or expired refresh token' });
    }
    try {
        // Verify the refresh token
        const secretKey = process.env.JWT;
        const decodedRefreshToken = jwt.verify(refreshToken, secretKey);

        // Generate a new access token
        const newAccessToken = generateAccessToken(decodedRefreshToken.userId);

        res.json({ accessToken: newAccessToken });
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Invalid or expired refresh token' });
    }
};

