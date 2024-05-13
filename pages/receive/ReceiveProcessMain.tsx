import {Box, Button, Slide, Stack, Typography} from '@mui/material';
import {styled} from '@mui/system';
import {ScanEvidenceDialog} from './ScanBarcode/ScanEvidenceDialog';
import {MButton, MDialog, MVerticalStepper, AlertWarningIcon} from '@cellebrite/design-system';
import ReviewAndEditStep from './Steps/ReviewAndEditStep/ReviewAndEditStep';
import {TOPBAR_HEIGHT} from 'types/layout';
import {useTranslation} from 'react-i18next';
import {pageRoutes} from 'utils/routes/page-routes';
import {useGetReceiveProcessSteps} from './useGetReceiveProcessSteps';
import PendingReceiveDialog from './PendingReceive/PendingReceiveDialog';
import SignTransactionStep from './Steps/SignTransaction/SignTransactionStep';
import TransactionConfirmation from './Steps/TransactionConfirmation/TransactionConfirmation';
import MoveEvidenceStep from './Steps/MoveEvidenceStep/MoveEvidenceStep';
import {useReceiveStore} from 'store/receive/receive.store';
import {ReceiveFlowSteps} from 'types/receive';
import CompleteStep from './Steps/CompleteStep/CompleteStep';
import {useState} from 'react';
import {useHistory} from 'react-router-dom';

const ReceiveFlowMainStyled = styled('div')(({theme}) => {
  return {
    height: `calc(100% - ${TOPBAR_HEIGHT}px)`,
    padding: theme.spacing(4),
    width: '100%',
    position: 'fixed',
    backgroundColor: theme.palette.ui.mutedSoft,
    left: 0,
  };
});

const TitleStyled = styled(Typography)(() => ({
  display: 'block',
  flexGrow: 1,
}));

const HeaderStyled = styled(Stack)(({theme}) => ({
  marginBottom: theme.spacing(2),
  alignItems: 'center',
}));

const MVerticalStepperStyled = styled(MVerticalStepper)(({theme}) => ({
  padding: theme.spacing(3),
  height: 680,
  width: 288,
}));

const ExitProcessDialog = styled(MDialog)(({theme}) => ({
  '& .MuiPaper-root': {
    position: 'absolute',
    top: theme.spacing(1),
    width: '400px',
    padding: theme.spacing(3),
  },
}));

const ExitProcessDialogHeader = ({title}: {title: string}): JSX.Element => (
  <Box display="flex" alignItems="center" gap={1}>
    <AlertWarningIcon />
    <Typography variant="xLargeBold">{title}</Typography>
  </Box>
);

const ExitProcessDialogContent = ({content}: {content: string}): JSX.Element => (
  <Box py={0.5} pl={4}>
    <Typography variant="text">{content}</Typography>
  </Box>
);
const ExitProcessDialogAction = ({
  setExitProcessDialogOpen,
}: {
  setExitProcessDialogOpen: (open: boolean) => void;
}): JSX.Element => {
  const history = useHistory();

  return (
    <Box display="flex" flexDirection="row" gap={1}>
      <Button variant="outlined" onClick={() => setExitProcessDialogOpen(false)}>
        No
      </Button>
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          setExitProcessDialogOpen(false);
          history.push(pageRoutes.dashboard);
        }}
      >
        Yes
      </Button>
    </Box>
  );
};
const ReceiveProcessMain = (): JSX.Element => {
  const {t} = useTranslation();
  const steps = useGetReceiveProcessSteps();
  const activeProcessStep = useReceiveStore((state) => state.activeProcessStep);
  const [isExitProcessDialogOpen, setExitProcessDialogOpen] = useState(false);

  const exitProcessContent = [
    {
      title: t('evidence.receive.exit.dialog.type1.title'),
      content: t('evidence.receive.exit.dialog.type1.content'),
    },
    {
      title: t('evidence.receive.exit.dialog.type1.title'),
      content: t('evidence.receive.exit.dialog.type1.content'),
    },
    {
      title: t('evidence.receive.exit.dialog.type2.title'),
      content: t('evidence.receive.exit.dialog.type2.content'),
    },
    {
      title: t('evidence.receive.exit.dialog.type3.title'),
      content: t('evidence.receive.exit.dialog.type3.content'),
    },
    {
      title: t('evidence.receive.exit.dialog.type3.title'),
      content: t('evidence.receive.exit.dialog.type3.content'),
    },
  ];

  const handleExitProcess = (): void => {
    setExitProcessDialogOpen(true);
  };

  return (
    <Slide direction="up" in={true} mountOnEnter unmountOnExit>
      <ReceiveFlowMainStyled>
        <ExitProcessDialog
          showClose={true}
          open={isExitProcessDialogOpen}
          onClose={() => setExitProcessDialogOpen(false)}
          title={<ExitProcessDialogHeader title={exitProcessContent[activeProcessStep].title} />}
          actions={<ExitProcessDialogAction setExitProcessDialogOpen={setExitProcessDialogOpen} />}
          content={<ExitProcessDialogContent content={exitProcessContent[activeProcessStep].content} />}
        />
        <HeaderStyled gap={1} flexDirection="row">
          <TitleStyled variant="xLargeMedium">{t('evidence.receive.title')}</TitleStyled>
          <MButton variant="text" onClick={handleExitProcess}>
            {t('evidence.receive.exit.text')}
          </MButton>
        </HeaderStyled>
        <Stack sx={{height: `calc(100% - ${TOPBAR_HEIGHT}px)`}} flexDirection="row">
          <MVerticalStepperStyled activeStep={activeProcessStep} steps={steps} />
          <ScanEvidenceDialog />
          <PendingReceiveDialog />
          {activeProcessStep === ReceiveFlowSteps.ReviewAndEdit && <ReviewAndEditStep />}
          {activeProcessStep === ReceiveFlowSteps.SignTransaction && <SignTransactionStep />}
          {activeProcessStep === ReceiveFlowSteps.TransactionConfirmed && <TransactionConfirmation />}
          {activeProcessStep === ReceiveFlowSteps.MoveEvidence && <MoveEvidenceStep />}
          {activeProcessStep === ReceiveFlowSteps.Complete && <CompleteStep />}
        </Stack>
      </ReceiveFlowMainStyled>
    </Slide>
  );
};

export default ReceiveProcessMain;
