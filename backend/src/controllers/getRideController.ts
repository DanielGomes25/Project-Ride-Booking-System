import { FastifyRequest, FastifyReply } from "fastify";
import { validateAllRequest } from "../middlewares/validation";
import { getAllRides } from "../services/getRideService";



class getRideController {
  async getRides(request: FastifyRequest, reply: FastifyReply)  { 

    const { customer_id } = request.params as { customer_id: string };
    const { driver_id } = request.query as { driver_id?: string };

    const  convertedDriver = parseInt(driver_id || "0", 10);
   
    
    const validationError = await validateAllRequest(customer_id, convertedDriver);
       
    if (convertedDriver !== 0 && validationError?.error_code === "INVALID_DRIVER") {
      return reply.code(400).send(validationError);
    }

    if (validationError?.error_code === "NO_RIDES_FOUND") {
      return reply.code(404).send(validationError);
    }
  
   
    const rides = await getAllRides(customer_id, convertedDriver);

    reply.code(200).send(rides);
    

  }
}


export { getRideController };