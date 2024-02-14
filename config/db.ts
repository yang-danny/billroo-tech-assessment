import * as dotenv from "dotenv";
import { Pool } from "pg";
dotenv.config();

const pool = new Pool({
    user: process.env.POSTGRES_USER as unknown as string,
    host: process.env.POSTGRES_HOST as string,
    database: process.env.POSTGRES_DB as string,
    password: process.env.POSTGRES_PASSWORD as unknown as string,
    port: process.env.POSTGRES_PORT as unknown as number, 
    ssl: true
  });

export default pool;