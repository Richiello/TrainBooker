import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export const useSearchParams = (params: string[]): Record<string, string> => {
	const { search } = useLocation();
	const searchParams = new URLSearchParams(search);

	return useMemo(
		() =>
			params.reduce((accParams, param: string) => {
				accParams = { ...accParams, [param]: searchParams.get(param) };
				return accParams;
			}, {}),
		[],
	);
};
