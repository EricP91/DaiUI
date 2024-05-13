import {Box, Typography, useTheme} from '@mui/material';
import {QRIcon} from '@cellebrite/design-system';
import {StepContainer} from '../StepStyled';
import {StepFooter} from '../StepFooter';
import {useReceiveStore} from 'store/receive/receive.store';
import {useTranslation} from 'react-i18next';
import groupBy from 'lodash-es/groupBy';
import map from 'lodash-es/map';
import SubmissionItemCardList from '../../../components/SubmissionItemCardList/SubmissionItemCardList';

const ReviewAndEditStep = (): JSX.Element => {
  const submissionItems = useReceiveStore((state) => state.submissionItems);
  const setActiveProcessStep = useReceiveStore((state) => state.setActiveProcessStep);
  const itemsBySubmissionId = groupBy(submissionItems, (item) => item?.submissionId);
  const {t} = useTranslation();
  const theme = useTheme();

  return (
    <StepContainer>
      <Box sx={{display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'auto', pb: 1}}>
        <Box sx={{m: 3}}>
          <Typography variant="xxLargeBold">Review and Edit</Typography>
        </Box>
        <Box sx={{display: 'flex', mb: 2, ml: 2, pr: 2, pl: 2}}>
          <QRIcon sx={{mr: 0.5}} fill={theme.palette.ui.brand} />
          <Typography color={theme.palette.ui.brand} variant="textMedium">
            {t('evidence.receive.step2.scanYourLabInputBarcode')}
          </Typography>
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'auto', gap: 1, pb: 4}}>
          {map(itemsBySubmissionId, (items, submissionId) => (
            <SubmissionItemCardList
              key={submissionId}
              items={items}
              submissionId={submissionId}
              allItems={submissionItems || []}
            />
          ))}
        </Box>
      </Box>
      <StepFooter
        onNextClick={() => {
          setActiveProcessStep(1);
        }}
        disablePrevious
      />
    </StepContainer>
  );
};

export default ReviewAndEditStep;
