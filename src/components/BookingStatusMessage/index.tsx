import { Message } from './styled';
import type { BookingStatusMessageProps } from './types';

export const BookingStatusMessage = ({bookingStatus}: BookingStatusMessageProps) => {
 const getMessage = () => { switch (bookingStatus) {
  case 'error':
    return 'Oh no! Something went wrong while booking your ticket!'
  case 'success':
    default:
    return 'Hurray! Your train ticket is booked!'
 }}

  return (
    <Message status={bookingStatus}>{getMessage()}</Message>
  );
};
