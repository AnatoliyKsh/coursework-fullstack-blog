import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
/* this code block is a middleware for verifying and decoding a JWT  present
 in the request. If a valid token is found, it is decoded, and the user's ID is added to
the request object. The request processing continues to the next middleware */

    if (token) {
        try {
            const decoded = jwt.verify(token, 'secret123');

            req.userId = decoded._id;
            next();
        } catch (e) {
            return res.status(403).json({
                message: 'access error',
            });
        }
    } else {
        return res.status(403).json({
            message: 'Access error',
        });
    }
};
