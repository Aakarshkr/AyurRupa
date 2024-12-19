import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    //console.log('Request Headers:', req.headers);
    const token = req.headers.token;  // Directly extracting token from headers

    try {
        if (!token) {
            console.log('No token provided');
            return res.status(401).json({ success: false, message: 'Not Authorized, Login Again' });
        }

        // Verify the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decodedToken.id;  // Attach the userId to request body
        console.log('User ID:', req.body.userId);

        next();  // Proceed to the next middleware

    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(403).json({ success: false, message: error.message });
    }
};

export default authUser;
