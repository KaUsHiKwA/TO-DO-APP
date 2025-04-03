import User from '../models/user.js';
import validator from 'validator';
import bcrypt from 'bcrypt';
import JsonWebToken from 'jsonwebtoken';
import '../config/env.js';

function genToken(userId) {
    return JsonWebToken.sign({ userId }, process.env.JWT_SECRET);
}

export async function signUp(req, res) {
    const { email, name, password } = req.body;
    try {

        if (validator.isEmpty(email) || validator.isEmpty(password) || validator.isEmpty(name)) {
            return res.status(400).json({ msg: 'Enter all fields!' });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ msg: 'Please enter a valid email!' });
        }

        const exists = await User.findOne({ email: email });

        if (exists) return res.status(400).json({ msg: 'user already exits!' });

        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ msg: 'weak password!' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email: email,
            password: hashedPassword,
            name: name
        });

        const user = await newUser.save();
        const token = genToken(user._id);

        res.status(200).json({ token });
    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
}

export async function signIn(req, res) {

    try {

        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            res.status(401).json({ msg: 'user not found!' });
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const token = genToken(user._id);
        res.status(200).json({ token });
    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
}