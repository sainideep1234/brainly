import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./model";

const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle(sql, { schema });

export default schema;
