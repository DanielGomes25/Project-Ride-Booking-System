import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function getAllRides(customer_id: string, driver_id?: number) {
  // Buscar as viagens do banco de dados
  const rides = await prisma.ride.findMany({
    where: {
      customer_id,
      ...(driver_id && { driver_id }), // Aplica filtro por motorista, se informado
    },
    include: {
      driver: true, // Inclui os dados do motorista
    },
    orderBy: {
      id: 'desc', // Ordena da mais recente para a mais antiga
    },
  });


  // Consolidar todas as viagens em um único array
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

  console.log('formatado', formattedRides);

  return formattedRides;
  
}