import {MAlertDialog, MButton} from '@cellebrite/design-system';
import {Typography} from '@mui/material';
import {useTranslation} from 'react-i18next';

interface ScanBarcodeInvalidAgencyDialogProps {
  open: boolean;
  onClose: () => void;
}

const ScanBarcodeInvalidAgencyDialog = ({open, onClose}: ScanBarcodeInvalidAgencyDialogProps): JSX.Element => {
  const {t} = useTranslation();
  return (
    <MAlertDialog
      onClose={onClose}
      content={<Typography variant="text">{t('evidence.receive.error.invalidAgencyDialog.content')}</Typography>}
      actions={
        <div>
          <MButton color="primary" onClick={onClose} variant="contained">
            {t('common.dialog.alert.confirm')}
          </MButton>
        </div>
      }
      open={open}
      title={t('evidence.receive.error.invalidAgencyDialog.title')}
      variant="error"
    />
  );
};

export default ScanBarcodeInvalidAgencyDialog;
