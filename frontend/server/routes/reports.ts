// /frontend/server/routes/reports.ts
import { Router } from 'express';
import { db } from '../db';
import { disasterReports } from '../db/schema';
import { authMiddleware, AuthRequest, rescuerOnly } from '../middleware/auth';
import { eq, desc } from 'drizzle-orm';
import { z } from 'zod';

const router = Router();

const createReportSchema = z.object({
  whatHappened: z.string().min(1),
  location: z.string().min(1),
  severity: z.enum(['Low', 'Moderate', 'High', 'Critical']),
  occurredAt: z.string().datetime(),
});

// Create a report
router.post('/', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const validatedData = createReportSchema.parse(req.body);
    const occurredDate = new Date(validatedData.occurredAt);
    const newReport = await db
      .insert(disasterReports)
      .values({
        userId: req.user!.userId,
        whatHappened: validatedData.whatHappened,
        location: validatedData.location,
        severity: validatedData.severity,
        occurredAt: occurredDate,
      })
      .returning();
    res.status(201).json(newReport[0]);
  } catch (error) {
    res.status(400).json({ error: 'Invalid report data' });
  }
});

// Get all reports (rescuers only)
router.get('/', authMiddleware, rescuerOnly, async (_req, res) => {
  const reports = await db.select().from(disasterReports).orderBy(desc(disasterReports.createdAt));
  res.json(reports);
});

// Get a single report
router.get('/:id', authMiddleware, async (req, res) => {
    const id = parseInt(req.params.id);
    const report = await db.select().from(disasterReports).where(eq(disasterReports.id, id));
    if (report.length === 0) {
        return res.status(404).json({ error: 'Report not found' });
    }
    res.json(report[0]);
});

export default router;
