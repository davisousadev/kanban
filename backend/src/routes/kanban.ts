import { FastifyInstance } from "fastify";
import { db } from "@/db";
import { kanbans } from "@/db/schema/kanaban";
import { eq } from "drizzle-orm";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {
  CreateKanbanInput,
  createKanbanSchema,
  GetKanbanByIdInput,
  getKanbanByIdSchema,
  getKanbansByUserIdSchema,
  UpdateKanbanStatusInput,
  updateKanbanStatusSchema,
} from "@/schemas/kanban.schemas";

export async function kanbanRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>();

  app.addHook("preHandler", async (req, _res) => {
    await req.jwtVerify();
  });

  app.get(
    "/kanban",
    async (req) => {
      const { id: userId } = req.user as { id: number };
      return db.query.kanbans.findMany({
        where: eq(kanbans.userId, userId),
      });
    },
  );

  app.post(
    "/kanban",
    {
      schema: {
        body: createKanbanSchema,
      },
    },
    async (req, res) => {
      const { title, description, profile, userId } =
        req.body as CreateKanbanInput;

      const [newKanban] = await db
        .insert(kanbans)
        .values({ title, description, profile, userId })
        .returning();
      res.status(201).send(newKanban);
    },
  );

  app.patch(
    "/kanban/:id",
    {
      schema: {
        body: updateKanbanStatusSchema,
        params: getKanbanByIdSchema,
      },
    },
    async (req, res) => {
      const { status } = req.body as UpdateKanbanStatusInput;
      const { id } = req.params as GetKanbanByIdInput;

      const [updatedKanban] = await db
        .update(kanbans)
        .set({ status })
        .where(eq(kanbans.id, Number(id)))
        .returning();
      res.status(200).send(updatedKanban);
    },
  );

  app.delete(
    "/kanban/:id",
    {
      schema: {
        params: getKanbanByIdSchema,
      },
    },
    async (req, res) => {
      const { id } = req.params as GetKanbanByIdInput;

      await db.delete(kanbans).where(eq(kanbans.id, Number(id)));
      res.status(204).send();
    },
  );
}
