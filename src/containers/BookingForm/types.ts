export type FormTypeValues = 'oneWay' | 'return';

export interface TrainBooking {
  startLocation: string;
  departure: string;
  return: string;
  destination: string | null;
}

export type BookingStatusType = 'success' | 'error';

export interface CreateBookingResponse {
  data: TrainBooking, 
  error: Error
}
