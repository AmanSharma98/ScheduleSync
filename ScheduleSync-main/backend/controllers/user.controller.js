const UserModel = require("../models/user.model");
const { generateAccessToken, verifyToken } = require("../utils/jwt.util");


async function getUsers(req, res) {
    try {
       
        const users = await UserModel.find({ role: { $ne: "admin" } });
        return res.status(200).json(users);

    } catch(error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


async function login(req, res) {
    try {
        const { email, password } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        if (existingUser.password !== password) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const token = generateAccessToken(existingUser);
        req.user = { id: existingUser._id };
        return res.status(200).json({
            message: "Login successful",
            user: {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                role: existingUser.role,
            },
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function register(req, res) {
    try {
        const { name, email, password } = req.body;

        const existingUser = await UserModel.find({ email });
        if (existingUser.length > 0) {
            return res.status(409).json({ message: "User already exists" });
        }
        const newUser = new UserModel({ name, email, password });
        const savedUser = await newUser.save();
        if (savedUser) {
            const token = generateAccessToken(savedUser);
            req.user = { id: savedUser._id };
            return res.status(201).json({
                message: "User registered successfully",
                user: {
                    id: savedUser._id,
                    name: savedUser.name,
                    email: savedUser.email,
                    role: savedUser.role,
                },
                token,
            });
        } else {
            return res.status(400).json({ message: "Failed to register user" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


module.exports = {
    getUsers,
    login,
    register
};