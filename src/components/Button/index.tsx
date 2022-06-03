import { Button as MUIButton } from '@mui/material';
import type { ButtonProps } from './types';

export const Button = ({
	onClick,
	label,
	variant = 'contained',
	size = 'large',
	type = 'button',
}: ButtonProps) => (
	<MUIButton
		type={type}
		onClick={() => {
			if (!onClick) onClick;
			return;
		}}
		variant={variant}
		size={size}
	>
		{label}
	</MUIButton>
);
