// middleware/authenticate.js
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'waqar777';

const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const token = authHeader.split(' ')[1]; // Bearer TOKEN
        const decoded = jwt.verify(token, JWT_SECRET);

        req.userData = decoded; // Add decoded token data to request object
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Authentication failed' });
    }
};

export default authenticate;
