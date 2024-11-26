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