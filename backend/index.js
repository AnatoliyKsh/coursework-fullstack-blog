import express from 'express';
import fs from 'fs';
import multer from 'multer';
import cors from 'cors';
import mongoose from 'mongoose';
import {registerValidation, loginValidation, postCreateValidation} from './validations.js';
import {handleValidationErrors, checkAuth} from './utils/index.js';
import {UserController, PostController} from './controllers/index.js';

//connection to dataBase from mongoose
mongoose
    .connect('mongodb+srv://admin:parol@cluster0.otv1lgn.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

const app = express();

/* 'storage' configuration for multer is set to save uploaded files to the 'uploads' directory
 on the server. If the 'uploads' directory doesn't exist, it's created. The uploaded file
 retains its original name
*/
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        if (!fs.existsSync('uploads')) {
            fs.mkdirSync('uploads');
        }
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({storage});

//all routes what app has
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);
app.post('/upload' /*checkAuth */, upload.single('image'), (req, res) => {res.json({url: `/uploads/${req.file.originalname}`,});});
app.get('/tags', PostController.getLastTags);
app.get('/posts', PostController.getAll);
app.get('/posts/tags', PostController.getLastTags);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', postCreateValidation, handleValidationErrors, PostController.create);
app.delete('/posts/:id', PostController.remove);
app.patch('/posts/:id', postCreateValidation, handleValidationErrors, PostController.update,);

// run the server
app.listen(process.env.PORT || 4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server OK');
});
