import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    try {
        const token = req.cookies?.token; // Safe access to token

        if (!token) {
            return res.status(401).json({ success: false, message: 'Not Authorized. Please log in again.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded?.id) {
            return res.status(401).json({ success: false, message: 'Invalid token. Please log in again.' });
        }

        req.user = { id: decoded.id }; // Store user data in `req.user`
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Authentication failed. Please log in again.' });
    }
};

export default userAuth;
