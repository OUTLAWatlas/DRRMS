// /frontend/server/routes/rescueRequests.ts
import { Router } from 'express';
import { db } from '../db';
import { rescueRequests } from '../db/schema';
import { authMiddleware, AuthRequest, rescuerOnly } from '../middleware/auth';
import { eq, desc } from 'drizzle-orm';
import { createRescueRequestSchema, updateRescueRequestStatusSchema } from '../../shared/api.ts';

const router = Router();

// POST /api/rescue-requests - Create a rescue request
router.post('/', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const validatedData = createRescueRequestSchema.parse(req.body);
    const newRequest = await db
      .insert(rescueRequests)
      .values({
        ...validatedData,
        userId: req.user!.userId,
        latitude: validatedData.latitude !== undefined ? String(validatedData.latitude) : null,
        longitude: validatedData.longitude !== undefined ? String(validatedData.longitude) : null,
      })
      .returning();
    res.status(201).json(newRequest[0]);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data for rescue request' });
  }
});

// GET /api/rescue-requests - List requests
router.get('/', authMiddleware, async (req: AuthRequest, res) => {
    if (req.user?.role === 'rescuer') {
        // Rescuers can see all requests
        const allRequests = await db.select().from(rescueRequests).orderBy(desc(rescueRequests.createdAt));
        return res.json(allRequests);
    } else {
        // Survivors can only see their own requests
        const userRequests = await db.select().from(rescueRequests).where(eq(rescueRequests.userId, req.user!.userId)).orderBy(desc(rescueRequests.createdAt));
        return res.json(userRequests);
    }
});

// PUT /api/rescue-requests/:id - Update request status (rescuers only)
router.put('/:id', authMiddleware, rescuerOnly, async (req: AuthRequest, res) => {
    try {
        const id = parseInt(req.params.id);
        const { status } = updateRescueRequestStatusSchema.parse(req.body);

        const updatedRequest = await db
            .update(rescueRequests)
            .set({ status, updatedAt: new Date() })
            .where(eq(rescueRequests.id, id))
            .returning();

        if (updatedRequest.length === 0) {
            return res.status(404).json({ error: 'Rescue request not found' });
        }
        res.json(updatedRequest[0]);
    } catch (error) {
        res.status(400).json({ error: 'Invalid status update data' });
    }
});

export default router;