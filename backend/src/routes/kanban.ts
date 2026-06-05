import {FastifyInstance} from 'fastify';
import {db} from '@/db';
import {kanbans} from '@/db/schema';

export async function kanbanRoutes(app: FastifyInstance) {
    app.get('/kanban', async () => {
        return db.select().from(kanbans);
    });

    app.post('/kanban', async (req, res) => {
        const {title, description, profile} = req.body as {title: string; description?: string; profile: string};
        const [newKanban] = await db.insert(kanbans).values({title, description, profile}).returning();
        res.status(201).send(newKanban);
    })
}