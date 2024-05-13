import {UserOverview} from 'types/dashboard/user-overview';
import {UserDataCount} from './user-data-count';

export interface DashboardOverview {
  userOverview: UserOverview;
  countUserData: UserDataCount;
}
