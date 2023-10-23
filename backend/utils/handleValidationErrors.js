import {validationResult} from "express-validator";

export default (req, res) => {
    const errors = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json(errors.array())
    }
    next();
}