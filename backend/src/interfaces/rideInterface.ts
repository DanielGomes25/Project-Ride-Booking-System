export interface Ride {
    customer_id: number;
    origin: string;
    destination: string;
}


type EstimateRequestBody = {
    customer_id: string;
    origin: string;
    destination: string;
}

interface RideData {
    customer_id: string;
    origin: string;
    destination: string;
    distance: number;
    duration: string;
    driver: {
      id: number;
      name: string;
    };
    value: number;
  }
  

interface RideList {
  
    customer_id: string,
    rides: [
    {
    id: number,
    date: Date,
    origin: string,
    destination: string,
    distance: number,
    duration: string,
    driver: {
    id: number,
    name: string
    },
    value: number
  }
    ]
    
}

export { EstimateRequestBody, RideData, RideList };