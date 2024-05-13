import {MButton, MDialog} from '@cellebrite/design-system';
import {useHistory, useLocation, matchPath} from 'react-router-dom';
import {pageRoutes} from 'utils/routes/page-routes';
import PendingReceiveDialogContent from './PendingReceiveDialogContent';
import {PendingReceiveDialogTitle} from './PendingReceiveDialogTitle';
import {styled} from '@mui/system';
import {Stack} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {useState} from 'react';
import PendingReceiveConfirmDialog from './PendingReceiveConfirmDialog';

import {Submission} from 'types/receive';

const MDialogStyled = styled(MDialog)(({theme}) => ({
  '& .MuiDialog-container': {
    '& .MuiDialogContent-root': {
      marginBottom: 0,
    },
    '& > .MuiPaper-root': {
      padding: theme.spacing(3),
      width: '100%',
      margin: theme.spacing(0, 30, 0, 30),
    },
  },
}));

const PendingReceiveDialog = (): JSX.Element => {
  const [pendingReceiveSubmissions, setPendingReceiveSubmissions] = useState<Submission[] | undefined>(undefined);
  const history = useHistory();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const location = useLocation();
  const {t} = useTranslation();

  const match = matchPath(location?.pathname, {
    path: pageRoutes.receiveSubmission.viewPendingAndReceive,
    strict: false,
    exact: true,
  });

  const shouldShowPendingReceiveDialog = !!match && !showConfirmDialog;

  return (
    <>
      <MDialogStyled
        title={<PendingReceiveDialogTitle />}
        onClose={() => history?.goBack()}
        content={<PendingReceiveDialogContent onSubmissionSelect={(items) => setPendingReceiveSubmissions(items)} />}
        actions={
          <Stack sx={{ml: 'auto', mt: 3}} flexDirection="row" gap={1}>
            <MButton onClick={() => history?.goBack()} variant="outlined">
              {t('common.cancel')}
            </MButton>
            <MButton
              disabled={!pendingReceiveSubmissions?.length}
              variant="contained"
              onClick={() => setShowConfirmDialog(true)}
            >
              {t('evidence.pendingReceive.confirm')}
            </MButton>
          </Stack>
        }
        open={shouldShowPendingReceiveDialog}
      />
      {showConfirmDialog && (
        <PendingReceiveConfirmDialog
          pendingReceiveSubmissions={pendingReceiveSubmissions}
          onClose={() => setShowConfirmDialog(false)}
        />
      )}
    </>
  );
};

export default PendingReceiveDialog;
