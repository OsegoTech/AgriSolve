const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const User = require("../models/userAuthModel");


//ACCESS TOKEN GENERATION
const generateAccessToken = (userId) => {
    const payload = { userId };
    const secretKey = 'my-secret-key';
    const options = { expiresIn: '2h' };
    return jwt.sign(payload, secretKey, options);
}

//REFRESH TOKEN GENERATION
const generateRefreshToken = (userId) => {
    const payload = { userId };
    const secretKey = 'my-secret-key';
    const options = { expiresIn: '7d' };
    return jwt.sign(payload, secretKey, options);
};

const blacklistedTokens = [] //Array to store blacklisted tokens

module.exports = {
    // Register User
    registerUser: async(req, res) => {
        const { name, username, password, email, phoneNumber, location } = req.body

    
        try{
            //Check if the username exists
            const existingUser = await User.findOne({ username })
            if (!username || !password ) return res.status(400).json({"message" : "Username and Password required"})
            if (existingUser) {
                return res.status(400).json( {error: "Username already taken."})
            }   
    
            //Hash the password
            const hashedPassword = await bcrypt.hash(password, 10)
            //Create a new User
            const newUser = new User({ 
                name, 
                username, 
                password: hashedPassword,
                email,
                phoneNumber,
                location
            })
            await newUser.save()
            
            res.status(200).json({ message: 'User registered successfully' })
            console.log(hashedPassword)
        } catch(err){
            console.error(err.message)
            res.status(500).json({error: "Internal Server Error"})
        }
    },
    loginUser: async(req, res) => {
        const { username, password } = req.body
    
        try{
            //Find if user has been registered
            const user = await User.findOne({ username })
            if (!user) {
                return res.status(401).json({ error: "Invalid username"})
            }
    
            //Compare the passowrd
            const passwordMatch = await bcrypt.compare(password, user.password)
            if (passwordMatch){
                //Generate a JWT
                const accessToken = generateAccessToken(user._id)
                const refreshToken = generateRefreshToken(user._id)
    
                res.json({ accessToken, refreshToken })
            } else {
                return res.status(401).json({ error: "Invalid password"})
            }
        } catch(error){
            console.error(error)
            res.status(500).json({ error: "Internal Server Error"})
        }
    },
    logoutUser: async(req, res) => {
        try{
             //Extract the access token from the authorization header
            const authorizationHeader = req.headers['authorization'];
            const accessToken = authorizationHeader.split(' ')[1];
            
            // Verify the access token
            const secretKey = 'my-secret-key';
            const decodedAccessToken = jwt.verify(accessToken, secretKey);
            
            if (!decodedAccessToken) {
                return res.status(401).json({ message: 'Invalid access token' });
            }
            
            const userId = decodedAccessToken.userId;
            
            // Invalidate the access token by blacklisting it
            blacklistedTokens.push(accessToken);
            
            // Send a logout response
            res.json({ message: 'Logged out successfully' });
        } catch(error){
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" })
        }
     
    }
}