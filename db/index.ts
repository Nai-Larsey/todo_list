import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL!;

// Use a single connection for the pooler with prepared statements disabled
const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client, { schema });
