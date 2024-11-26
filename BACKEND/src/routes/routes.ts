import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from 'fastify';
import { EstimateController } from '../controllers/estimateController';


export async function routes(fastify: FastifyInstance, _options: FastifyPluginOptions) {
  fastify.get('/teste', async (_request: FastifyRequest, _reply: FastifyReply) => (
    { hello: 'world' }
  ));

  fastify.post('/ride/estimate', async (request: FastifyRequest, reply: FastifyReply) => {

    return new EstimateController().handle(request, reply);
  });
}