export type DateType = null | Date | string;

export interface DatePickerProps {
  label: string;
  value: DateType;
  minDate: DateType;
  onChange: (newValue: DateType) => void;
  disabled?: boolean;
}
