// /frontend/server/routes/auth.ts
import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../db';
import { users } from '../db/schema';
import { loginSchema, registerSchema } from '../../shared/api.ts';
import { eq } from 'drizzle-orm';

const router = Router();

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const validatedData = registerSchema.parse(req.body);
    const { name, email, password, role } = validatedData;

    const existingUser = await db.select().from(users).where(eq(users.email, email));
    if (existingUser.length > 0) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await db
      .insert(users)
      .values({ name, email, passwordHash, role })
      .returning({ id: users.id, name: users.name, email: users.email, role: users.role });

    const token = jwt.sign(
      { userId: newUser[0].id, role: newUser[0].role },
      process.env.JWT_SECRET || 'your_default_secret',
      { expiresIn: '1d' },
    );

    res.status(201).json({ user: newUser[0], token });
  } catch (error) {
    res.status(400).json({ error: 'Invalid input' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const { email, password } = validatedData;

    const userResult = await db.select().from(users).where(eq(users.email, email));
    if (userResult.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = userResult[0];
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || 'your_default_secret',
      { expiresIn: '1d' },
    );

    res.json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (error) {
    res.status(400).json({ error: 'Invalid input' });
  }
});

export default router;
