import Fastify from "fastify";
import { kanbanRoutes } from "./routes/kanban";
import { userRoutes } from "./routes/user";
import cors from "@fastify/cors";
import {
  serializerCompiler,
  validatorCompiler,
} from "@fastify/type-provider-zod";
import jwt from "@fastify/jwt";
import dotenv from "dotenv";

dotenv.config();

export const app = Fastify({ logger: true });

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

const SECRET_KEY = process.env.SECRET_KEY;
if (!SECRET_KEY) {
  app.log.error("Environment variable SECRET_KEY is not set");
  process.exit(1);
}
app.register(jwt, { secret: SECRET_KEY, sign: { expiresIn: "7d" } });

app.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
});

app.register(kanbanRoutes);
app.register(userRoutes);

app.listen({ port: 3000, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`Server listening at ${address}`);
});
