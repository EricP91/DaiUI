import {User} from 'types/users';
import {create} from 'zustand';
import {devtools} from 'zustand/middleware';

export type UserState = {
  loggedUser?: User;
  setLoggedUser: (userInfo?: User) => void;
};

export const useUserStore = create<UserState>()(
  devtools((set) => ({
    loggedUser: undefined,
    setLoggedUser: (userInfo?: User) => {
      set((state: UserState) => ({...state, loggedUser: userInfo}));
    },
  })),
);
