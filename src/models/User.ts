import mongoose, {Schema, Document} from "mongoose";

export interface IUser extends Document {
    username: mongoose.Types.ObjectId;
    email: string;
    password: string;
    region: string;
    createdAt: Date;
}

const userSchema: Schema<IUser> = new Schema({
    username: { type: Schema.Types.ObjectId, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    region: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.model<IUser>('User', userSchema)