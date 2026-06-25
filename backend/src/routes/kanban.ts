import { FastifyInstance } from "fastify";
import {
  createKanbanSchema,
  getKanbanByIdSchema,
  updateKanbanStatusSchema,
} from "@/schemas/kanban.schemas";
import { KanbanController } from "@/controllers/kanban.controller";

export async function kanbanRoutes(app: FastifyInstance) {

  app.addHook("preHandler", async (req, _res) => {
    await req.jwtVerify();
  });

  app.get("/kanban", KanbanController.getKanbans);

  app.post(
    "/kanban",
    {
      schema: {
        body: createKanbanSchema,
      },
    },
    KanbanController.createKanban,
  );

  app.patch(
    "/kanban/:id",
    {
      schema: {
        body: updateKanbanStatusSchema,
        params: getKanbanByIdSchema,
      },
    },
    KanbanController.updateKanbanStatus,
  );

  app.delete(
    "/kanban/:id",
    {
      schema: {
        params: getKanbanByIdSchema,
      },
    },
    KanbanController.deleteKanban,
  );
}
