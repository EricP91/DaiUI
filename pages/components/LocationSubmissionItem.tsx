import {Typography, useTheme} from '@mui/material';

import {SubmissionItem, SubmissionItemProps} from './SubmissionItem';
import {useTranslation} from 'react-i18next';

export const LocationSubmissionItem = (props: SubmissionItemProps): JSX.Element => {
  const {t} = useTranslation();
  const theme = useTheme();
  return (
    <SubmissionItem {...props}>
      <Typography noWrap color={theme.palette.ui.mutedDark} display="block" variant="smallMedium">
        {t('evidence.receive.step2.currentLocation.title')}
      </Typography>
      <Typography noWrap variant="textMedium">
        {t('evidence.receive.step2.currentLocation.content')}
      </Typography>
    </SubmissionItem>
  );
};
