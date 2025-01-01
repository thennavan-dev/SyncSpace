import express, { Request, Response } from "express";
import { User } from "../model/user";
import { collections } from "../config/connect";
import bcrypt from "bcrypt";

export const userRoutes = express.Router();

userRoutes.post("/signup", async (req: Request, res: Response) => {
    try {
        console.log("Request body:", req.body);
        const { username, name, email, password } = req.body;

        if (!User.validateEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const existingUser = await collections.user?.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const newUser = new User(username, name, email, password);
        await newUser.hashPassword(); 

        const result = await collections.user?.insertOne(newUser);

        if (result?.insertedId) {
            res.status(201).json({ message: "User created successfully" });
        } else {
            res.status(500).json({ message: "Failed to create user" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
});


userRoutes.post("/login", async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const existingUser = await collections.user?.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        res.status(200).json({
            message: "Login successful",
            user: { username: existingUser.username, name: existingUser.name, email: existingUser.email },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
});
