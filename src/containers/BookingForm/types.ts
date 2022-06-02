import type { DateType } from '../../components';

export type FormTypeValues = 'oneWay' | 'return';

export interface FormValues {
  startLocation: string;
  departure: DateType;
  return: DateType;
  destination: string | null;
}

export type BookingStatusType = 'success' | 'error';
