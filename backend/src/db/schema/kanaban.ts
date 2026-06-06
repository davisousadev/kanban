import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const kanbans = pgTable("kanbans", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  profile: text("profile").notNull(),
  status: text("status", { enum: ["todo", "in-progress", "done"] })
    .notNull()
    .default("todo"),
});
