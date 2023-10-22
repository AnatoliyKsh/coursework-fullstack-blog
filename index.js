import express from 'express'
import mongoose from "mongoose"
import {registerValidation, loginValidation, postCreateValidation} from "./validations/auth.js";
import checkAuth from "./utils/checkAuth.js";
import {getMe, login, register} from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";
import multer from 'multer'
import handleValidationErrors from "./utils/handleValidationErrors.js";

mongoose.connect('mongodb+srv://admin:parol@cluster0.otv1lgn.mongodb.net/blog?retryWrites=true&w=majority'
).then(() => console.log('BD OK'))
    .catch((err) => console.log('DB not OK', err))

const app = express()
const PORT = 4444

const storage = multer.diskStorage({
    destination: (_, __, cd) => {
        cd(null, 'uplaods')
    },
    filename: (_, file, cd) => {
        cd(null, file.originalname)
    }

})

const upload = multer({storage})

app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.post('/auth/login', loginValidation, handleValidationErrors, login)
app.post('/auth/register', registerValidation, handleValidationErrors, register)
app.get('/auth/me', checkAuth, getMe)
app.post('/posts', checkAuth, postCreateValidation, PostController.create);
app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.delete('/posts/:id', checkAuth, handleValidationErrors, PostController.remove);
app.patch('/posts', checkAuth, handleValidationErrors, PostController.update);
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    })
})

app.listen(PORT, (err) => {
    if (err) {
        console.log('server error')
    } else {
        console.log('server OK')
    }
})