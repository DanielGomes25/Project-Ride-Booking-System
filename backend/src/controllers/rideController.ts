import { FastifyRequest, FastifyReply } from "fastify";
import { RideData } from "../interfaces/rideInterface";
import { validateRideRequest } from "../middlewares/validation";
import { saveRide } from "../services/rideService";


class RideConfirmationController {
  async confirmeRide(request: FastifyRequest, reply: FastifyReply) { 

    const { customer_id ,origin, destination, distance, duration, driver, value}  = request.body as RideData;

    const validationError = await validateRideRequest(customer_id, origin, destination, driver.id, distance);
    
    if (validationError?.error_code == "INVALID_DATA") { 
      return reply.code(400).send(validationError);
    }

    if (validationError?.error_code == "DRIVER_NOT_FOUND") {
      return reply.code(404).send(validationError);
    }

    if (validationError?.error_code == "INVALID_DISTANCE") {
      return reply.code(406).send(validationError);
    }

    const result = await saveRide({ customer_id, origin, destination, distance, duration, driver, value });

    return reply.code(200).send(result);

  }
}


export { RideConfirmationController };