import {FastifyInstance} from 'fastify';
import {db} from '@/db';
import {kanbans} from '@/db/schema';
import {eq} from "drizzle-orm";

export async function kanbanRoutes(app: FastifyInstance) {
    app.get('/kanban', async () => {
        return db.select().from(kanbans);
    });

    app.post('/kanban', async (req, res) => {
        const {title, description, profile} = req.body as {title: string; description?: string; profile: string};
        if (!title || !profile) {
            res.status(400).send({error: "Title and profile are required"});
            return;
        }
        const [newKanban] = await db.insert(kanbans).values({title, description, profile}).returning();
        res.status(201).send(newKanban);
    })

    app.patch('/kanban/:id', async (req, res) => {
        const {status} = req.body as {status:  "todo" | "in-progress" | "done"};
        const {id} = req.params as {id: string};
        if (!["todo", "in-progress", "done"].includes(status)) {
            res.status(400).send({error: "Invalid status value"});
            return;
        }
        if (isNaN(Number(id))) {
            res.status(400).send({error: "Invalid ID"});
            return;
        }
        const [updatedKanban] = await db.update(kanbans).set({status}).where(eq(kanbans.id, Number(id))).returning();
        res.status(200).send(updatedKanban);
    })

    app.delete('/kanban/:id', async (req, res) => {
        const {id} = req.params as {id: string};
        if (isNaN(Number(id))) {
            res.status(400).send({error: "Invalid ID"});
            return;
        }
        await db.delete(kanbans).where(eq(kanbans.id, Number(id)));
        res.status(204).send();
    });
}