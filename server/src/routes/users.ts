import { Router, Response } from 'express';
import { db } from '../database';
import { authMiddleware, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// Get user profile
router.get('/profile', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const user = db.findUserById(req.user?.id!);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    joinDate: user.joinDate,
    lastLogin: user.lastLogin,
  });
});

// Update user profile
router.put('/profile', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const user = db.findUserById(req.user?.id!);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const { name, profileImage } = req.body;

  // Update user details
  const updatedUser = {
    ...user,
    ...(name && { name }),
    ...(profileImage && { profileImage }),
    lastLogin: new Date().toISOString(),
  };

  res.json({
    id: updatedUser.id,
    name: updatedUser.name,
    email: updatedUser.email,
    role: updatedUser.role,
    joinDate: updatedUser.joinDate,
    profileImage: updatedUser.profileImage,
  });
});

// Get user by ID
router.get('/:id', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const user = db.findUserById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    joinDate: user.joinDate,
  });
});

// Get all users (with optional role filter)
router.get('/', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const { role } = req.query;

  let users = db.getAllUsers();

  if (role) {
    users = users.filter((user) => user.role === role);
  }

  res.json(
    users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      joinDate: user.joinDate,
    }))
  );
});

export default router;
