import { Response } from "express";
import { SearchItem } from "../models/Search";
import { AuthRequest } from "../middleware/authMiddleware";

export const addToSearchList = async (req: AuthRequest, res: Response) => {
    const { media_id, title, overview, media_type, vote_average, genres, poster_url } = req.body;

    try {
        const item = await SearchItem.create({
            user: req.user!.id,
            media_id,
            title,
            overview,
            media_type,
            vote_average,
            genres,
            poster_url
        })

        res.status(201).json(item)
    } catch (err) {
        res.status(500).json({ message: 'Error adding search item: ' + err, media_id})
    }
}

export const getSearchList = async (req: AuthRequest, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 10
        
        const skip = (page - 1) * 10

        const [list, total] = await Promise.all([
            SearchItem.find({user: req.user!.id})
            .skip(skip)
            .limit(limit),
            SearchItem.countDocuments({ user: req.user!.id})
        ]);

        return res.status(200).json({
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            items: list
        })
    } catch (err) {
        return res.status(500).json({ message: 'Error fetching search list: ' + err})
    }
}