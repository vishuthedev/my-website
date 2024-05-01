import User from '../../server/models/user';
import connect from '../../server/config/db';
import { NextApiRequest, NextApiResponse } from 'next';

// Define the API endpoint to get all users
export default async function getAllContactUser(req: NextApiRequest, res: NextApiResponse) {
    try {

        // Check if the request method is not GET
        if (req.method !== 'GET') {
            return res.status(405).json({
                message: 'Method Not Allowed',
            });
        }

        // Connect to the database
        await connect();

        // Retrieve all users from the User model
        const getAllUser = await User.find({});

        // Check if no users are found
        if (getAllUser.length === 0) {
            return res.status(500).json({ error: "No user found" });
        } else {
            // Return the list of users in the response
            return res.status(200).json({ data: getAllUser });
        }
    } catch (error) {
        console.error('Error in getAllContactUser API',error);
        return res.status(500).json({ error: "Error in getAllContactUser API" });
    }
}
