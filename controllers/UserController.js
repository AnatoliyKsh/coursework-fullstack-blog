import bcrypt from "bcrypt";
import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {

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
}

export const login = async (req, res) => {
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


}

export const getMe = async (req, res) => {
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
}