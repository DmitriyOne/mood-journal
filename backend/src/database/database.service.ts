import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TEnvConfig } from '../schema';
import { Pool, QueryResult, QueryResultRow } from 'pg';
import { ENodeEnv } from '../enums';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DatabaseService.name);
  private pool: Pool;

  constructor(private readonly configService: ConfigService<TEnvConfig>) {
    const DATABASE_URL = this.configService.get<string>('DATABASE_URL');
    const NODE_ENV = this.configService.get<ENodeEnv>('NODE_ENV');

    this.pool = new Pool({
      connectionString: DATABASE_URL,
      ssl: NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    });
  }

  async onModuleInit() {
    try {
      await this.pool.query('SELECT 1');
      this.logger.log('Successfully connected to the database');
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error("Couldn't connect to the database" + error.message);
      } else {
        console.log("Couldn't connect to the database");
      }
    }
  }

  async onModuleDestroy() {
    this.logger.log('The application is shutting down!');
    await this.pool.end();
  }

  async query<T extends QueryResultRow = any>(
    queryText: string,
    params?: any[],
  ): Promise<QueryResult<T>> {
    return this.pool.query<T>(queryText, params);
  }

  async queryRows<T extends QueryResultRow = any>(
    queryText: string,
    params?: any[],
  ): Promise<T[]> {
    const result = await this.query<T>(queryText, params);
    return result.rows;
  }

  async queryOne<T extends QueryResultRow = any>(
    queryText: string,
    params?: any[],
  ): Promise<T | null> {
    const rows = await this.queryRows<T>(queryText, params);
    return rows[0] ?? null;
  }
}
