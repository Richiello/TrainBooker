import { FormControlLabel, Radio as MUIRadio } from '@mui/material';
import type { RadioProps } from './types';

export const Radio = ({ value, label, size = 'small' }: RadioProps) => (
	<FormControlLabel
		key={value}
		value={value}
		control={<MUIRadio size={size} />}
		label={label}
	/>
);
