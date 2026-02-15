import { Request, Response, NextFunction } from "express";
import { registerUser, loginUser } from "./auth.service";
import { generateToken } from "../../utils/jwt";
import { AuthRequest } from "../../types/express";

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body

        const user = await registerUser(name, email, password);

        const token = generateToken(user.id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        res.status(201).json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body

        const user = await loginUser(email, password);

        const token = generateToken(user.id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        res.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const logout = (req: Request, res: Response) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
    res.json({ message: "Logged out successfully" });
}

export const getCurrentUser = (req: AuthRequest, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    res.json({ user: req.user });
}
