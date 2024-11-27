import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from 'fastify';
import { EstimateController } from '../controllers/estimateController';
import { RideConfirmationController } from '../controllers/rideController';
import { getRideController } from '../controllers/getRideController';


export async function routes(fastify: FastifyInstance, _options: FastifyPluginOptions) {
  fastify.get('/ride/:customer_id', async (request: FastifyRequest, reply: FastifyReply) => (
    new getRideController().getRides(request, reply)
  ));

  fastify.post('/ride/estimate', async (request: FastifyRequest, reply: FastifyReply) => {

    return new EstimateController().handle(request, reply);
  });

  fastify.patch('/ride/confirm', async (request: FastifyRequest, reply: FastifyReply) => {
    return new RideConfirmationController().confirmeRide(request, reply);
  });
}