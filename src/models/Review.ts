import mongoose, { Schema, Document} from "mongoose";

export interface IReview extends Document {
    user: mongoose.Types.ObjectId;
    name: string;
    company: string;
    designation: string;
    email: string;
    linkedin: string;
    comments: string;
}

const reviewItem: Schema<IReview> = new Schema({
    user: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    company: { type: String, required: true },
    designation: { type: String, required: true },
    email: { type: String, required: true },
    linkedin: { type: String },
    comments: { type: String }
})

export const ReviewItem = mongoose.model('Review', reviewItem)