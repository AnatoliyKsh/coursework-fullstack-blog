import {body} from 'express-validator';

// these validations are used for login route validation
export const loginValidation = [
    body('email', 'Invalid mail format').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({min: 5}),
];

// these validations are used for register route validation
export const registerValidation = [
    body('email', 'Invalid mail format').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({min: 5}),
    body('fullName', 'Enter your name').isLength({min: 3}),
    body('avatarUrl', 'Invalid link to avatar').optional().isURL(),
];

// these validations are used for postCreate route validation
export const postCreateValidation = [
    body('title', 'Enter article title').isLength({min: 3}).isString(),
    body('text', 'Enter article title').isLength({min: 3}).isString(),
    body('tags', 'Invalid tag format').optional().isString(),
    body('imageUrl', 'Invalid image link').optional().isString(),
];
