import axios from "axios";

export async function fetchGoogleRoute(origin: string, destination: string) {
  const googleApiKey = process.env.GOOGLE_API_KEY;
  const googleMapsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(
    origin
  )}&destination=${encodeURIComponent(destination)}&key=${googleApiKey}`;

  const response = await axios.get(googleMapsUrl);


  return {
    ...response.data.routes[0].legs[0],
    routeResponse: response.data
  };

};

