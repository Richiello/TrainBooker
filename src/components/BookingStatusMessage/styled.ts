import styled from '@emotion/styled';
import type { BookingStatusType } from './types';

export const Message = styled.p<{ status: BookingStatusType }>`
	color: ${({ status }) => {
		switch (status) {
			case 'error':
				return '#952b39';
			case 'success':
			default:
				return '#547446';
		}
	}};
	font-size: 12px;
	font-style: italic;
`;
