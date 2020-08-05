import { useLocation } from 'react-router';

export function useQueryParams(query: string[]) {
  const { search } = useLocation();
  const result: Record<string, string | null> = {};
  const params = new URLSearchParams(search);
  query.forEach((name) => {
    result[name] = params.get(name);
  });
  return result;
}
