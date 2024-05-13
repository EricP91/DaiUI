import {renderHook, act} from 'test-utils';
import {useUserStore} from './userInfo.store';

describe('useUserStore', () => {
  test('should set logged user', () => {
    const {result} = renderHook(() => useUserStore());

    act(() => {
      result.current.setLoggedUser({
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'mock@email.com',
        agencyName: 'agency',
      });
    });

    expect(result.current.loggedUser).toEqual({
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'mock@email.com',
      agencyName: 'agency',
    });
  });
});
