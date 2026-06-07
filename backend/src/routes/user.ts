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
          email: z.email(),
          password: z.string().min(6),
          name: z.string().min(2).max(100),
        }),
      },
    },
    async (req, res) => {
      const { email, password, name } = req.body as {
        email: string;
        password: string;
        name: string;
      };

      if (!email || !password || !name) {
        res.status(400).send({ message: "Email, password, and name are required" });
        return;
      }

      if (password.length < 6) {
        res
          .status(400)
          .send({ message: "Password must be at least 6 characters long" });
        return;
      }

      const [existingUser] = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);
      if (existingUser) {
        res.status(400).send({ message: "Email already in use" });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const [newUser] = await db
        .insert(users)
        .values({ email, password: hashedPassword, name })
        .returning();

      const token = await res.jwtSign({ id: newUser.id, email: newUser.email, name: newUser.name });
      return { token };
    },
  );

  app.post(
    "/login",
    {
      schema: {
        body: z.object({
          email: z.email(),
          password: z.string().min(6),
        }),
      },
    },
    async (req, res) => {
      const { email, password } = req.body as {
        email: string;
        password: string;
      };

      if (!email || !password) {
        res.status(400).send({ message: "Email and password are required" });
        return;
      }

      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      if (!user) {
        res.status(400).send({ message: "Invalid email or password" });
        return;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(400).send({ message: "Invalid email or password" });
        return;
      }

      const token = await res.jwtSign({id: user.id, email: user.email, name: user.name});
      return { token };
    },
  );
}
