import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

const router = Router();

// POST /api/v1/auth/login
router.post('/login', [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
], async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ success: false, errors: errors.array() });
    return;
  }

  try {
    const { username, password } = req.body;
    const trimUser = username.trim().toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD || 'BrightAfrica2026';
    const jwtSecret = process.env.JWT_SECRET || 'bright-africa-secret-key-2026';

    // Super Admin Check
    if ((trimUser === 'admin' || trimUser === 'administrator' || trimUser === 'brightafrica') && password === adminPassword) {
      const userPayload = {
        id: 'super-admin',
        username: 'admin',
        name: 'Administrateur Principal',
        email: 'admin@brightafrica.org',
        role: 'ADMIN',
      };

      const token = jwt.sign(userPayload, jwtSecret, { expiresIn: '24h' });

      res.status(200).json({
        success: true,
        message: 'Connexion administrateur réussie.',
        user: {
          ...userPayload,
          createdAt: '2026-01-01',
        },
        token,
      });
      return;
    }

    res.status(401).json({
      success: false,
      message: 'Nom d\'utilisateur ou mot de passe incorrect.',
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur lors de l\'authentification.' });
  }
});

export default router;
