import jwt from "jsonwebtoken";

export default (req, res, next) => {
    const token = (req.headers.authorization || '')

    if (token) {
        try {
            const decoded = jwt.verify(token, 'secret')
            req.userId = decoded._id
            next();
        } catch (e) {
            return res.status(403).josn({
                message: ' no pas'
            })
        }

    } else {
        return res.status(403).josn({
            message: ' no pas'
        })
    }

    console.log(token);

    next()
}
