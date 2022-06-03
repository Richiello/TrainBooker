import dayjs from 'dayjs';

export const formatDate = (date: Date) => dayjs(date).format('YYYY-MM-DD');

export const currentDate = dayjs().format('YYYY-MM-DD');

export const validateDate = (date: string | null) => {
	if (date) {
		const regex = /^\d{4}\-\d{2}\-\d{2}$/;
		return date.match(regex);
	}
	return false;
};
