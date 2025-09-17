import mongoose, {Schema, Document} from "mongoose";

export interface IWatchlistItem extends Document {

    user: mongoose.Schema.Types.ObjectId;
    media_id: string;
    title: string;
    overview: string;
    media_type: string;
    vote_average: number;
    genres: string[];
    poster_url: string;
    added_at: Date
}

const watchlistItemSchema: Schema<IWatchlistItem> = new Schema({

    user: {type: Schema.Types.ObjectId, ref: "User",  required: true },
    media_id: {type: String, required: true },
    title: { type: String, required: true },
    overview: { type: String, required: true },
    media_type: { type: String, required: true },
    vote_average: { type: Number, required: true },
    genres: { type: [String], required: true },
    poster_url: { type: String, required: true },
    added_at: { type: Date, default: Date.now }
})

watchlistItemSchema.index({ user: 1, media_id: 1}, { unique: true })

export const WatchlistItem = mongoose.model<IWatchlistItem>('WatchlistItem', watchlistItemSchema)