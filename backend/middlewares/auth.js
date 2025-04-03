import jwt from 'jsonwebtoken';
import '../config/env.js'

export default async function auth(req, res, next) {
    try {
        const token = req.headers.token;
        const userauth = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = userauth.userId;
        next();
    } catch (e) {
        res.status(401).json({ msg: "Invalid or expired token." });

    }
}