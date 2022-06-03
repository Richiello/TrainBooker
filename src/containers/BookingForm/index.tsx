import { FormControl, Grid, RadioGroup } from '@mui/material';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import {
	BookingStatusMessage,
	Button,
	DatePicker,
	Radio,
} from '../../components';
import type { BookingStatusType } from '../../components';
import { currentDate, formatDate, validateDate } from '../../helpers';
import { FormWrapper } from './styled';
import type { FormTypeValues, TrainBooking } from './types';
import { useSearchParams } from '../../hooks';
import { addTrainBooking } from './service';

const initialFormValues: TrainBooking = {
	startLocation: 'Stockholm',
	destination: null,
	departure: formatDate(new Date()),
	return: formatDate(new Date()),
};

export const BookingForm = () => {
	const [bookingStatus, setBookingStatus] = useState<BookingStatusType | null>(
		null,
	);
	const [bookingType, setBookingType] = useState<FormTypeValues>('oneWay');
	const [formValues, setFormValues] = useState<TrainBooking>(initialFormValues);

	const { departure, return: returnDate } = useSearchParams([
		'departure',
		'return',
	]);

	const updateFormState = useCallback(
		(newValues: Record<string, string>) =>
			setFormValues((values) => {
				return {
					...values,
					...newValues,
					destination: bookingType === 'oneWay' ? '' : 'Mexiko',
				};
			}),
		[bookingType],
	);

	useEffect(() => {
		setBookingStatus(null);
	}, [formValues]);

	useEffect(() => {
		setBookingStatus(null);
		if (validateDate(departure)) {
			updateFormState({ departure: departure });
		}
		if (validateDate(returnDate)) {
			updateFormState({ return: returnDate });
		}
	}, [returnDate, departure, updateFormState]);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setBookingStatus(null);

		const response = await addTrainBooking({ ...formValues });
		setBookingStatus(response);
	};

	return (
		<FormWrapper onSubmit={handleSubmit}>
			<Grid
				container
				flexDirection='column'
				justifyContent='center'
				spacing={4}
			>
				<Grid item>
					<FormControl>
						<RadioGroup
							row
							name='type'
							value={bookingType}
							onChange={(e) => setBookingType(e.target.value as FormTypeValues)}
						>
							<Radio value='oneWay' label='One way' />
							<Radio value='return' label='Return' />
						</RadioGroup>
					</FormControl>
				</Grid>
				<Grid item container flexDirection='column' spacing={2}>
					<Grid item>
						<DatePicker
							label='Select departure date'
							value={formValues.departure}
							minDate={currentDate}
							onChange={(newValue) =>
								updateFormState({ departure: formatDate(newValue) })
							}
						/>
					</Grid>
					<Grid item>
						<DatePicker
							label='Select return date'
							disabled={bookingType === 'oneWay'}
							minDate={formValues.departure}
							value={formValues.return}
							onChange={(newValue) =>
								updateFormState({ return: formatDate(newValue) })
							}
						/>
					</Grid>
					<Grid item>
						<Button type='submit' label='Book' />
						{bookingStatus && (
							<BookingStatusMessage bookingStatus={bookingStatus} />
						)}
					</Grid>
				</Grid>
			</Grid>
		</FormWrapper>
	);
};
