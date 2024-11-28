import { PrismaClient } from "@prisma/client";
import { fetchGoogleRoute } from "./mapsService";

const prisma = new PrismaClient();

export async function calculateRoute(origin: string, destination: string) {
  const route = await fetchGoogleRoute(origin, destination);

  const { distance, duration, start_location, end_location } = route;

  return {
    start_location,
    end_location,
    distance: distance.text,
    duration: duration.text,

  };

}

export async function getAvailableDrivers(distanceInMeters: number) {
  const drivers = await prisma.driver.findMany();
  
  const filterDrivers = drivers
    .filter(driver => driver.min_distance <= distanceInMeters)
    .map(driver => ({
      id: driver.id,
      name: driver.name,
      description: driver.description,
      vehicle: driver.vehicle,
      review: {
        rating: driver.rating,
        comment: driver.comment,
      },
      value: distanceInMeters * driver.rate_per_km,
    }))
    .sort((a, b) => a.value - b.value);

  return filterDrivers;
}