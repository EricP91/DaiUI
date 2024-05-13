import {useState, useEffect} from 'react';
import {Box, Typography, Button} from '@mui/material';
import {styled} from '@mui/system';
import {MDialog, AlertWarningIcon} from '@cellebrite/design-system';
import {pageRoutes} from 'utils/routes/page-routes';
import {useReceiveStore} from 'store/receive/receive.store';
import {StepContainer} from '../StepStyled';
import {StepFooter} from '../StepFooter';
import {ReceiveFlowSteps, SubmissionItem} from 'types/receive';
import AddItemDialogContent from './AddItemDialogContent';
import MoveEvidenceContent from './MoveEvidenceContent';
import {useGetSectionItems} from 'api/dashboard';
import {ItemSection} from 'types/search-request';
import {Trans, useTranslation} from 'react-i18next';

const AddItemDialog = styled(MDialog)({
  '& .MuiPaper-root': {
    position: 'absolute',
    top: '8px',
    width: '1040px',
    height: '760px',
  },
});

const RemoveItemDialog = styled(MDialog)(({theme}) => ({
  '& .MuiPaper-root': {
    position: 'absolute',
    top: '8px',
    width: '400px',
    padding: theme.spacing(3),
  },
}));

const MoveEvidenceStep = (): JSX.Element => {
  const {submissionItems} = useReceiveStore();
  const setSubmissionItems = useReceiveStore((state) => state.setSubmissionItems);
  const setActiveProcessStep = useReceiveStore((state) => state.setActiveProcessStep);
  const {t} = useTranslation();

  const pendingSubmissionItems = useGetSectionItems(ItemSection.AnalystCustody).data?.data || [];

  const filteredPendingSubmissionItems = pendingSubmissionItems.filter(
    (item) => !submissionItems?.find((_) => _.id === item.id),
  );

  const [selectedItems, setSelectedItems] = useState<string[]>();

  const itemIds = filteredPendingSubmissionItems.map((item) => item.id);

  const [isAddItemDialogOpen, setAddItemDialogOpen] = useState(false);
  const [isRemoveItemDialogOpen, setRemoveItemDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<SubmissionItem>();

  useEffect(() => {
    let printLabelDialog: Window | null = null;
    const createPrintLabelDialog = (): void => {
      const width = 380,
        height = window.screen.height - 270;
      const left = window.screen.width - width;
      const top = window.screen.height - height;

      const submissionItemIds = submissionItems?.map((submissionItem) => ({id: submissionItem.id}));
      localStorage.setItem('Submission Items', submissionItems ? JSON.stringify(submissionItemIds) : '[]');
      printLabelDialog = window.open(
        pageRoutes.print,
        '_blank',
        `width=${width},height=${height},left=${left},top=${top}`,
      );
    };
    if (submissionItems?.length) createPrintLabelDialog();

    return () => {
      printLabelDialog?.close();
    };
  }, [submissionItems]);

  const handleRemoveItem = (itemCode?: string): void => {
    if (!submissionItems) {
      return;
    }
    const newItems = submissionItems.filter((_) => _.id !== itemCode);
    setSubmissionItems(newItems);
  };

  const handleAddItem = (itemCode?: string): void => {
    if (!itemCode || submissionItems?.find((_) => _.id === itemCode)) {
      return;
    }
    const newItems: SubmissionItem[] = [
      ...(submissionItems || []),
      pendingSubmissionItems.find((_) => _.id === itemCode),
    ] as SubmissionItem[];

    setSubmissionItems(newItems);
  };

  const handleAddItemByIds = (): void => {
    setAddItemDialogOpen(false);
    const newItems: SubmissionItem[] = [
      ...(submissionItems || []),
      ...(selectedItems?.map((itemCode) => pendingSubmissionItems.find((_) => _.id === itemCode)) || []),
    ] as SubmissionItem[];
    setSelectedItems([]);
    setSubmissionItems(newItems);
  };

  const AddItemDialogAction = (): JSX.Element => (
    <Box display="flex" flexDirection="row" gap={1}>
      <Button variant="outlined" onClick={() => setAddItemDialogOpen(false)}>
        {t('evidence.receive.step4.addItemDialog.cancel')}
      </Button>
      <Button color="primary" variant="contained" disabled={!selectedItems?.length} onClick={handleAddItemByIds}>
        {t('evidence.receive.step4.addItemDialog.yes')}
      </Button>
    </Box>
  );

  const RemoveItemDialogTitle = (): JSX.Element => (
    <Box display="flex" alignItems="center" gap={1}>
      <AlertWarningIcon />
      <Typography variant="xLargeBold">{t('evidence.receive.step4.warning.title')}</Typography>
    </Box>
  );

  const RemoveItemDialogAction = (): JSX.Element => (
    <Box display="flex" flexDirection="row" gap={1}>
      <Button variant="outlined" onClick={() => setRemoveItemDialogOpen(false)}>
        {t('evidence.receive.step4.warning.no')}
      </Button>
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          handleRemoveItem(currentItem?.id);
          setRemoveItemDialogOpen(false);
        }}
      >
        {t('evidence.receive.step4.warning.yes')}
      </Button>
    </Box>
  );

  const RemoveItemDialogContent = (): JSX.Element => (
    <Box py={0.5} pl={4}>
      <Trans
        values={{
          id: currentItem?.id.toUpperCase(),
        }}
        i18nKey="evidence.receive.step4.warning.content"
        components={{b: <b></b>}}
      />
    </Box>
  );

  return (
    <StepContainer>
      <AddItemDialog
        showClose={true}
        open={isAddItemDialogOpen}
        onClose={() => setAddItemDialogOpen(false)}
        title={t('evidence.receive.step4.addItemDialog.title')}
        subtitle={t('evidence.receive.step4.addItemDialog.subtitle')}
        actions={<AddItemDialogAction />}
        content={
          <AddItemDialogContent onSelectItems={setSelectedItems} pendingItems={filteredPendingSubmissionItems} />
        }
      />
      <RemoveItemDialog
        showClose={true}
        open={isRemoveItemDialogOpen}
        onClose={() => setRemoveItemDialogOpen(false)}
        title={<RemoveItemDialogTitle />}
        actions={<RemoveItemDialogAction />}
        content={<RemoveItemDialogContent />}
      />
      <MoveEvidenceContent
        setRemoveItemDialogOpen={setRemoveItemDialogOpen}
        handleAddItem={handleAddItem}
        submissionItems={submissionItems as SubmissionItem[]}
        setAddItemDialogOpen={setAddItemDialogOpen}
        itemIds={itemIds}
        setCurrentItem={setCurrentItem}
      />
      <StepFooter
        onNextClick={() => {
          setActiveProcessStep(ReceiveFlowSteps.Complete);
        }}
        onPreviousClick={() => {
          setActiveProcessStep(ReceiveFlowSteps.TransactionConfirmed);
        }}
      ></StepFooter>
    </StepContainer>
  );
};

export default MoveEvidenceStep;
