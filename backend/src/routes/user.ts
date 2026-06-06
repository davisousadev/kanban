import { db } from "@/db";
import { users } from "@/db/schema/user";
import { FastifyInstance } from "fastify";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

export async function userRoutes(app: FastifyInstance) {
  app.post(
    "/register",
    {
      schema: {
        body: z.object({
          email: z.string().email(),
          password: z.string().min(6),
        }),
      },
    },
    async (req, res) => {
      const { email, password } = req.body as {
        email: string;
        password: string;
      };
      const [existingUser] = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      if (existingUser) {
        res.status(400).send({ error: "Email already in use" });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const [newUser] = await db
        .insert(users)
        .values({ email, password: hashedPassword })
        .returning();
        
      res.status(201).send({ id: newUser.id, email: newUser.email });
    },
  );
}
