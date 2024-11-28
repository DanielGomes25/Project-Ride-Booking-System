import { RideData } from "../interfaces/rideInterface";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function saveRide(RideData: RideData) {
  const { customer_id, origin, destination, distance, duration, driver, value } = RideData;
  
  let customer = await prisma.customer.findUnique({
    where: { id: customer_id },
  });
  
  if (!customer) {
    customer = await prisma.customer.create({
      data: {
        id: customer_id,
      },
    });
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
        driver_id:              
            driver.id
      }
    });
  
    return {
      success: true,
    };
  
  } catch (error) {
    console.error("Error while saving ride:", error);
  
    return {
      success: false,
      error: (error instanceof Error ? error.message : "An error occurred while saving the ride.")
    };
  }
}

  
