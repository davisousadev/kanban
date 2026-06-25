import { db } from "@/db";
import { kanbans } from "@/db/schema";
import {
  CreateKanbanInput,
  GetKanbanByIdInput,
  UpdateKanbanStatusInput,
} from "@/schemas/kanban.schemas";
import { eq } from "drizzle-orm";
import { FastifyReply, FastifyRequest } from "fastify";

export const KanbanController = {
  async getKanbans(req: FastifyRequest, _res: FastifyReply) {
    const { id: userId } = req.user as { id: number };
    return db.query.kanbans.findMany({
      where: eq(kanbans.userId, userId),
    });
  },

  async createKanban(
    req: FastifyRequest<{ Body: CreateKanbanInput }>,
    res: FastifyReply,
  ) {
    const { title, description, profile, userId } = req.body;

    const [newKanban] = await db
      .insert(kanbans)
      .values({ title, description, profile, userId })
      .returning();
    res.status(201).send(newKanban);
  },

  async updateKanbanStatus(
    req: FastifyRequest<{
      Body: UpdateKanbanStatusInput;
      Params: GetKanbanByIdInput;
    }>,
    res: FastifyReply,
  ) {
    const { status } = req.body;
    const { id } = req.params;

    const [updatedKanban] = await db
      .update(kanbans)
      .set({ status })
      .where(eq(kanbans.id, Number(id)))
      .returning();
    res.status(200).send(updatedKanban);
  },

  async deleteKanban(
    req: FastifyRequest<{ Params: GetKanbanByIdInput }>,
    res: FastifyReply,
  ) {
    const { id } = req.params;

    await db.delete(kanbans).where(eq(kanbans.id, Number(id)));
    res.status(204).send();
  },
};
