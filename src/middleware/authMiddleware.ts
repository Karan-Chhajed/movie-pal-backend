import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export interface AuthRequest extends Request {
    user?: {id: string};
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {id: string}

            req.user = { id: decoded.id}
            return next()

        } catch (error) {
            return res.status(401).json({ message: "Token Failure, not authorized" });
        }
    }
    if(!token) {
        return res.status(401).json({ message: "Token Absent, not authorized" })
    }
};