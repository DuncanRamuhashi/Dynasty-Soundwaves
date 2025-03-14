import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    try {
        // Extract the token from the request body
        let token = req.body.token; 
         if(!token){
            token = req.params.token;
         }
        // Remove quotation marks if present
        token = token.replace(/"/g, ''); // Removes any quotes

        console.log(token); // For debugging purposes, logs the cleaned token

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
