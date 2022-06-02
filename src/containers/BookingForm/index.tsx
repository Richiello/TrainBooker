import { FormControl, Grid, RadioGroup } from '@mui/material';
import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { BookingStatusMessage, Button, DatePicker, Radio } from '../../components';
import type { BookingStatusType, DateType } from '../../components';
import { createTrainBooking } from '../../api';
import { formatDate, validateDate } from '../../helpers';
import { FormWrapper } from './styled'
import type { FormTypeValues, FormValues } from './types'
import { useSearchParams } from '../../hooks';

const initialFormValues: FormValues = {
  startLocation:  'Stockholm',
  destination: null,
  departure: formatDate(new Date()),
  return: formatDate(new Date()),
};

export const BookingForm = () => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [bookingType, setBookingType] = useState<FormTypeValues>('oneWay');
  const [bookingStatus, setBookingStatus] = useState<BookingStatusType | null>(null);
  
  const currentDate = new Date();
  const searchParams = useSearchParams(['departure', 'return'])

  const isOneWay = bookingType === 'oneWay';

  const updateFormState = useCallback(
    (newValues: Record<string, DateType>) =>
      setFormValues((values) => {
        return {
          ...values,
          destination: isOneWay ? null : 'Mexiko',
          departure: newValues.departure,
          return: isOneWay ? null : newValues.return
        };
      }),
    [],
  );

  useEffect(() => {
    setBookingStatus(null)
  }, [formValues]);

  useEffect(() => {
    setBookingStatus(null)
    if (validateDate(searchParams.departure)) {
      updateFormState({ departure: searchParams.departure });
    }
    if (validateDate(searchParams.return)) {
      updateFormState({ return: searchParams.return });
    }
  }, [searchParams, updateFormState]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBookingStatus(null);

    await createTrainBooking({ ...formValues  }).then((res: any) => {
      if(res?.data) {
        setBookingStatus('success')
      } else if (res?.error) {
        setBookingStatus('error')
      }
    }).catch((_) => setBookingStatus('error'))
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
              onChange={(e) =>
                setBookingType(e.target.value as FormTypeValues)
              }
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
                updateFormState({ departureDate: newValue })
              }
            />
          </Grid>
          <Grid item>
            <DatePicker
              label='Select return date'
              disabled={bookingType === 'oneWay'}
              minDate={formValues.departure}
              value={formValues.return}
              onChange={(newValue) => updateFormState({ return: newValue })}
            />
          </Grid>
          <Grid item>
            <Button type='submit' label='Book'/>
            {bookingStatus &&  <BookingStatusMessage bookingStatus={bookingStatus} />}
          </Grid>
        </Grid>
      </Grid>
    </FormWrapper>
  );
};
