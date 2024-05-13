import {Stack, Typography, styled} from '@mui/material';
import ScanImage from './assets/scan-an-item.svg?react';
import {useTranslation} from 'react-i18next';
import ScanBarcodeInvalidAgencyDialog from './ScanEvidenceInvalidAgencyDialog';
import {useScanDetectionHandler} from './useScanDetectionHandler';
import {useContext} from 'react';
import {ScanEvidenceDialogContext} from './ScanEvidenceContext';
import ScanBarcodeSubmissionItem from './ScanBarcodeSubmissionItem';

const StackStyled = styled(Stack)(({theme}) => ({
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(3),
  height: '100%',
}));

const ScanEvidenceDialogContent = (): JSX.Element => {
  const {isScanBarcodeInvalidAgencyDialogOpen, setIsScanBarcodeInvalidAgencyDialogOpen} = useScanDetectionHandler();
  const {items, setItems} = useContext(ScanEvidenceDialogContext);
  const {t} = useTranslation();

  return (
    <>
      <ScanBarcodeInvalidAgencyDialog
        open={isScanBarcodeInvalidAgencyDialogOpen}
        onClose={() => setIsScanBarcodeInvalidAgencyDialogOpen(false)}
      />
      {items?.length ? (
        <Stack gap={1}>
          {items.map(({itemCode, itemDescription, services}, index) => (
            <ScanBarcodeSubmissionItem
              key={`${itemCode}-${index}`}
              itemCode={itemCode}
              itemDescription={itemDescription}
              services={services}
              onRemove={(removedItem) => {
                setItems!((prev) => prev.filter((x) => x.itemCode !== removedItem));
              }}
            />
          ))}
        </Stack>
      ) : (
        <StackStyled>
          <ScanImage />
          <Typography variant="xxLargeBold">{t('evidence.scan.dialog.content')}</Typography>
        </StackStyled>
      )}
    </>
  );
};

export default ScanEvidenceDialogContent;
