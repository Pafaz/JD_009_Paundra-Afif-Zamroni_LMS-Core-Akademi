import { registerSchema, loginSchema } from "../validations/auth.validation.js";
import { registerUser, loginUser } from "../services/auth.service.js";

export const authController = {
    register: async (req, res) => {
        try {
            const validated = registerSchema.parse(req.body);

            const user = await registerUser(validated);

            res.json({ message: "User created", user });
        } catch (err) {
            if (err.name === "ZodError") {
                return res.status(400).json({ errors: err.errors });
            }
            res.status(500).json({ error: err.message });
        }
    },
    login: async (req, res) => {
        try {
            const validated = loginSchema.parse(req.body);

            const { token, user } = await loginUser(validated);

            res.json({ message: "Login successful", token, user });
        } catch (err) {
            if (err.name === "ZodError") {
                return res.status(400).json({ errors: err.errors });
            }
            res.status(400).json({ error: err.message });
        }
    }
};
