const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

console.log("Auth Controller Loaded");

const register = async (req, res) => {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({
            message: "User already exists"
        });
    }
    
    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(
        password,
        salt
    );

    const user = await User.create({
        name,
        email,
        password: hashPassword,
        role
    });

    res.status(201).json(user);
};


const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({
            message: "Invalid credentials"
        });
    }

    const isMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!isMatch) {
        return res.status(400).json({
            message: "Invalid credentials"
        });
    }

    const token = jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );

    res.json({
        token
    });
};

module.exports = {
    register,
    login,
};
