import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { routes } from './routes/routes';

const app = Fastify({ logger: true });

const start = async () => {
  
  await app.register(routes);
  await app.register(cors);

  try {
    await app.listen({ port: 8080, host: '0.0.0.0' });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }

  console.log('Server listening');

};

start();  
