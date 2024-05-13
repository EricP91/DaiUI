import {MButton, MDialog, NotistackProvider} from '@cellebrite/design-system';
import {useTranslation} from 'react-i18next';
import {styled} from '@mui/system';
import {Slide} from '@mui/material';
import {matchPath, useHistory, useLocation} from 'react-router-dom';
import {pageRoutes} from 'utils/routes/page-routes';
import {TransitionProps} from '@mui/material/transitions';
import ScanEvidenceDialogContent from './ScanEvidenceDialogContent';
import ScanEvidenceDialogTitle from './ScanEvidenceDialogTitle';
import {ReceiveResponse} from 'types/receive';
import {ScanEvidenceDialogContext} from './ScanEvidenceContext';
import React, {forwardRef, useState} from 'react';

const MDialogStyled = styled(MDialog)(() => ({
  '& .MuiDialog-container': {
    '& .SnackbarContainer-root': {
      position: 'absolute',
    },
    '& .SnackbarContainer-bottom': {
      bottom: 84,
    },
    '& > .MuiPaper-root': {
      height: 884,
      width: 840,
      padding: '0',
      overflowX: 'hidden',
    },
    '& .MuiDialogTitle-root, .MuiDialogActions-root ': {
      padding: 24,
      '.MuiIconButton-root': {
        padding: 0,
      },
    },
    '&  .MuiDialogContent-root': {
      padding: '10px 24px',
      margin: 0,
    },
    '& .SnackbarItem-message .MuiPaper-root': {
      padding: 0,
    },
  },
}));

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function ScanEvidenceDialog(): JSX.Element {
  const [items, setItems] = useState<ReceiveResponse[]>([]);
  const history = useHistory();
  const location = useLocation();

  const match = matchPath(location?.pathname, {
    path: pageRoutes.receiveSubmission.scanEvidence,
    strict: false,
    exact: true,
  });

  const {t} = useTranslation();

  return (
    <ScanEvidenceDialogContext.Provider value={{items, setItems}}>
      <MDialogStyled
        TransitionComponent={Transition}
        title={<ScanEvidenceDialogTitle />}
        content={
          <NotistackProvider>
            <ScanEvidenceDialogContent />
          </NotistackProvider>
        }
        actions={
          <>
            <MButton variant="outlined" onClick={history?.goBack}>
              {t('common.cancel')}
            </MButton>
            <MButton variant="contained">{t('evidence.scan.dialog.actionButton')}</MButton>
          </>
        }
        open={!!match}
        onClose={history?.goBack}
      ></MDialogStyled>
    </ScanEvidenceDialogContext.Provider>
  );
}
