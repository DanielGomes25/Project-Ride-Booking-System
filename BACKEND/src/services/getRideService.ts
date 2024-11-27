import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function getAllRides(customer_id: string, driver_id?: number) {
  
  const rides = await prisma.ride.findMany({
    where: {
      customer_id,
      ...(driver_id && { driver_id }), // Filtra por motorista, se `driver_id` for fornecido
    },
    include: {
      driver: true, 
    },
    orderBy: {
      id: 'desc', 
    },
  });

  const formattedRides = {
    customer_id,
    rides: rides.map((ride) => ({
      id: ride.id,
      date: ride.date, 
      origin: ride.origin,
      destination: ride.destination,
      distance: ride.distance,
      duration: ride.duration,
      driver: {
        id: ride.driver.id,
        name: ride.driver.name,
      },
      value: ride.value,
    })),
  };


  return formattedRides;
  
}