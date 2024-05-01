import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../server/config/db';
import Page from '../../server/models/pages';
import multer from 'multer';
import { cloudinary } from '../../server/config/cloudinary';
import authMiddleware from '../../server/middleware/tokenVerify';


// Configure multer for file upload
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
      const name = Date.now() + '_' + file.originalname;
      cb(null, name);
    }
  });
const upload = multer({ storage: storage });

// Configure API endpoint to disable default body parsing
export const config = {
    api: {
        bodyParser: false,
    },
};

// Function to upload images to Cloudinary
async function uploadImages(files: any[]) {
    const uploadPromises = files.map((file: { path: string; }) => cloudinary.uploader.upload(file.path));
    return Promise.all(uploadPromises);
}


// Function to process new data and save it to the database
async function processNewData(
    reqBody: any,
    sectionsImagesUploads: any[],
    subSectionsImagesUploads: any[],
    imgUploads: any[]
) {
    // Extract URLs from the Cloudinary uploads
    const a = sectionsImagesUploads.map((i) => i.secure_url)
    const b = subSectionsImagesUploads.map((i) => i.secure_url)
    const [ogimageUrl, faviconUrl] = imgUploads.map((upload) => upload.secure_url);

    // Create a new Content object with the provided data
    const newData = new Page({
                pageName: reqBody.pageName,
                pageSlug: reqBody.pageSlug,
                // Extract meta details from the request body
                metaDetails: {
                    title: reqBody.metaDetails.title,
                    description: reqBody.metaDetails.description,
                    keywords: reqBody.metaDetails.keywords || [],
                    ogImage: ogimageUrl || '',
                    favicon: faviconUrl || '',
                },
                // Extract page slug from the request body
                sections: reqBody.sections.map(
                    (section: any) => {
                        // Initialize arrays if they don't exist
                        section.sectionsImages = section.sectionsImages || [];
                        section.subSections = section.subSections || [];

                        // subSectionsImages array is initialized for each subSection
                        section.subSections.forEach((subSection: any) => {
                            subSection.subSectionsImages = subSection.subSectionsImages || [];
                        });

                        // Push new URLs to arrays instead of overwriting them
                        section.sectionsImages.push(
                            ...a
                        );
                        section.subSections.forEach(
                            (subSection: any) => {
                                subSection.subSectionsImages.push(
                                    ...b
                                );
                            }
                        );

                        return section;
                    }
                ),
    });
    // Save the new data to the database
    await newData.save();
    return newData;
}

// Function to update existing data with new sections
async function updateExistingData(existingData: any, sectionsImagesUploads: any[], subSectionsImagesUploads: any[], newSections: any[]) {

    // Extract URLs from the Cloudinary uploads
    const a = sectionsImagesUploads.map((i: { secure_url: any; }) => i.secure_url);
    const b = subSectionsImagesUploads.map((i: { secure_url: any; }) => i.secure_url);

    // Map over new sections to update existing data
    const updatedSections = newSections.map((section: any) => {
        // Initialize arrays if they don't exist
        section.sectionsImages = section.sectionsImages || [];
        section.subSections = section.subSections || [];

        // subSectionsImages array is initialized for each subSection
        section.subSections.forEach((subSection: any) => {
            subSection.subSectionsImages = subSection.subSectionsImages || [];
        });

        // Push new URLs to arrays instead of overwriting them
        section.sectionsImages.push(...a);
        section.subSections.forEach((subSection: any) => {
            subSection.subSectionsImages.push(...b);
        });

        return section;
    });

    // Push updated sections to existing data
    existingData.sections.push(...updatedSections);

    // Save the updated data to the database
    return existingData.save();
}


// Default function for the API endpoint
export default async function newContent(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Check if the request method is POST
        if (req.method !== 'POST') {
            return res.status(405).json({
                message: 'Method Not Allowed',
            });
        }

        // Connect to the database
        await connect();

        // Call the auth middlware
        await authMiddleware(req, res);

        // Use multer to handle file uploads
        await new Promise<void>((resolve, reject) => {
            upload.any()(req as any, res as any, (err) => {
                if (err) {
                    console.error("Multer Error:", err);
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

        // Extract uploaded files from the request
        const files = (req as any).files;

        // Filter files based on field names
        const sectionsImages = (files && files.filter((file: { fieldname: string; }) => file.fieldname.startsWith('sectionsImages'))) || [];
        const subSectionsImages = (files && files.filter((file: { fieldname: string; }) => file.fieldname.startsWith('subSectionsImages'))) || [];
        const ogImage = (files && files.find((file: { fieldname: string; }) => file.fieldname === 'ogImage')) || null;
        const favicon = (files && files.find((file: { fieldname: string; }) => file.fieldname === 'favicon')) || null;

        // Extract data from the request body
        const { pageName, sections } = req.body;

        // Check if data with the same pageId and name already exists in the database
        let existingData = await Page.findOne({ "pageName": pageName });

        // If data exists, update it with new sections and uploaded images
        if (existingData) {
            const sectionsImagesUploads = await uploadImages(sectionsImages);
            const subSectionsImagesUploads = await uploadImages(subSectionsImages);

            existingData = await updateExistingData(existingData, sectionsImagesUploads, subSectionsImagesUploads, sections);

        } else {
            // If data doesn't exist, process new data and save it to the database
            const sectionsImagesUploads = await uploadImages(sectionsImages);
            const subSectionsImagesUploads = await uploadImages(subSectionsImages);

            // Upload meta images to Cloudinary
            const imgUploadPromises = [
                ogImage ? cloudinary.uploader.upload(ogImage.path) : Promise.resolve(),
                favicon ? cloudinary.uploader.upload(favicon.path) : Promise.resolve(),
            ];

            const imgUploads = await Promise.all(imgUploadPromises);

            // Process and save new data to the database
            const newData = await processNewData(req.body, sectionsImagesUploads, subSectionsImagesUploads, imgUploads);

            // Respond with success message and the new data
            return res.status(201).json({ message: 'Submit successfully!', newData });
        }
        // Respond with success message and the updated existing data
        return res.status(201).json({ message: 'Submit successfully!', existingData });
    } catch (error) {
        console.error("Error in content API:", error);
        return res.status(500).json({ error: 'Error in content API.' });
    }
}
