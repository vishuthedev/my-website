import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../server/config/db';
import Page from '../../server/models/pages';

// Define the API endpoint handler
export default async function getPageById(req: NextApiRequest, res: NextApiResponse) {
    try {

        // Check if the request method is not GET
        if (req.method !== 'GET') {
            return res.status(405).json({
                message: 'Method Not Allowed',
            });
        }

        // Connect to the database
        await connect();

        // Extract the pageId from the query parameters
        const { pageId } = req.query;

        // Validate that pageId is provided
        if (!pageId || typeof pageId !== 'string') {
            return res.status(400).json({
                message: 'Invalid pageId parameter.',
            });
        }

        // Query the database to find the content by pageId
        const content = await Page.findOne({
            '_id': pageId,
        });

        // Check if content is found
        if (!content) {
            return res.status(404).json({
                message: 'Content not found for the specified pageId.',
            });
        }

        // Return the extracted content
        res.status(200).json({
            data: content,
        });
    } catch (error) {
        console.error("Error in getById API:", error);
        res.status(500).json({ error: 'Error in getById API.' });
    }
}
