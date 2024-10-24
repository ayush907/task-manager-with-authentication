import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import AuthUserModel from "../Models/AuthUser.js"

import dotenv from 'dotenv';
dotenv.config();
const secretKey = process.env.SECRET_KEY;

export const ControlSignUp = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const user = await AuthUserModel.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "Email already exists, you can log in..", success: false })
        }
        const encryptedPassword = await bcrypt.hash(password, 10)
        const newUser = new AuthUserModel({ name: name, email: email, password: encryptedPassword })
        await newUser.save()
        return res.status(200).json({ message: "User created successfully", success: true })
    } catch (err) {
        console.log(`SignUp error ${err}`)
        return res.status(500).json({ message: "Internal server error", success: false })
    }
}


export const ControlLogIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await AuthUserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Email not found", success: false });
        }
        const isPassEqual = bcrypt.compareSync(password, user.password);
        if (!isPassEqual) {
            return res.status(400).json({ message: "Password is incorrect", success: false });
        }
        const userData = { userId: user._id, email: user.email };
        const token = jwt.sign(userData, secretKey, { expiresIn: "10h" });

        // setting a cookie
        res.cookie("token", token, { 
            httpOnly: false, 
            sameSite: 'Lax',
            secure: false,
            expires: new Date(Date.now() + 86400000)
        });

        return res.status(200).json({ message: "Login successful", success: true, email, name: user.name, token});
    } catch (error) {
        console.error(`LogIn error: ${error}`);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}
