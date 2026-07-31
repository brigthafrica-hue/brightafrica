import { Router, Request, Response } from 'express';
import Membership from '../models/Membership';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// GET all membership applications (Protected Admin Endpoint)
router.get('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const applications = await Membership.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: applications });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch membership applications.' });
  }
});

// POST submit membership application
router.post('/', async (req: Request, res: Response) => {
  try {
    const { fullName, name, email, phone, profession, motivation } = req.body;
    
    const newMembership = await Membership.create({
      fullName: fullName || name || '',
      email,
      phone: phone || '',
      profession: profession || '',
      motivation: motivation || ''
    });

    res.status(201).json({ 
      success: true, 
      message: 'Application submitted successfully. Our team will review it.',
      data: newMembership
    });
  } catch (error) {
    console.error('Membership error:', error);
    res.status(500).json({ success: false, message: 'Submission failed.' });
  }
});

export default router;
