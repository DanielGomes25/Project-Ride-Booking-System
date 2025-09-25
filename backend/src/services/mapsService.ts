import axios from "axios";

function hashSeed(text: string) {
  let h = 0;
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function mockLeg(origin: string, destination: string) {
  const s1 = hashSeed(origin);
  const s2 = hashSeed(destination);
  const distKm = 5 + ((s1 ^ s2) % 20); // 5–24 km
  const durationMin = Math.round(distKm * (3 + ((s1 + s2) % 4))); // 15–168 mins

  // São Paulo reference with small offsets based on seeds
  const baseLat = -23.55052;
  const baseLng = -46.633308;
  const start_location = {
    lat: baseLat + ((s1 % 100) - 50) / 5000,
    lng: baseLng + ((s2 % 100) - 50) / 5000,
  };
  const end_location = {
    lat: baseLat + ((s2 % 100) - 50) / 3000,
    lng: baseLng + ((s1 % 100) - 50) / 3000,
  };

  const leg = {
    start_address: origin,
    end_address: destination,
    start_location,
    end_location,
    distance: { text: `${distKm} km`, value: distKm * 1000 },
    duration: { text: `${durationMin} mins`, value: durationMin * 60 },
  } as const;

  return {
    ...leg,
    routeResponse: { status: "OK", routes: [{ legs: [leg], overview_polyline: { points: "" } }] },
  };
}

export async function fetchGoogleRoute(origin: string, destination: string) {
  if (process.env.USE_MOCK_ROUTES === "true") {
    return mockLeg(origin, destination);
  }

  const googleApiKey = process.env.GOOGLE_API_KEY;
  if (!googleApiKey) {
    throw new Error("Google API key is not configured (GOOGLE_API_KEY)");
  }

  const googleMapsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(
    origin
  )}&destination=${encodeURIComponent(destination)}&key=${googleApiKey}`;

  const { data } = await axios.get(googleMapsUrl);

  if (!data || data.status !== "OK" || !data.routes || data.routes.length === 0) {
    const status = data?.status ?? "UNKNOWN_ERROR";
    const message = data?.error_message ? ` - ${data.error_message}` : "";
    throw new Error(`Google Directions failed: ${status}${message}`);
  }

  const leg = data.routes[0]?.legs?.[0];
  if (!leg) {
    throw new Error("No route legs returned from Google Directions");
  }

  return {
    ...leg,
    routeResponse: data,
  };
}
