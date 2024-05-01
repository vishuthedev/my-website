import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../server/config/db';
import Page from '../../server/models/pages';
import authMiddleware from '../../server/middleware/tokenVerify';



// Default function for the Delete API endpoint
export default async function deleteContent(req: NextApiRequest, res: NextApiResponse) {
    try {
           // Check if the request method is DELETE
        if (req.method !== 'DELETE') {
            return res.status(405).json({
                message: 'Method Not Allowed',
            });
        }

            // Connect to the database
        await connect();

        // Call the auth middleware
        await authMiddleware(req, res);
        
        // pageis and section in query
        const { pageId, sectionId } = req.query;

        if (!pageId && !sectionId) {
            return res.status(400).json({
                message: 'Bad Request. Please provide at least pageId in the query parameters.',
            });
        }

        if (pageId) {
            if (sectionId) {
                // Both pageId and sectionId provided, delete specific section
                const updatedData = await Page.findOneAndUpdate(
                    { '_id': pageId },
                    { $pull: { 'sections': { _id: sectionId } } },
                    { new: true }
                );

                if (!updatedData) {
                    return res.status(404).json({
                        message: `Section with sectionId ${sectionId} not found in pageId ${pageId}.`,
                    });
                }

                return res.status(200).json({
                    message: `Section with sectionId ${sectionId} deleted successfully.`,
                });
            } else {
                // Only pageId provided, delete the entire page
                const deletedData = await Page.findOneAndDelete({ '_id': pageId });

                if (!deletedData) {
                    return res.status(404).json({
                        message: `Data with pageId ${pageId} not found.`,
                    });
                }

                return res.status(200).json({
                    message: `Data with pageId ${pageId} deleted successfully.`,
                });
            }
        } else {
            return res.status(400).json({
                message: 'Bad Request. Please provide at least pageId in the query parameters.',
            });
        }
    } catch (error) {
        console.error("Error in delete content API:", error);
        return res.status(500).json({ error: 'Error in delete content API.' });
    }
}
