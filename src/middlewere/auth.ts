import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET_KEY = "mock-secret-key";

export interface AuthRequest extends Request {
  userId?: string;
}

// Define the shape of your JWT payload
interface TokenPayload extends JwtPayload {
  userId: string;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as TokenPayload;

    if (!decoded.userId) {
      return res.status(403).json({ error: "Invalid token payload" });
    }

    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};

// Helper to create mock tokens (for testing)
export const generateMockToken = (userId: string = "123e4567-e89b-12d3-a456-426614174000") => {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: "1h" });
};
