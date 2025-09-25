export type MemoryRide = {
  id: number;
  date: Date;
  customer_id: string;
  origin: string;
  destination: string;
  distance: number; // km
  duration: string;
  value: number;
  driver: { id: number; name: string };
};

const rides: MemoryRide[] = [];
let nextId = 1;

export function addRide(ride: Omit<MemoryRide, "id" | "date">) {
  const stored: MemoryRide = { id: nextId++, date: new Date(), ...ride };
  rides.push(stored);
  return stored;
}

export function listRides(customer_id: string, driver_id?: number) {
  return rides
    .filter((r) => r.customer_id === customer_id)
    .filter((r) => (driver_id ? r.driver.id === driver_id : true))
    .sort((a, b) => b.id - a.id);
}

export function clearAll() {
  rides.length = 0;
  nextId = 1;
}

