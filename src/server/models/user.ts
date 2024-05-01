import mongoose, { Schema, Document, Model } from "mongoose";

interface IUser extends Document {
    userData: {
        fullName?: string;
        email?: string;
        phoneNumber?: number;
        subject?: string;
        message?: string;
    }[];
    userUuid?: string;
}

const UserSchema: Schema = new Schema({
    userData: [
        {
            fullName: { type: String },
            email: { type: String },
            phoneNumber: { type: Number },
            subject: { type: String },
            message: { type: String },
        },
    ],
    userUuid: { type: String, required: false },
}, { timestamps: true });

let User: Model<IUser>;

try {
    // Try to retrieve the model if it exists
    User = mongoose.model<IUser>("User");
} catch {
    // If it doesn't exist, create and compile the model
    User = mongoose.model<IUser>("User", UserSchema);
}

export default User;
