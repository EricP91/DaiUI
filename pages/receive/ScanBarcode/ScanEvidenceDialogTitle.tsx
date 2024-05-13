import {ScanIcon} from '@cellebrite/design-system';
import {Stack, useTheme} from '@mui/material';
import {t} from 'i18next';

const ScanEvidenceDialogTitle = (): JSX.Element => {
  const theme = useTheme();
  return (
    <Stack gap={1} flexDirection="row" alignItems="center">
      <ScanIcon fill={theme.palette.ui.brandDark} />
      {t('evidence.scan.dialog.title')}
    </Stack>
  );
};

export default ScanEvidenceDialogTitle;
