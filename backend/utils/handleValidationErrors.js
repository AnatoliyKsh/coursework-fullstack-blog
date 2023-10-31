import {validationResult} from 'express-validator';

/* This is a middleware function that validates the request using 'express-validator'.
 It checks for validation errors in the request and sends a 400 response with the
 validation errors if any are found. If no errors are present, it passes control to the
 next middleware in the chain*/
export default (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    next();
};
