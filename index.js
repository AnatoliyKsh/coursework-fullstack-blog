import express from 'express'
// import jwt from 'jsonwebtoken'
import mongoose from "mongoose"
import {registerValidation, loginValidation, postCreateValidation} from "./validations/auth.js";
// import {validationResult} from "express-validator";
// import UserModel from "./models/User.js";
// import bcrypt from 'bcrypt'
import checkAuth from "./utils/checkAuth.js";
import {getMe, login, register} from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";

mongoose.connect('mongodb+srv://admin:parol@cluster0.otv1lgn.mongodb.net/blog?retryWrites=true&w=majority'
).then(() => console.log('BD OK'))
    .catch((err) => console.log('DB not OK', err))

const app = express()
const PORT = 4444

app.use(express.json())

// app.get('/', (req, res) => {
//     res.send('server works')
// })

app.post('/auth/login', loginValidation,  login)
app.post('/auth/register', registerValidation, register)
app.get('/auth/me', checkAuth, getMe)
app.post('/posts', checkAuth,postCreateValidation, PostController.create);
app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.delete('/posts/:id',checkAuth, PostController.remove);
app.patch('/posts',checkAuth, PostController.update);


app.listen(PORT, (err) => {
    if (err) {
        console.log('server error')
    } else {
        console.log('server OK')
    }
})