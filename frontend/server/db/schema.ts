// /frontend/server/db/schema.ts
import {
  pgTable,
  serial,
  varchar,
  integer,
  text,
  decimal,
  timestamp,
} from 'drizzle-orm/pg-core';
// relations import intentionally omitted (not used currently)

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).unique().notNull(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).notNull().default('survivor'), // 'survivor' or 'rescuer'
  createdAt: timestamp('created_at').defaultNow(),
});

export const warehouses = pgTable('warehouses', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  location: varchar('location', { length: 255 }).notNull(),
  latitude: decimal('latitude', { precision: 10, scale: 8 }),
  longitude: decimal('longitude', { precision: 11, scale: 8 }),
  createdAt: timestamp('created_at').defaultNow(),
});

export const resources = pgTable('resources', {
  id: serial('id').primaryKey(),
  type: varchar('type', { length: 100 }).notNull(),
  quantity: integer('quantity').notNull(),
  warehouseId: integer('warehouse_id').references(() => warehouses.id),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const disasterReports = pgTable('disaster_reports', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  whatHappened: text('what_happened').notNull(),
  location: varchar('location', { length: 255 }).notNull(),
  latitude: decimal('latitude', { precision: 10, scale: 8 }),
  longitude: decimal('longitude', { precision: 11, scale: 8 }),
  severity: varchar('severity', { length: 50 }).notNull(),
  occurredAt: timestamp('occurred_at').notNull(),
  status: varchar('status', { length: 50 }).default('pending'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const rescueRequests = pgTable('rescue_requests', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  location: varchar('location', { length: 255 }).notNull(),
  latitude: decimal('latitude', { precision: 10, scale: 8 }),
  longitude: decimal('longitude', { precision: 11, scale: 8 }),
  urgency: varchar('urgency', { length: 50 }).notNull(),
  peopleCount: integer('people_count').default(1),
  status: varchar('status', { length: 50 }).default('pending'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const resourceAllocations = pgTable('resource_allocations', {
  id: serial('id').primaryKey(),
  requestId: integer('request_id').references(() => rescueRequests.id),
  resourceId: integer('resource_id').references(() => resources.id),
  quantity: integer('quantity').notNull(),
  allocatedBy: integer('allocated_by').references(() => users.id),
  allocatedAt: timestamp('allocated_at').defaultNow(),
});
