import Fastify from 'fastify';
import {kanbanRoutes} from './routes/kanban';
import cors from '@fastify/cors';

export const app = Fastify({logger: true});

app.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});
app.register(kanbanRoutes);