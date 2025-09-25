import { RideData } from "../interfaces/rideInterface";
import { PrismaClient } from "@prisma/client";
import { addRide } from "../mocks/memoryStore";

const prisma = new PrismaClient();
const useMockDB = process.env.USE_MOCK_DB === "true";


export async function saveRide(RideData: RideData) {
  const { customer_id, origin, destination, distance, duration, driver, value } = RideData;

  if (useMockDB) {
    addRide({
      customer_id,
      origin,
      destination,
      distance,
      duration,
      value,
      driver: { id: driver.id, name: driver.name },
    });
    return { success: true };
  }

  let customer = await prisma.customer.findUnique({ where: { id: customer_id } });

  if (!customer) {
    customer = await prisma.customer.create({ data: { id: customer_id } });
  }

  try {
    await prisma.ride.create({
      data: {
        customer_id,
        origin,
        destination,
        distance,
        duration,
        value,
        driver_id: driver.id,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error while saving ride:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred while saving the ride.",
    };
  }
}

  
