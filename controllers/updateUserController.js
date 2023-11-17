import User from '../models/userAuthModel.js';

export const addProfile = async (req, res) => {
    const userId = req.user.userId;
    const { phoneNumber, location } = req.body;

    try {
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(401).json({ message: 'User not found' });
        }
        existingUser.phoneNumber = phoneNumber || existingUser.phoneNumber;
        existingUser.location = location || existingUser.location;

        console.log(existingUser);
        await existingUser.save();
        res.status(200).json({ message: 'Profile added' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const updateUser = async (req, res) => {
    const userId = req.user.userId;
    // Extract fields to be updated from the request body
    const { name, email, phoneNumber, location } = req.body;

    // Check if user exists
    try {
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(401).json({ message: 'User not found' });
        }
        // Update the existing fields
        existingUser.name = name || existingUser.name;
        existingUser.email = email || existingUser.email;
        existingUser.phoneNumber = phoneNumber || existingUser.phoneNumber;
        existingUser.location = location || existingUser.location;

        await existingUser.save();

        res.json({ message: 'User updated successfully', user: existingUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


