import prismaClient from "../prisma";
import { Ride } from "../interfaces/rideInterface";

class EstimateRideService {
  async execute({ origin, destination }: Ride) {
   
    if (!origin || !destination) {
      throw new Error('preencha os campos corretamente');
    }

    const ride = await prismaClient.ride.create({
      data: {
        origin,
        destination
      }
    });

    return ride;
  
  }
}

export { EstimateRideService };