import {useState, useRef} from 'react';
import {MAlert, MButton} from '@cellebrite/design-system';
import {Box, Typography, Popover} from '@mui/material';
import {styled} from '@mui/system';
import {pageRoutes} from 'utils/routes/page-routes';
import {useHistory} from 'react-router-dom';
import {useReceiveStore} from 'store/receive/receive.store';
import {useTransactionStore} from 'store/receive/transaction.store';
import {useTranslation} from 'react-i18next';
import {StepContainer} from '../StepStyled';
import TransactionConfirmationCard from 'pages/components/TransactionConfirmationCard';
import TransactionConfirmationTable from 'pages/components/TransactionConfirmationTable';
import EmailReceiptDialog from 'pages/components/EmailReceiptDialog';
import SignatureCard from 'pages/components/SignatureCard';
import TransactionToast from 'pages/components/TransactionToast';
import TransactionConfirmationIconButton from 'pages/components/TransactionConfirmationIconButton';
import GotoDashboardTooltipContent from './GotoDashboardTooltipContent';

const TransactionConfirmationContainerStyled = styled(Box)(({theme}) => ({
  display: 'flex',
  flex: 1,
  height: '100%',
  border: `1px solid ${theme.palette.ui.positiveLightest}`,
  boxShadow: '0px 16px 32px -4px rgba(145, 158, 171, 0.24), 0px 0px 2px 0px rgba(145, 158, 171, 0.24)',
  padding: theme.spacing(2),
  gap: theme.spacing(4),
}));

const StepFooterStyled = styled(Box)(({theme}) => ({
  width: '100%',
  display: 'flex',
  padding: theme.spacing(2),
  position: 'relative',
  justifyContent: 'flex-end',
  '& .MuiButton-root': {
    width: 137,
  },
  borderTop: `1px solid ${theme.palette.ui.mutedSoft}`,
}));

export const GotoDashboardTooltip = styled(Popover)({
  pointerEvents: 'none',
  '& .MuiPaper-root': {
    pointerEvents: 'auto',
    minWidth: 280,
    margin: 0,
  },
});

const CompleteStep = (): JSX.Element => {
  const {note, labSignature, submitterSignature} = useTransactionStore();
  const {submissionItems} = useReceiveStore();
  const [emailSent, setEmailSent] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const {t} = useTranslation();
  const anchorEl = useRef(null);
  const [openedTooltip, setOpenedTooltip] = useState(false);
  const history = useHistory();

  const handleGotoDashboard = (): void => {
    history.push(pageRoutes.dashboard);
  };

  const handleTooltipOpen = (): void => {
    setOpenedTooltip(true);
  };

  const handleTooltipClose = (): void => {
    setOpenedTooltip(false);
  };

  const sendCopy = (): void => {
    setEmailSent(true);
    setShowToast(true);
  };
  const handleToastClose = (): void => {
    setShowToast(false);
  };

  return (
    <StepContainer>
      {showDialog && <EmailReceiptDialog onClose={() => setShowDialog(false)} />}
      <Box sx={{display: 'flex', flexDirection: 'column', overflow: 'auto', height: '100%', padding: 3, gap: 3}}>
        <Typography display="block" variant="xLargeMedium">
          {t('evidence.receive.step3.subtitle')}
        </Typography>
        <Box>
          <MAlert severity="success" sx={{paddingX: 2, paddingY: 1}}>
            {t('evidence.receive.step5.receiveItemsSuccessMessage')}
          </MAlert>
        </Box>
        <Box sx={{marginTop: 2, display: 'flex', gap: 1}}>
          <MButton variant="outlined">{t('evidence.receive.step5.buttons.printReceipt')}</MButton>
          <TransactionConfirmationIconButton
            text={t('evidence.receive.step5.buttons.sendMeCopy')}
            onClick={sendCopy}
            showIcon={emailSent}
          />
          <MButton variant="outlined" onClick={() => setShowDialog(true)}>
            {t('evidence.receive.step5.buttons.emailReceipt')}
          </MButton>
        </Box>
        <TransactionConfirmationContainerStyled>
          <TransactionConfirmationCard title={t('evidence.receive.step3.card.chainOfCustody')}>
            <TransactionConfirmationTable items={submissionItems} />
          </TransactionConfirmationCard>
        </TransactionConfirmationContainerStyled>
        <TransactionConfirmationContainerStyled>
          <TransactionConfirmationCard title={t('evidence.receive.step3.card.note')}>
            <Typography sx={{padding: 2}}>{note}</Typography>
          </TransactionConfirmationCard>
          <TransactionConfirmationCard title={t('evidence.receive.step3.card.signature')}>
            <Box sx={{display: 'flex', padding: 2, flex: 1}}>
              <SignatureCard
                title={t('evidence.receive.step3.card.signatureCard.submitLabel')}
                signature={submitterSignature}
              />
              <SignatureCard title={t('evidence.receive.step3.card.signatureCard.labLabel')} signature={labSignature} />
            </Box>
          </TransactionConfirmationCard>
        </TransactionConfirmationContainerStyled>
      </Box>
      {showToast && (
        <TransactionToast onClose={handleToastClose} text={t('evidence.receive.step5.toast.copySuccessMessage')} />
      )}
      <StepFooterStyled>
        <MButton
          ref={anchorEl}
          onMouseEnter={handleTooltipOpen}
          onMouseLeave={handleTooltipClose}
          onClick={handleGotoDashboard}
          variant="contained"
          data-testid={'goto-dashboard'}
          aria-haspopup="true"
        >
          {t('common.gotoDashboard')}
        </MButton>
        <GotoDashboardTooltip
          anchorEl={anchorEl.current}
          open={openedTooltip}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          PaperProps={{onMouseEnter: handleTooltipOpen, onMouseLeave: handleTooltipClose}}
        >
          <GotoDashboardTooltipContent />
        </GotoDashboardTooltip>
      </StepFooterStyled>
    </StepContainer>
  );
};

export default CompleteStep;
