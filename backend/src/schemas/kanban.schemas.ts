import { z } from "zod";

export const statusValues = ["todo", "in-progress", "done"] as const;

export const kanbanSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(255, "Title must be less than 255 characters"),
  description: z
    .string()
    .trim()
    .max(1000, "Description must be less than 1000 characters")
    .optional(),
  status: z
    .enum(statusValues)
    .refine((status) => statusValues.includes(status), {
      message: "Status must be one of: todo, in-progress, done",
    }),
  profile: z
    .string()
    .trim()
    .min(1, "Profile is required")
    .max(255, "Profile must be less than 255 characters"),
  userId: z
    .number()
    .int("User ID must be an integer")
    .positive("User ID must be a positive number"),
});

export const createKanbanSchema = kanbanSchema.omit({ status: true });

export const getKanbansByUserIdSchema = z.object({
  userId: z.coerce.number().int("User ID must be an integer").positive("User ID must be a positive integer"),
});

export const updateKanbanStatusSchema = z.object({
  status: z
    .enum(statusValues)
    .refine((status) => statusValues.includes(status), {
      message: "Status must be one of: todo, in-progress, done",
    }),
});

export const getKanbanByIdSchema = z.object({
  id: z.coerce.number().int("Kanban ID must be an integer").positive("Kanban ID must be a positive integer"),
});

export type CreateKanbanInput = z.infer<typeof createKanbanSchema>;
export type GetKanbansByUserIdInput = z.infer<typeof getKanbansByUserIdSchema>;
export type UpdateKanbanStatusInput = z.infer<typeof updateKanbanStatusSchema>;
export type GetKanbanByIdInput = z.infer<typeof getKanbanByIdSchema>;
