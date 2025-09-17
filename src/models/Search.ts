import mongoose, { Schema, Document } from "mongoose";

export interface ISearchItem extends Document {
    user: mongoose.Types.ObjectId;
    title: string;
    poster_url: string;
    media_id: number;
    media_type: string;
    overview: string;
    vote_average: number;
}

const searchItemSchema: Schema<ISearchItem> = new Schema ({
    user: {type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    poster_url: { type: String, required: true },
    media_id: { type: Number, required: true },
    media_type: { type: String, required: true },
    overview: { type: String, required: true },
    vote_average: { type: Number, required: true }
})

export const SearchItem = mongoose.model<ISearchItem>('SearchItem', searchItemSchema)