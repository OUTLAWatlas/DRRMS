/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

// Validation Schemas
import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['survivor', 'rescuer']),
});


export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// RESCUE REQUEST SCHEMAS
export const createRescueRequestSchema = z.object({
  location: z.string().min(1),
  urgency: z.enum(['Low', 'Moderate', 'High', 'Critical']),
  peopleCount: z.number().int().positive().optional(),
  description: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export const updateRescueRequestStatusSchema = z.object({
  status: z.enum(['pending', 'in_progress', 'fulfilled', 'rejected']),
});

// RESOURCE & WAREHOUSE SCHEMAS
export const createResourceSchema = z.object({
  type: z.string().min(1),
  quantity: z.number().int().positive(),
  warehouseId: z.number().int().positive(),
});

export const createWarehouseSchema = z.object({
  name: z.string().min(1),
  location: z.string().min(1),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

// ALLOCATION SCHEMA
export const createAllocationSchema = z.object({
  requestId: z.number().int().positive(),
  resources: z.array(z.object({
    resourceId: z.number().int().positive(),
    quantity: z.number().int().positive(),
  })),
});
