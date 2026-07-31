import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: any;
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      success: false,
      message: 'Accès refusé. Jeton d\'authentification manquant.',
    });
    return;
  }

  const token = authHeader.split(' ')[1];
  const jwtSecret = process.env.JWT_SECRET || 'bright-africa-secret-key-2026';

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      message: 'Jeton d\'authentification invalide ou expiré.',
    });
  }
}
