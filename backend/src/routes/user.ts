import { FastifyInstance } from "fastify";
import {
  loginUserSchema,
  registerUserSchema,
} from "@/schemas/user.schemas";
import { UserController } from "@/controllers/user.controller";

export async function userRoutes(app: FastifyInstance) {

  app.post(
    "/register",
    {
      schema: {
        body: registerUserSchema,
      },
    },
    UserController.register,
  );

  app.post(
    "/login",
    {
      schema: {
        body: loginUserSchema,
      },
    },
    UserController.login
  );
}
