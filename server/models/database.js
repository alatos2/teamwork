import Debug from 'debug';
import { Pool } from 'pg';
import dotenv from 'dotenv';

const debug = Debug('http');
dotenv.config();

let DATABASE_URL;

if (process.env.NODE_ENV === 'TEST') {
  DATABASE_URL = process.env.DATABASE_TEST_URL;
} else {
  DATABASE_URL = process.env.DATABASE_DEV_URL;
}

const pool = new Pool({ connectionString: DATABASE_URL });

pool.on('connect', () => { debug('connected to the database'); });

export default pool;
