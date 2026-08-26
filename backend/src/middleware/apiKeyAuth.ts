import { type Request, type Response, type NextFunction } from "express";

const API_KEY = process.env.API_KEY;

function apiKeyAuth(req: Request, res: Response, next: NextFunction) {
    const providedKey = req.header("x-api-key");

    if (!providedKey) {
        return res.status(401).json({
            error: "API key is required"
        });
    }

    if (providedKey !== API_KEY) {
        return res.status(403).json({
            error: "Invalid API key"
        });
    }

    next();
}

export default apiKeyAuth;
