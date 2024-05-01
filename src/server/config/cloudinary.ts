import { v2 as cloudinary } from 'cloudinary';
import { environmentConfig } from '../../server/config/environmentConfig';



// Configuration
cloudinary.config({
    cloud_name: environmentConfig.CLOUD_NAME,
    api_key: environmentConfig.API_KEY,
    api_secret: environmentConfig.API_SECRET,
});


export { cloudinary };