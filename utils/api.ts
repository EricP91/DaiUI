import axios, {AxiosRequestConfig} from 'axios';

export const api = {
  get: <T>(url: string, params?: Record<string, unknown>) =>
    axios.get<T>(url, {
      ...params,
    }),
  post: <T>(url: string, data: unknown, config?: AxiosRequestConfig<T>) => axios.post<T>(url, data, config),
};
