import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export interface AuthRequest extends Request {
  user?: { id: string };
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
  let token: string | undefined;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as { id: string };

      // Attach user to request
      req.user = { id: decoded.id };
      return next();
    } catch (error) {
      console.error("JWT verification failed:", error); // 👈 log it once
      return res.status(401).json({ message: "Token Failure, not authorized" });
    }
  }

  // No token provided at all
  return res.status(401).json({ message: "Token Absent, not authorized" });
};
