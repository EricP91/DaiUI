import {MAlertDialog, MButton} from '@cellebrite/design-system';
import {useReceiveStore} from 'store/receive/receive.store';
import {useTranslation} from 'react-i18next';
import {Stack} from '@mui/material';
import {useHistory} from 'react-router-dom';
import {pageRoutes} from 'utils/routes/page-routes';
import {Submission} from 'types/receive';
import {ReceiveFlowSteps} from 'types/receive';

interface PendingReceiveConfirmDialogProps {
  onClose: () => void;
  pendingReceiveSubmissions?: Submission[];
}

const PendingReceiveConfirmDialog = ({
  onClose,
  pendingReceiveSubmissions,
}: PendingReceiveConfirmDialogProps): JSX.Element => {
  const {t} = useTranslation();
  const history = useHistory();
  const setSubmissionItems = useReceiveStore((state) => state.setSubmissionItems);
  const setActiveProcessStep = useReceiveStore((state) => state.setActiveProcessStep);
  const items = pendingReceiveSubmissions?.flatMap((submission) => submission.items);
  const itemsCount = items?.length || 0;
  const submissionCount = pendingReceiveSubmissions?.length || 0;

  return (
    <MAlertDialog
      variant="info"
      title={t('evidence.pendingReceive.confirmDialog.title')}
      actions={
        <Stack flexDirection="row" gap={1}>
          <MButton variant="outlined" onClick={onClose}>
            {t('common.cancel')}
          </MButton>
          <MButton
            onClick={() => {
              history.push(pageRoutes.receiveSubmission.root);
              setSubmissionItems(items);
              setActiveProcessStep(ReceiveFlowSteps.ReviewAndEdit);
              onClose();
            }}
            variant="contained"
          >
            {t('common.receive')}
          </MButton>
        </Stack>
      }
      content={t('evidence.pendingReceive.confirmDialog.content', {submissionCount, itemsCount})}
      onClose={onClose}
      open={true}
    />
  );
};

export default PendingReceiveConfirmDialog;
