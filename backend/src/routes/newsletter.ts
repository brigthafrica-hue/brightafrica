import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import Newsletter from '../models/Newsletter';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// GET subscribers list (Protected Admin Endpoint)
router.get('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const subscribers = await Newsletter.find().sort({ subscribedAt: -1 });
    res.status(200).json({ success: true, data: subscribers });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch subscribers.' });
  }
});

// POST subscribe email
router.post('/', [
  body('email').isEmail().withMessage('Valid email is required')
], async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
     res.status(400).json({ errors: errors.array() });
     return;
  }

  try {
    const { email } = req.body;
    
    // Check if already subscribed
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      res.status(200).json({ success: true, message: 'Déjà inscrit à la newsletter.' });
      return;
    }

    const subscriber = await Newsletter.create({ email });

    res.status(201).json({ success: true, message: 'Insolite! Inscription réussie à la newsletter.', data: subscriber });
  } catch (error) {
    console.error('Newsletter error:', error);
    res.status(500).json({ success: false, message: 'Subscription failed.' });
  }
});

export default router;
