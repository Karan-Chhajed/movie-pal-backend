import { Response } from "express";
import { ReviewItem } from "../models/Review";
import { AuthRequest } from "../middleware/authMiddleware";

export const addReview = async (req: AuthRequest, res: Response) => {
    const { name, company, designation, email, linkedin, comments, device_name } = req.body

    try {
        const item = await ReviewItem.create({
            user: req.user!.id,
            name,
            device_name,
            company,
            designation,
            email,
            linkedin,
            comments
        })

        return res.status(201).json({ item })
    } catch (err) {
        return res.status(500).json({ message: 'Error submitting review: ' + err})
    }
}