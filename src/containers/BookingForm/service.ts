import { createTrainBooking } from "../../api"
import { BookingStatusType } from "../../components"
import { TrainBooking, CreateBookingResponse } from "./types"


export const addTrainBooking = async (newTrainBooking: TrainBooking): Promise<BookingStatusType> => 
  await createTrainBooking({ ...newTrainBooking })
    .then(({data, error}: CreateBookingResponse) => {
      if(data) {
        return 'success'
      } else if (error) {
        return 'error'
      }
    })
    .catch(() => 'error')