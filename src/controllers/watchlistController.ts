import { Response } from "express";
import { WatchlistItem } from "../models/WatchLists";
import { AuthRequest } from "../middleware/authMiddleware";

export const addToWatchlist = async (req: AuthRequest, res: Response) => {
    const { media_id, title, overview, media_type, vote_average, genres, poster_url } = req.body;

    try {
        const item = await WatchlistItem.create({
            user: req.user!.id,
            media_id,
            title,
            overview,
            media_type,
            vote_average,
            genres,
            poster_url
        })
        return res.status(201).json(item)
    } catch (err) {
        return res.status(500).json({message: 'Error creating watchlist item:' + err, media_id})
    }
}

export const deleteFromWatchlist = async (req: AuthRequest, res: Response) => {
    const { media_id} = req.body

    try {
        await WatchlistItem.findOneAndDelete({user: req.user!.id,  media_id});
        return res.json({ message: 'Watchlist item deleted', media_id})
    } catch (err) {
        return res.status(500).json({ message: 'Error deleteing item: ' + err, media_id})
    }
}

export const getWatchlist = async (req: AuthRequest, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 10

        const skip = (page - 1) * limit;


        const [list, total] = await Promise.all([
            WatchlistItem.find({user: req.user!.id})
            .sort({ added_at: - 1})
            .skip(skip)
            .limit(limit),
            WatchlistItem.countDocuments({ user: req.user!.id})
        ])

        return res.json({
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            items: list
        })
    } catch (err) {
        return res.status(500).json({ message: "Error getting watchlist: " + err})
    }
}