import { TextField, TextFieldProps } from '@mui/material';
import { DatePicker as MUIDatePicker } from '@mui/x-date-pickers/DatePicker';
import type { DatePickerProps } from './types';

export const DatePicker = ({
  label,
  value,
  minDate,
  onChange,
  disabled = false,
}: DatePickerProps) => (
  <MUIDatePicker
    label={label}
    disabled={disabled}
    mask="____-__-__"
    value={value ?? new Date()}
    minDate={minDate}
    onChange={(newValue) => onChange(newValue)}
    inputFormat="yyyy-MM-dd"
    renderInput={(params: TextFieldProps) => (
      <TextField
        {...params}
        error={!disabled && params.error}
        helperText={!disabled && params.error ? 'Field is incorrect' : ''}
      />
    )}
  />
);
