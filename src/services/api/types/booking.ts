interface Vehicle {
    modelName: string;
    sipp: string;
    imageLink: string;
}

interface Price {
    amount: number;
    currency: string;
}

export interface Vendor {
    name: string;
    imageLink: string;
}

interface Customer {
    name: string;
    surname: string;
}

export interface OfferResponse {
    offerUId: string;
    vehicle: Vehicle;
    price: Price;
    vendor: Vendor;
}

export interface LocationResponse {
    id: number;
    country: string;
    city: string;
    name: string;
}

export interface CreateReservation {
    offerUId: string;
    customer: Customer;
}

export interface CreateReservationResponse {
    confirmationNumber: string;
}
