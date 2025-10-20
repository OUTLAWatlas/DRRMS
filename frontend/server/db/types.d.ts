declare module 'pg' {
  import type { ClientConfig } from 'pg';
  export class Pool {
    constructor(cfg?: any);
    query: (sql: string, params?: any[]) => Promise<any>;
    connect: () => Promise<any>;
    end: () => Promise<void>;
  }
  export type PoolConfig = any;
}
