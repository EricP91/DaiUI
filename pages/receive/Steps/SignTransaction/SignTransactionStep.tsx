import {Stack, Typography, styled} from '@mui/material';
import {Box} from '@mui/system';
import {StepFooter} from '../StepFooter';
import {StepContainer} from '../StepStyled';
import SignTransactionSignaturePanel from './SignTransactionSignaturePanel';
import {MInput} from '@cellebrite/design-system';
import {useForm, Controller} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {useTransactionStore} from 'store/receive/transaction.store';
import {useReceiveStore} from 'store/receive/receive.store';
import {LocationSubmissionItem} from 'pages/components/LocationSubmissionItem';
import {groupBy, map} from 'lodash-es';
import SubmissionIdentifier from '../../../components/SubmissionIdentifier/SubmissionIdentifier';
import {ReceiveFlowSteps} from 'types/receive';

const ListItemColumnStyled = styled(Box)(({theme}) => ({
  display: 'flex',
  gap: theme.spacing(1),
  flexDirection: 'column',
  width: '43%',
  margin: theme.spacing(0, 0, 0, 3),
}));

const SignaturePanelColumnStyled = styled(Box)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  marginRight: theme.spacing(3),
  width: '100%',
}));

const NoteInputStyled = styled(MInput)(({theme}) => ({
  marginBottom: theme.spacing(6),

  '& .MuiOutlinedInput-root': {
    padding: theme.spacing(1, 1, 2, 1),
  },
}));

const DestinationLocationStyled = styled(Box)(({theme}) => ({
  marginBottom: theme.spacing(4),
}));

const DestinationLocationTitleStyled = styled(Typography)(({theme}) => ({
  color: theme.palette.ui.mutedDark,
}));

const SignTransactionStep = (): JSX.Element => {
  const {control} = useForm({mode: 'onChange'});
  const {note, setNote} = useTransactionStore();
  const setActiveProcessStep = useReceiveStore((state) => state.setActiveProcessStep);
  const submissionItems = useReceiveStore((state) => state.submissionItems);
  const itemsBySubmissionId = map(groupBy(submissionItems, (item) => item?.submissionId));
  const {t} = useTranslation();

  return (
    <StepContainer>
      <Box sx={{display: 'flex', flexDirection: 'column', overflow: 'auto', height: '100%'}}>
        <Typography sx={{m: 3}} display="block" variant="xLargeMedium">
          {t('evidence.receive.step2.subtitle')}
        </Typography>
        <Box sx={{overflow: 'auto', flexGrow: 1}}>
          <Stack flexDirection="row" gap={10} sx={{mb: 2}}>
            <ListItemColumnStyled>
              {map(itemsBySubmissionId, (items, submissionId) => {
                return (
                  <>
                    <SubmissionIdentifier key={submissionId} submissionId={`${submissionId}`} />
                    {map(items, (item) => (
                      <LocationSubmissionItem
                        key={item.id}
                        itemCode={`${item.id}`}
                        itemDescription={item.description || ''}
                      />
                    ))}
                  </>
                );
              })}
            </ListItemColumnStyled>
            <SignaturePanelColumnStyled>
              <DestinationLocationStyled>
                <DestinationLocationTitleStyled variant="smallMedium">
                  {t('evidence.receive.step2.destinationLocation.title')}
                </DestinationLocationTitleStyled>
                <Typography>{t('evidence.receive.step2.destinationLocation.content')}</Typography>
              </DestinationLocationStyled>
              <Controller
                name={t('common.note')}
                control={control}
                rules={{maxLength: {value: 300, message: t('common.validation.maxLength', {max: 300})}}}
                render={({field: {ref, ...field}, fieldState}) => {
                  return (
                    <NoteInputStyled
                      {...field}
                      name="note"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      error={fieldState.invalid}
                      helperText={fieldState.error?.message}
                      inputRef={ref}
                      fullWidth
                      label={t('common.note')}
                      multiline
                      rows={2}
                    />
                  );
                }}
              />
              <SignTransactionSignaturePanel />
            </SignaturePanelColumnStyled>
          </Stack>
        </Box>
        <StepFooter
          onNextClick={() => {
            setActiveProcessStep(ReceiveFlowSteps.TransactionConfirmed);
          }}
          onPreviousClick={() => {
            setActiveProcessStep(ReceiveFlowSteps.ReviewAndEdit);
          }}
        />
      </Box>
    </StepContainer>
  );
};

export default SignTransactionStep;
