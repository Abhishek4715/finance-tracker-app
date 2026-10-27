import type { Request, Response, NextFunction } from "express";

export function fakeAuth(req: Request, res: Response, next: NextFunction) {
    try {
        req.user = { id: process.env.FAKE_USER_ID! };
        next();
    } catch(error) {
        next(error);
    }
}