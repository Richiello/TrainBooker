import { client, q } from '../config/db';

interface TrainBookingInput {
	destination: string | null;
	startLocation: string;
	departure: string;
	return: string | null;
}

export interface ResponseData {
	[key: string]: any;
}

export const getAllTrainBookings = client
	.query(q.Paginate(q.Match(q.Ref('indexes/all_train_bookings'))))
	.then((response: ResponseData) => {
		const getAllDataQuery = response.data.map((res: ResponseData) => {
			return q.Get(res);
		});
		return client.query(getAllDataQuery).then((data: ResponseData) => data);
	})
	.catch((error: Error) => console.error('Error: ', error.message));

export const createTrainBooking = (
	trainBooking: TrainBookingInput,
): ResponseData =>
	client
		.query(
			q.Create(q.Collection('TrainBookings'), {
				data: {
					...trainBooking,
				},
			}),
		)
		.then((res: ResponseData) => {
			return { data: res.data, error: res.error };
		})
		.catch((error) => console.error('Error: ', error.message));
