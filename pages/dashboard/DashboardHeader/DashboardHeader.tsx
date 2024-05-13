import {styled} from '@mui/system';
import {MenuItem, Stack, Typography} from '@mui/material';
import {useTranslation} from 'react-i18next';

import {
  CheckoutIcon,
  CoverImage,
  MButton,
  MenuButton,
  MoveIcon,
  PendingSubmissionIcon,
  ReceiveIcon,
  ScanIcon,
} from '@cellebrite/design-system';
import {useRef} from 'react';
import {useGetUserInfo} from 'api/auth';
import {getUserDisplayName} from 'pages/components/get-user-display-name';
import {pageRoutes} from 'utils/routes/page-routes';
import {useHistory} from 'react-router-dom';
import {SIDEBAR_WIDTH, TOPBAR_HEIGHT} from 'types/layout';

const CoverImageContainerStyled = styled('div')(() => ({
  width: `calc(100% + ${SIDEBAR_WIDTH}px)`,
  overflowX: 'hidden',
  position: 'absolute',
  top: `-${TOPBAR_HEIGHT}px`,
  left: `-${SIDEBAR_WIDTH}px`,
  zIndex: -1,
}));

const AgencyNameStyled = styled(Typography)(({theme}) => ({
  display: 'block',
  marginBottom: theme.spacing(0.86),
}));

const ButtonContainerStyled = styled('div')(() => ({
  display: 'inline-grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridTemplateRows: 'repeat(3, 1fr)',
  gap: 8,
  height: 30,
  alignSelf: 'center',
  '& svg': {
    width: '100%',
  },
}));

const DashboardHeader = (): JSX.Element => {
  const {t} = useTranslation();
  const history = useHistory();

  const menuButtonRef = useRef<{handleClose: () => void}>();
  const onMenuItemClick = (): void => {
    menuButtonRef.current?.handleClose();
  };

  const {data: userInfo} = useGetUserInfo();
  const {agencyName} = userInfo || {agencyName: ''};
  const fullName = getUserDisplayName(userInfo);
  const onScanEvidenceItemClick = (): void => {
    history.push(pageRoutes.receiveSubmission.scanEvidence);
    menuButtonRef.current?.handleClose();
  };

  return (
    <div>
      <CoverImageContainerStyled data-testid="cover-image-container">
        <CoverImage />
      </CoverImageContainerStyled>
      <Stack direction="row" alignContent="center">
        <Stack flexGrow={1}>
          <AgencyNameStyled variant="textMedium">{`${t(
            'dashboard.header.agencyName',
          )}: ${agencyName}`}</AgencyNameStyled>
          <Typography variant="xxLargeBold">{`${t('dashboard.header.hello')}, ${fullName}`}</Typography>
        </Stack>
        <ButtonContainerStyled>
          <MButton startIcon={<MoveIcon />} variant="outlined">
            {t('common.move')}
          </MButton>
          <MButton startIcon={<CheckoutIcon />} variant="outlined">
            {t('common.checkout')}
          </MButton>
          <MenuButton ref={menuButtonRef} buttonText={t('common.receive')} buttonProps={{startIcon: <ReceiveIcon />}}>
            <MenuItem onClick={onMenuItemClick} disableRipple>
              <PendingSubmissionIcon />
              {t('common.viewPendingAndReceive')}
            </MenuItem>
            <MenuItem onClick={onScanEvidenceItemClick} disableRipple>
              <ScanIcon />
              {t('common.scanEvidence')}
            </MenuItem>
          </MenuButton>
        </ButtonContainerStyled>
      </Stack>
    </div>
  );
};

export default DashboardHeader;
