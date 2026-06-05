import Fastify from 'fastify';
import {kanbanRoutes} from './routes/kanban';
import cors from '@fastify/cors';

export const app = Fastify({logger: true});

app.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
});
app.register(kanbanRoutes);

app.listen({port: 3000, host: '0.0.0.0'}, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`Server listening at ${address}`);
});