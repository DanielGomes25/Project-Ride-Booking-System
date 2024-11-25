import { FastifyRequest, FastifyReply } from "fastify";
import { EstimateRideService } from "../services/estimateRide";


const estimateController = async (request: FastifyRequest, reply: FastifyReply) => {
  
  { origin, destination } = request.body as { origin: string, destination: string };
    
   const estimateRideService = new EstimateRideService();
   const ride = await estimateRideService.execute({ origin, destination });
    
  reply.send(ride);
};
