import {VisibilityIcon} from '@cellebrite/design-system';
import {Typography} from '@mui/material';
import {Box} from '@mui/system';
import {useTranslation} from 'react-i18next';

const SubmissionIdentifier = ({submissionId}: {submissionId: string}): JSX.Element => {
  const {t} = useTranslation();
  return (
    <Box sx={{display: 'flex', alignItems: 'center', gap: 1, mt: 2}}>
      <Typography variant="small" color="disabled">
        {t('evidence.receive.step2.submission', {id: submissionId})}
      </Typography>
      <VisibilityIcon data-testid="visibility-icon" fontSize="small" color="disabled" />
    </Box>
  );
};

export default SubmissionIdentifier;
