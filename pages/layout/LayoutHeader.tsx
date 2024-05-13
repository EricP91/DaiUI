import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useGetUserInfo} from '../../api/auth';
import {useUserStore} from 'store/userInfo/userInfo.store';
import {PTopBar} from '@cellebrite/design-system';
import {ReactElement} from 'react';
import {getUserDisplayName} from '../components/get-user-display-name';

const LayoutHeader = (): ReactElement => {
  const {t} = useTranslation();
  const {data: userInfo, isLoading} = useGetUserInfo();
  const {setLoggedUser} = useUserStore();
  useEffect(() => {
    setLoggedUser(userInfo);
  }, [userInfo, setLoggedUser]);
  const userName = getUserDisplayName(userInfo);
  const userEmail = userInfo?.email || '';
  return (
    <>
      {!isLoading && (
        <PTopBar
          appName={t('layout.header.appName')}
          platformName={t('layout.header.platformName')}
          isLoggedIn
          userInfo={{
            userName,
            userEmail,
          }}
        />
      )}
    </>
  );
};

export default LayoutHeader;
