import express from 'express'
import jwt from 'jsonwebtoken'
import mongoose from "mongoose"


mongoose.connect('mongodb+srv://admin:parol@cluster0.otv1lgn.mongodb.net/?retryWrites=true&w=majority'
).then(() => console.log('BD OK'))
    .catch((err) => console.log('DB not OK', err))

const app = express()
const PORT = 4444

app.use(express.json())

app.get('/', (req, res) => {
    res.send('server works')
})

const token = jwt.sign({}, 'jwtpass')

app.post('/auth/login', (req, res) => {
    res.json({
        success: true,
        token,
    })
})


app.listen(PORT, (err) => {
    if (err) {
        console.log('server error')
    } else {
        console.log('server OK')
    }
})