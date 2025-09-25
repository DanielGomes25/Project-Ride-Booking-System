import { PrismaClient } from "@prisma/client";
import { fetchGoogleRoute } from "./mapsService";

const prisma = new PrismaClient();
const useMockDrivers = process.env.USE_MOCK_DRIVERS === "true";

const mockDrivers = [
  {
    id: 1,
    name: "Homer Simpson",
    description:
      "Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).",
    vehicle: "Plymouth Valiant 1973 rosa e enferrujado",
    rating: 2,
    comment: "Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.",
    rate_per_km: 2.5,
    min_distance: 1,
  },
  {
    id: 2,
    name: "Dominic Toretto",
    description:
      "Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.",
    vehicle: "Dodge Charger R/T 1970 modificado",
    rating: 4,
    comment:
      "Que viagem incrível! O carro é um show à parte e o motorista foi super gente boa. Recomendo!",
    rate_per_km: 5.0,
    min_distance: 5,
  },
  {
    id: 3,
    name: "James Bond",
    description:
      "Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.",
    vehicle: "Aston Martin DB5 clássico",
    rating: 5,
    comment:
      "Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico.",
    rate_per_km: 10.0,
    min_distance: 10,
  },
];

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

export async function getAvailableDrivers(distanceInKm: number) {
  if (useMockDrivers) {
    return mockDrivers
      .filter((d) => d.min_distance <= distanceInKm)
      .map((d) => ({
        id: d.id,
        name: d.name,
        description: d.description,
        vehicle: d.vehicle,
        review: { rating: d.rating, comment: d.comment },
        value: distanceInKm * d.rate_per_km,
      }))
      .sort((a, b) => a.value - b.value);
  }

  const drivers = await prisma.driver.findMany();
  const filterDrivers = drivers
    .filter((driver) => driver.min_distance <= distanceInKm)
    .map((driver) => ({
      id: driver.id,
      name: driver.name,
      description: driver.description,
      vehicle: driver.vehicle,
      review: {
        rating: driver.rating,
        comment: driver.comment,
      },
      value: distanceInKm * driver.rate_per_km,
    }))
    .sort((a, b) => a.value - b.value);

  return filterDrivers;
}
