export interface ButtonProps {
	label: string;
	onClick?: () => void;
	variant?: 'contained' | 'outlined' | 'text';
	size?: 'large' | 'medium' | 'small';
	type?: 'submit' | 'button';
}
