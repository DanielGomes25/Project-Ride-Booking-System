import Fastify from "fastify";
// import cors from "@fastify/cors";


const app = Fastify({ logger: true });

const start = async () => {
  try {
    await app.listen({ port: 8080 });
    } catch (err) {
      process.exit(1);
    }
  }

start();