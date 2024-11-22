import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";


export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.get("/ride/estimate", async (request: FastifyRequest, reply: FastifyReply) => {
    return { hello: "world" };
  });
}