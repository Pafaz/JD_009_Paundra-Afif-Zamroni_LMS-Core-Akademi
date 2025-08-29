import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export function generateToken(user) {
    return jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        SECRET,
        { expiresIn: "7d" }
    );
}

export function verifyToken(token) {
    return jwt.verify(token, SECRET);
}
