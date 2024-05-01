import Auth from '../../server/models/auth';
import connect from '../../server/config/db';
import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from "uuid";
import { passwordRegex, emailValidate } from '../../server/middleware/helper';


export default async function register(req: NextApiRequest, res: NextApiResponse) {
    try {

        // Check if the request method is not GET
        if (req.method !== 'POST') {
            return res.status(405).json({
                message: 'Method Not Allowed',
            });
        }

        const { fullName, email, password } = req.body;

        await connect();

        if (!fullName || !email || !password) {
            return res.status(400).json("All fields are required");
        }

        if (password.length < 6) {
            return res.status(400).json("Password must be at least 6 characters long");
        }

        // Password validation check
        if (!passwordRegex.test(password)) {
            return res.status(400).json("Password must contain at least one Upper letter, one digit, one special character (!@#$%^&*()_+)");
        }

        if (!emailValidate(email)) {
            return res.status(400).json("Invalid email format");
        }

        const existingUser = await Auth.findOne({ email });

        if (existingUser) {
            return res.status(400).json(`This ${email} is already in use`);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUuid = uuidv4();
        const newUser = new Auth({
            fullName, email, password: hashedPassword, userUuid: newUuid
        })
        await newUser.save();
        return res.status(200).json({ message: "User is registered" });
    } catch (error) {
        console.error('Error in register api',error);
        return res.status(500).json({ error: "Error in register api" });

    }
}


