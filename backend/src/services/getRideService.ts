import { PrismaClient } from '@prisma/client';
import { listRides } from '../mocks/memoryStore';

const prisma = new PrismaClient();
const useMockDB = process.env.USE_MOCK_DB === 'true';

export async function getAllRides(customer_id: string, driver_id?: number) {
  if (useMockDB) {
    const rides = listRides(customer_id, driver_id);
    return {
      customer_id,
      rides: rides.map((r) => ({
        id: r.id,
        date: r.date,
        origin: r.origin,
        destination: r.destination,
        distance: r.distance,
        duration: r.duration,
        driver: { id: r.driver.id, name: r.driver.name },
        value: r.value,
      })),
    };
  }

  const rides = await prisma.ride.findMany({
    where: {
      customer_id,
      ...(driver_id && { driver_id }),
    },
    include: { driver: true },
    orderBy: { id: 'desc' },
  });

  return {
    customer_id,
    rides: rides.map((ride) => ({
      id: ride.id,
      date: ride.date,
      origin: ride.origin,
      destination: ride.destination,
      distance: ride.distance,
      duration: ride.duration,
      driver: { id: ride.driver.id, name: ride.driver.name },
      value: ride.value,
    })),
  };
}
