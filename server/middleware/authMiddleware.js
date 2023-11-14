const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authorizationHeader = req.headers['authorization']
    if (!authorizationHeader) {
        return res.status(401).json({ message: "Access denied. No token provided"})
    }
    const token = authorizationHeader.split(' ')[1]

    if (!token){
        return res.status(401).json({ message: "Invalid message format"})
    }
    const secretKey = 'my-secret-key'
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token"})
        }
        req.user = user
        next()
    })
}
module.exports = { verifyToken}