import { apiGet, apiPost } from '../../apiService';
import {
    type CreateReservation,
    type CreateReservationResponse,
    type LocationResponse,
    type OfferResponse,
} from '../types/booking';

export const getLocations = () => {
    try {
        return apiGet('/Locations/Locations') as LocationResponse[];
    } catch (error) {
        throw error;
    }
};

export const getOffers = (locationId: number) => {
    try {
        return apiGet(
            '/Availability/GetOffers?LocationId=' + locationId,
        ) as OfferResponse[];
    } catch (error) {
        throw error;
    }
};

export const createReservation = (data: CreateReservation) => {
    try {
        return apiPost(
            '/Reservations/CreateReservation',
            data,
        ) as CreateReservationResponse;
    } catch (error) {
        throw error;
    }
};
