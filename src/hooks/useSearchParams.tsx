import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export const useSearchParams = (params: string[]): Record<string, string> => {
  const { search } = useLocation();

  return useMemo(() => {
    const searchParams = new URLSearchParams(search);
    return params.reduce((accParams, param: string) => {
      accParams = ({...accParams, [param]: searchParams.get(param)});
      return accParams;
    }, {});
  }, [ search, params ]);
}