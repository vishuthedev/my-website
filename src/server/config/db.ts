import { environmentConfig } from '../config/environmentConfig';
import mongoose from 'mongoose';

const connect = async (): Promise<void> => {
    if (mongoose.connections[0].readyState) return;
    mongoose.connect(environmentConfig.DB_URL)
    .then(() => {
      console.log("Database Connected...👍️");
    })
    .catch(() => {
      console.log("Database not connected...😤");
    });
};

export default connect;
