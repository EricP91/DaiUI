import startCase from 'lodash-es/startCase';
import {User} from '../../types/users';

export const getUserDisplayName = (user?: User): string => {
  if (user?.firstName && user?.lastName) {
    return startCase(`${user?.firstName} ${user?.lastName}`);
  }
  return user?.id || '';
};
