import {AxiosError, AxiosRequestConfig} from 'axios';
import {api} from './api';
import {
  QueryFunctionContext,
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';

type QueryKeyT = [string, object | undefined];

type useFetchParams<T> = {
  url: string | null;
  params?: object;
  method?: 'GET' | 'POST';
  config?: UseQueryOptions<T, Error, T, QueryKeyT>;
  propegateSignal?: boolean;
};

export const fetcher = async <T>({queryKey, pageParam, signal}: QueryFunctionContext<QueryKeyT>): Promise<T> => {
  const [url, params] = queryKey;
  const res = await api.get<T>(url, {params: {...params, pageParam}, signal});
  return res.data;
};

export const useFetch = <T>({url, params = undefined, config}: useFetchParams<T>): UseQueryResult<T, Error> => {
  return useQuery<T, Error, T, QueryKeyT>(
    [url!, params],
    ({queryKey}) => fetcher({meta: undefined, pageParam: undefined, queryKey}),
    {
      enabled: !!url,
      retry: false,
      ...config,
    },
  );
};

export type UsePostVariables = {payload?: unknown; params?: object};

export const usePost = <T>({
  url,
  config,
}: {
  url: string;
  data?: unknown;
  config?: AxiosRequestConfig<T>;
}): UseMutationResult<T, AxiosError<T>, UsePostVariables> => {
  return useMutation<T, AxiosError<T>, UsePostVariables>({
    mutationFn: async ({payload, params}) => {
      const res = await api.post<T>(url, payload, {...config, params});
      return res.data;
    },
  });
};
