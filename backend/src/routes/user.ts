import { db } from "@/db";
import { users } from "@/db/schema/user";
import { FastifyInstance } from "fastify";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {
  LoginUserInput,
  loginUserSchema,
  RegisterUserInput,
  registerUserSchema,
} from "@/schemas/user.schemas";

export async function userRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>();

  app.post(
    "/register",
    {
      schema: {
        body: registerUserSchema,
      },
    },
    async (req, res) => {
      const { email, password, name } = req.body as RegisterUserInput;

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

      const token = await res.jwtSign({
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      });
      return res.status(201).send({ token });
    },
  );

  app.post(
    "/login",
    {
      schema: {
        body: loginUserSchema,
      },
    },
    async (req, res) => {
      const { email, password } = req.body as LoginUserInput;

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

      const token = await res.jwtSign({
        id: user.id,
        email: user.email,
        name: user.name,
      });
      return res.status(200).send({ token });
    },
  );
}
