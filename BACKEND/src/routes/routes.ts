import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from 'fastify';

export async function routes(fastify: FastifyInstance, _options: FastifyPluginOptions) {
  fastify.get('/teste', async (_request: FastifyRequest, _reply: FastifyReply) => ({ hello: 'world' }));
}