import mongoose, { Schema, Document, Model } from "mongoose";

interface IAuth extends Document {
    fullName: string;
    email: string;
    password: string;
    userUuid?: string;
}

const AuthSchema: Schema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    userUuid: { type: String, required: false },
}, { timestamps: true });

let Auth: Model<IAuth>;

try {
    // Try to retrieve the model if it exists
    Auth = mongoose.model<IAuth>("Auth");
} catch {
    // If it doesn't exist, create and compile the model
    Auth = mongoose.model<IAuth>("Auth", AuthSchema);
}

export default Auth;
