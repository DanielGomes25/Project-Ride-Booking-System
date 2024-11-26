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

export { EstimateRequestBody };