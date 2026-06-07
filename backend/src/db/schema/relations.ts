import { relations } from "drizzle-orm";
import { users } from "./user";
import { kanbans } from "./kanaban";

export const usersRelations = relations(users, ({many}) => ({
    kanbans: many(kanbans)
}))

export const kanbansRelations = relations(kanbans, ({one}) => ({
    user: one(users, {
        fields: [kanbans.userId],
        references: [users.id]
    })
}))