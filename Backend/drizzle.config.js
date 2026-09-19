import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  schema: "./src/models/*.js", // Path to your schema files
  out: "./drizzle",            // Output directory for SQL migrations
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});