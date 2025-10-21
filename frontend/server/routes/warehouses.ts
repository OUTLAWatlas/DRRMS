// /frontend/server/routes/warehouses.ts
import { Router } from 'express';
import { db } from '../db';
import { warehouses, resources } from '../db/schema';
import { authMiddleware, rescuerOnly } from '../middleware/auth';
import { eq } from 'drizzle-orm';
import { createWarehouseSchema, createResourceSchema } from '../../shared/api.ts';

const router = Router();

// --- Warehouse Routes ---

// GET /api/warehouses - List all warehouses
router.get('/', authMiddleware, async (_req, res) => {
    const allWarehouses = await db.select().from(warehouses);
    res.json(allWarehouses);
});

// POST /api/warehouses - Create a new warehouse (rescuers only)
router.post('/', authMiddleware, rescuerOnly, async (req, res) => {
    try {
        const validatedData = createWarehouseSchema.parse(req.body);
                const newWarehouse = await db.insert(warehouses).values({
                    ...validatedData,
                    latitude: validatedData.latitude !== undefined ? String(validatedData.latitude) : null,
                    longitude: validatedData.longitude !== undefined ? String(validatedData.longitude) : null,
                }).returning();
        res.status(201).json(newWarehouse[0]);
    } catch (error) {
        res.status(400).json({ error: 'Invalid warehouse data' });
    }
});

// --- Resource Routes (nested under warehouses for simplicity) ---

// GET /api/warehouses/:id/inventory - Get a warehouse's inventory
router.get('/:id/inventory', authMiddleware, async (req, res) => {
    const warehouseId = parseInt(req.params.id);
    const inventory = await db.select().from(resources).where(eq(resources.warehouseId, warehouseId));
    res.json(inventory);
});

// POST /api/warehouses/resources - Add a new resource (rescuers only)
router.post('/resources', authMiddleware, rescuerOnly, async (req, res) => {
    try {
        const validatedData = createResourceSchema.parse(req.body);
                const newResource = await db.insert(resources).values({
                    ...validatedData,
                    // If resource schema ever includes latitude/longitude, convert here
                }).returning();
        res.status(201).json(newResource[0]);
    } catch (error) {
        res.status(400).json({ error: 'Invalid resource data' });
    }
});

export default router;