import express from 'express'
import jwt from 'jsonwebtoken'
import mongoose from "mongoose"
import {registerValidation} from "./validations/auth.js";
import {validationResult} from "express-validator";
import UserModel from "./models/User.js";
import bcrypt from 'bcrypt'
import checkAuth from "./utils/checkAuth.js";

mongoose.connect('mongodb+srv://admin:parol@cluster0.otv1lgn.mongodb.net/blog?retryWrites=true&w=majority'
).then(() => console.log('BD OK'))
    .catch((err) => console.log('DB not OK', err))

const app = express()
const PORT = 4444

app.use(express.json())

// app.get('/', (req, res) => {
//     res.send('server works')
// })

// const token = jwt.sign({}, 'jwtpass')

app.post('/auth/login', async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.body.email});
        if (!user) {
            return res.status(404).json({
                message: 'user not found',
            });
        }
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if (!isValidPass) {
            return res.status(404).json({
                message: 'pass not found',
            });
        }


        const token = jwt.sign({
            _id: user._id,
        }, 'secret', {
            expiresIn: '30d',
        });

        const {passwordHash, ...userData} = user._doc

        res.json({
            ...userData, token
        })

    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Произошла ошибка'});
    }


})


app.post('/auth/register', registerValidation, async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash([password, salt]);

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
        })

        const user = await doc.save();

        const token = jwt.sign({
            _id: user._id,
        }, 'secret', {
            expiresIn: '30d',
        })

        const {passwordHash, ...userData} = user._doc

        res.json({
            ...userData, token
        })
    } catch (err) {
        res.json(err)
    }
})

app.get('/auth/me', checkAuth, async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        if (!user) {
            return res.status(404).json({
                message: "not men"
            })
        }
        const {passwordHash, ...userData} = user._doc

        res.json(
            userData
        )
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'no access'});
    }
})

app.listen(PORT, (err) => {
    if (err) {
        console.log('server error')
    } else {
        console.log('server OK')
    }
})