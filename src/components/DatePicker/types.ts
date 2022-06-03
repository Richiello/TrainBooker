export interface DatePickerProps {
	label: string;
	value: string;
	minDate: string;
	onChange: (newValue: Date) => void;
	disabled?: boolean;
}
