import { DateType } from '../components';
import { client, q } from '../config/db';

interface TrainBookingInput {
  destination: string | null;
  startLocation: string;
  departure: DateType;
  return: DateType | null;
}

export const getAllTrainBookings = client
  .query(q.Paginate(q.Match(q.Ref('indexes/all_train_bookings'))))
  .then((response: any) => {
    const getAllDataQuery = response.data.map((res: any) => {
      return q.Get(res);
    });
    return client.query(getAllDataQuery).then((data: any) => data);
  })
  .catch((error: Error) => console.error('Error: ', error.message));

export const createTrainBooking = (trainBooking: TrainBookingInput) =>
  client
    .query(
      q.Create(q.Collection('TrainBookings'), {
        data: {
          ...trainBooking
        }
      })
    )
    .then(ret => ret)
    .catch(error => console.error('Error: ', error.message));
