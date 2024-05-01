import Auth from '../../server/models/auth';
import jwt from "jsonwebtoken";
import connect from '../../server/config/db';
import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { environmentConfig } from "../../server/config/environmentConfig";

// Define the API endpoint for user login
export default async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Check if the HTTP method is not POST
    if (req.method !== 'POST') {
      return res.status(405).json({
        message: 'Method Not Allowed',
      });
    }

    // Extract email and password from the request body
    const { email, password } = req.body;

    // Connect to the database
    await connect();

    // Find user by email in the Auth model
    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: `Invalid Email address or Password`,
      });
    }

    // Check if the user has a password
    if (!user.password) {
      return res.status(400).json({
        message: `Password not found for this user`,
      });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Return a 401 response if the password is invalid
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Email address or Password" });
    }

    // Generate a JWT token for authentication
    const token = jwt.sign(
      {
        userId: user._id,
        userUuid: user.userUuid,
        fullName: user.fullName,
        email: user.email,
      },
      environmentConfig.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    // Assemble user data including the token
    let userData = {
      token: token,
    };

    // Return user data in response
    return res.status(200).json({
      message: "User login successful",
      userData,
    });
  } catch (error) {
    // Handle errors and return an error response
    console.error("Error in login api:", error);
    return res.status(500).json({ error: "Error in login api" });
  }
}
