import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function validateEstimateRequest(customer_id: string, origin: string, destination: string) {
  if (!customer_id || !origin || !destination) {
    return {
      error_code: "INVALID_DATA",
      error_description: "Customer ID, origin, and destination are required.",
    };
  }
  
  if (origin === destination) {
    return {
      error_code: "INVALID_DATA",
      error_description: "Origin and destination cannot be the same.",
    };
  }
  
  return null;
}



export async function validateRideRequest(customer_id: string, origin: string, destination: string, driver_id: number, distance: number) {
  if (!customer_id || !origin || !destination) {
    return {
      error_code: "INVALID_DATA",
      error_description: "Customer ID, origin, destination, and driver ID are required.",
    };
  }

  const findDriver = await prisma.driver.findUnique({
    where: {
      id: driver_id,
    },
  });

  console.log(findDriver);
  

  if (!findDriver) {
    return {
      error_code: "DRIVER_NOT_FOUND",
      error_description: "Driver not found.",
    };
    
  }

  if (findDriver.min_distance > distance) {
  
    return {   
      error_code: "INVALID_DISTANCE",
      error_description: "Driver not found.",
    };
  }
  
  if (origin === destination) {
    return {
      error_code: "INVALID_DATA",
      error_description: "Origin and destination cannot be the same.",
    };
  }
  
  return null;
}






export async function validateAllRequest(customer_id: string, driver_id: number) {
  if (!customer_id) {
    return {
      error_code: "INVALID_DATA",
      error_description: "Customer ID are required.",
    };
  }

  const findDriver = await prisma.driver.findUnique({
    where: {
      id: driver_id,
    },
  });


  if (!findDriver) {
    return {
      error_code: "INVALID_DRIVER",
      error_description: "Driver not found.",
    };
  }

  const findRide = await prisma.ride.findMany({
    where: {
      customer_id,
      driver_id: driver_id,
    },
  });

  if (findRide.length === 0) 
    return {
      error_code: "NO_RIDES_FOUND",
      error_description: "Rides not found.",
    };

 
  return null;
}
  
