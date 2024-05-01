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


// Function to update existing data and save it to the database
async function updateExistingData(
  reqBody: any,
  sectionsImagesUploads: any[],
  subSectionsImagesUploads: any[],
  imgUploads: any[],
  pageId: any,
  sectionId: any
) {
  // Extract URLs from the Cloudinary uploads
  const a = sectionsImagesUploads.map((i) => i.secure_url)
  const b = subSectionsImagesUploads.map((i) => i.secure_url)
  const [ogimageUrl, faviconUrl] = imgUploads.map((upload) => upload.secure_url);


  // Construct the update object
  const updateObject = {
    $set: {
      'pageSlug': reqBody.pageSlug,
      'pageName': reqBody.pageName,
      'metaDetails.title': reqBody.metaDetails.title,
      'metaDetails.description': reqBody.metaDetails.description,
      'metaDetails.keywords': reqBody.metaDetails.keywords || [],
      'metaDetails.ogImage': ogimageUrl || '',
      'metaDetails.favicon': faviconUrl || '',
      'sections.$[section]': reqBody.sections.map((section: any) => ({
        ...section,
        sectionsImages: [...a],
        subSections: Array.isArray(section.subSections) ?
          section.subSections.map((subSection: any) => ({
            ...subSection,
            subSectionsImages: [...b],
          })) : [],
      })),
    },
  };



  // Set arrayFilters for positional matching
  const arrayFilters = [
    { 'section._id': sectionId },
  ];

  // Update the document based on pageId and sectionId
  const updatedData = await Page.findOneAndUpdate(
    {
      '_id': pageId,
    },
    updateObject,
    {
      arrayFilters,
      new: true, 
    }
  );

  return updatedData;
}

// Default function for the PUT API endpoint
export default async function updateContent(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Check if the request method is PUT
    if (req.method !== 'PUT') {
      return res.status(405).json({
        message: 'Method Not Allowed',
      });
    }

    // Connect to the database
    await connect();

    // Call the auth middleware
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

    const { pageId, sectionId } = req.query;

    // Find the content based on pageId and sectionId
    const existingData = await Page.findOne({
      '_id': pageId,
      'sections._id': sectionId,
    });

    // If the content is not found, return an error
    if (!existingData) {
      return res.status(404).json({
        message: 'Content not found',
      });
    }

    // Extract uploaded files from the request
    const files = (req as any).files;

    // Filter files based on field names
    const sectionsImages = (files && files.filter((file: { fieldname: string; }) => file.fieldname.startsWith('sectionsImages'))) || [];
    const subSectionsImages = (files && files.filter((file: { fieldname: string; }) => file.fieldname.startsWith('subSectionsImages'))) || [];
    const ogImage = (files && files.find((file: { fieldname: string; }) => file.fieldname === 'ogImage')) || null;
    const favicon = (files && files.find((file: { fieldname: string; }) => file.fieldname === 'favicon')) || null;

    const sectionsImagesUploads = await uploadImages(sectionsImages);
    const subSectionsImagesUploads = await uploadImages(subSectionsImages);

    // Upload meta images to Cloudinary
    const imgUploadPromises = [
      ogImage ? cloudinary.uploader.upload(ogImage.path) : Promise.resolve(),
      favicon ? cloudinary.uploader.upload(favicon.path) : Promise.resolve(),
    ];

    const imgUploads = await Promise.all(imgUploadPromises);

    // Process and save updated data to the database
    const updatedData = await updateExistingData(req.body, sectionsImagesUploads, subSectionsImagesUploads, imgUploads, pageId, sectionId);

    // Respond with success message and the updated data
    return res.status(200).json({ message: 'Update successfully!', updatedData });

  } catch (error) {
    console.error("Error in content API:", error);
    return res.status(500).json({ error: 'Error in content API.' });
  }
}
