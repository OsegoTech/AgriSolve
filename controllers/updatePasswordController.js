import bcrypt from 'bcrypt';
import User from '../models/userAuthModel.js';

export const updatePassword = async (req, res) => {
    const userId = req.user.userId;
    const { currentPassword, newPassword } = req.body;

    // Check if user exists 
    try {
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(401).json({ message: 'User not found' });
        }
        // Check if the current password is correct
        const passwordMatch = await bcrypt.compare(currentPassword, existingUser.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }

        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password
        existingUser.password = hashedNewPassword;

        await existingUser.save();

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

