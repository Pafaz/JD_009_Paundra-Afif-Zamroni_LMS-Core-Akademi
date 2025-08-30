import { authRepository } from "../repositories/auth.repository.js";
import { generateToken } from "../utils/jwt.js";
import { hashPassword, comparePassword } from "../utils/hash.js";


export const registerUser = async ({ name, email, password, role }) => {
    const existing = await authRepository.findUserByEmail(email);
    if (existing) {
        throw new Error("Email already used");
    }

    const hashed = await hashPassword(password);

    const user = await authRepository.createUser({
        name,
        email,
        password: hashed,
        role, 
    });

    return { id: user.id, email: user.email, name: user.name, role: user.role };
};

export const loginUser = async ({ email, password }) => {
    const user = await authRepository.findUserByEmail(email);
    if (!user) throw new Error("Invalid email or password");

    const match = await comparePassword(password, user.password);
    if (!match) throw new Error("Invalid email or password");

    const token = generateToken(user);

    return {
        token,
        user: { id: user.id, email: user.email, name: user.name, role: user.role },
    };
};
