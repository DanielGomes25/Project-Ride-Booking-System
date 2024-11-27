import { FastifyRequest, FastifyReply } from "fastify";
import { EstimateRequestBody } from "../interfaces/rideInterface";
import { validateEstimateRequest } from "../middlewares/validation";
import { calculateRoute , getAvailableDrivers } from "../services/driverService";
import { fetchGoogleRoute } from "../services/mapsService";


class EstimateController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { customer_id ,origin, destination } = request.body as EstimateRequestBody;

    const validationError = validateEstimateRequest(customer_id, origin, destination);

    if (validationError) {
      return reply.code(400).send(validationError);
    }
    
    // Calcular rota usando o Google Maps API
    const route = await fetchGoogleRoute(origin, destination);
    const routeData = await calculateRoute(origin, destination);
    const driveResult = parseFloat(routeData.distance.replace(' km',''));
    // Calcular motoristas disponíveis
    const drivers = await getAvailableDrivers(driveResult);
    
    
    return {
      origin: routeData.start_location,
      destination: routeData.end_location,
      distance: driveResult,
      duration: routeData.duration,
      options: drivers,
      routeResponse: route.routeResponse,
    };
    

  }
}


export { EstimateController };