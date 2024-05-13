import {PendingReviewIcon} from '@cellebrite/design-system';
import {Stack, Typography} from '@mui/material';
import {useTranslation} from 'react-i18next';

export const PendingReceiveDialogTitle = (): JSX.Element => {
  const {t} = useTranslation();

  return (
    <Stack alignItems="center" flexDirection="row" gap={1}>
      <PendingReviewIcon />
      <Typography variant="largeBold">{t('evidence.pendingReceive.title')}</Typography>
    </Stack>
  );
};
