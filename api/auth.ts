import {apiRoutes} from 'utils/routes/api-routes';
import {useFetch} from '../utils/react-query';
import {UseQueryResult} from '@tanstack/react-query';
import {User} from '../types/users';

export const useGetUserInfo = (): UseQueryResult<User, Error> => {
  return useFetch<User>({url: apiRoutes.auth.getUserInfo, config: {retry: false}});
};
