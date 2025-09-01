import { Request, Response, Router } from "express";
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


// Register thy User

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password, region} = req.body;

        // Check if the user exists
        const userExists = await User.findOne({ email }); //I see this as the most stable unique field not gonna lie
        if(userExists) {
            res.status(400).json({ error: "This email is already in use, try logging in!" })
        }

        // if not, hash the password and register user

        const hashedPassword = await bcrypt.hash(password, 10)

        const createUser = new User({
            username,
            email,
            password: hashedPassword,
            region
        });

        await createUser.save();

        res.status(201).json({ message: 'User registered Successfully' })

    } catch (err) {
        res.status(500).json({ error: "Oops! Server error " + err})
    }
};


// User Login

export const loginUser =  async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email});
        if(!user) {
            res.status(400).json({ error: "User not found! Check your Email"})
        }

        // check password
        const isAuthorised = await bcrypt.compare(password, user.password)
        if(!isAuthorised) {
            res.status(400).json({ error: "Invalid creds! Check the password." });
        }

        // generate JWT
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET || 'woahaha',
            {expiresIn: '1h'}
        );
        res.json({ message: "Login Successful!", token });

    } catch (err) {
        res.status(500).json({ error: 'Oops! Server error: ' + err})
    }
};
