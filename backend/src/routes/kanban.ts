import { FastifyInstance } from "fastify";
import { db } from "@/db";
import { kanbans } from "@/db/schema/kanaban";
import { eq } from "drizzle-orm";

export async function kanbanRoutes(app: FastifyInstance) {
  app.addHook("preHandler", async (req, _res) => {
    await req.jwtVerify();
  });

  app.get("/kanban", async (req) => {
    const { id: userId } = req.user as { id: number };
    return db.query.kanbans.findMany({
      where: eq(kanbans.userId, userId),
    })
  });

  app.post("/kanban", async (req, res) => {
    const { title, description, profile, userId } = req.body as {
      title: string;
      description?: string;
      profile: string;
      userId: number;
    };
    if (!title || !profile || !userId) {
      res.status(400).send({ error: "Title, profile, and userId are required" });
      return;
    }
    const [newKanban] = await db
      .insert(kanbans)
      .values({ title, description, profile, userId })
      .returning();
    res.status(201).send(newKanban);
  });

  app.patch("/kanban/:id", async (req, res) => {
    const { status } = req.body as { status: "todo" | "in-progress" | "done" };
    const { id } = req.params as { id: string };
    if (!["todo", "in-progress", "done"].includes(status)) {
      res.status(400).send({ error: "Invalid status value" });
      return;
    }
    if (isNaN(Number(id))) {
      res.status(400).send({ error: "Invalid ID" });
      return;
    }
    const [updatedKanban] = await db
      .update(kanbans)
      .set({ status })
      .where(eq(kanbans.id, Number(id)))
      .returning();
    res.status(200).send(updatedKanban);
  });

  app.delete("/kanban/:id", async (req, res) => {
    const { id } = req.params as { id: string };
    if (isNaN(Number(id))) {
      res.status(400).send({ error: "Invalid ID" });
      return;
    }
    await db.delete(kanbans).where(eq(kanbans.id, Number(id)));
    res.status(204).send();
  });
}
