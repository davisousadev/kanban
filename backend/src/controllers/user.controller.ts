import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { FastifyReply, FastifyRequest } from "fastify";
import bcrypt from "bcryptjs";
import {
  LoginUserInput,
  RegisterUserInput,
} from "@/schemas/user.schemas";

export const UserController = {
  async register(
    req: FastifyRequest<{ Body: RegisterUserInput }>,
    res: FastifyReply,
  ) {
    const { email, password, name } = req.body;

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

  async login(
    req: FastifyRequest<{ Body: LoginUserInput }>,
    res: FastifyReply,
  ) {
    const { email, password } = req.body;

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
};
