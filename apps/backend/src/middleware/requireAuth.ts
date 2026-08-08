import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "../lib/jwt";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token: string | undefined = req.cookies?.token;
  const payload = token ? verifyToken(token) : null;

  if (!payload) {
    res.status(401).json({ error: "Not logged in" });
    return;
  }

  req.userId = payload.userId;
  next();
}
