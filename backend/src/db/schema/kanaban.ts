import { integer } from "drizzle-orm/pg-core";
import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { users } from "./user";

export const kanbans = pgTable("kanbans", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  profile: text("profile").notNull(),
  status: text("status", { enum: ["todo", "in-progress", "done"] })
    .notNull()
    .default("todo"),
  userId: integer('user_id').notNull().references(() => users.id),
});
