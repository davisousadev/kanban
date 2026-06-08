import z from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name must be at most 100 characters long"),
  email: z.email("Invalid email address").trim(),
  password: z
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters long"),
});

export const registerUserSchema = userSchema;

export const loginUserSchema = userSchema.omit({ name: true });

export type RegisterUserInput = z.infer<typeof registerUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;
