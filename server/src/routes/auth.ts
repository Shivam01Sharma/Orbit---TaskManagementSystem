import { Router, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../database';
import {
  generateToken,
  verifyToken,
  authMiddleware,
  AuthenticatedRequest,
} from '../middleware/auth';
import bcryptjs from 'bcryptjs';

const router = Router();

// Login endpoint
router.post('/login', async (req: AuthenticatedRequest, Response) => {
  const res = Response as any;
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    const user = db.findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    let passwordMatch = false;

    // For demo users with plain text passwords
    const demoCredentials: { [key: string]: string } = {
      // Project Leader
      'mayank@orbit.com': 'Password@123456',
      // Quality Leaders
      'shivam@orbit.com': 'Password@123456',
      'lakshya@orbit.com': 'Password@123456',
      // Taskers
      'ribhav@orbit.com': 'Password@123456',
      'yodi@orbit.com': 'Password@123456',
      'arun@orbit.com': 'Password@123456',
      'vandita@orbit.com': 'Password@123456',
      'divya@orbit.com': 'Password@123456',
      'priyanshu@orbit.com': 'Password@123456',
      'jatin@orbit.com': 'Password@123456',
      'megha@orbit.com': 'Password@123456',
      'kush@orbit.com': 'Password@123456',
    };

    // Check demo credentials first
    if (demoCredentials[email] && demoCredentials[email] === password) {
      passwordMatch = true;
    } else {
      // For new users, use bcrypt comparison
      try {
        passwordMatch = await bcryptjs.compare(password, user.password);
      } catch (err) {
        // If bcrypt fails, try plain text comparison (fallback)
        passwordMatch = user.password === password;
      }
    }

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user.id, user.email, user.role);

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        joinDate: user.joinDate,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed' });
  }
});

// Logout endpoint
router.post('/logout', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  res.json({ message: 'Logged out successfully' });
});

// Register endpoint
router.post('/register', async (req: AuthenticatedRequest, res: Response) => {
  const { name, email, password, role } = req.body;

  try {
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate role
    if (!['tasker', 'ql', 'pl'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role. Must be tasker, ql, or pl' });
    }

    const existingUser = db.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create user with auto-generated sequential ID
    const newUser = db.createUser(name, email, hashedPassword, role as 'tasker' | 'ql' | 'pl');

    // Generate JWT token
    const token = generateToken(newUser.id, newUser.email, newUser.role);

    res.status(201).json({
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        joinDate: newUser.joinDate,
      },
      token,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

// Verify token endpoint
router.get('/verify', authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const user = db.findUserById(req.user?.id!);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      joinDate: user.joinDate,
    },
  });
});

export default router;
