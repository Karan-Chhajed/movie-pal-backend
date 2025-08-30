import mongoose, { Schema, Document } from "mongoose";

export interface ISearchItem extends Document {
    user_id: number;
    search_term: string;
    title: string;
    poster_url: string;
    movie_id: number;
    media_type: string;
    overview: string;
    vote_average: number;
}

const searchItemSchema: Schema<ISearchItem> = new Schema ({
    user_id: {type: Number, required: true },
    search_term: { type: String, required: true },
    title: { type: String, required: true },
    poster_url: { type: String, required: true },
    movie_id: { type: Number, required: true },
    media_type: { type: String, required: true },
    overview: { type: String, required: true },
    vote_average: { type: Number, required: true }
})

export const SearchItem = mongoose.model<ISearchItem>('SearchItem', searchItemSchema)