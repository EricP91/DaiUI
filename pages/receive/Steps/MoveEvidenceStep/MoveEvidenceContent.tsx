import {Autocomplete, Box, Typography, IconButton, Link, useTheme, Stack, styled} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {MInput} from '@cellebrite/design-system';
import {LocationSubmissionItem} from 'pages/components/LocationSubmissionItem';
import {map} from 'lodash-es';
import MoveEvidenceSignaturePanel from './MoveEvidenceSignaturePanel';
import {useForm, Controller} from 'react-hook-form';
import {useTransactionStore} from 'store/receive/transaction.store';
import {useTranslation, Trans} from 'react-i18next';
import {useState} from 'react';
import {SubmissionItem} from 'types/receive';

interface MoveEvidenceContentProps {
  setAddItemDialogOpen: (open: boolean) => void;
  setRemoveItemDialogOpen: (open: boolean) => void;
  handleAddItem: (id: string) => void;
  submissionItems: SubmissionItem[];
  itemIds: string[];
  setCurrentItem: (item: SubmissionItem) => void;
}
const ListItemColumnStyled = styled(Box)(({theme}) => ({
  display: 'flex',
  flex: 1,
  gap: theme.spacing(1),
  flexDirection: 'column',
  width: '43%',
}));

const ItemAutoSingleSelect = styled(Autocomplete)(({theme}) => ({
  maxHeight: '224px',
  '& .MuiInputBase-root': {
    height: '40px',
    fontSize: '16px',
    lineHeight: '24px',
    '& input': {
      height: '24px',
    },
  },
  '& .MuiInputLabel-root': {
    top: '-8px',
  },
  '& .MuiAutocomplete-listbox': {
    maxHeight: '224px', // Adjust the max height of the dropdown list if needed
    overflowY: 'auto',
    height: '224x',
    backgroundColor: 'red',
  },
  '& .MuiAutocomplete-popperDisablePortal': {
    maxHeight: '224px', // Adjust the max height of the dropdown list if needed
    overflowY: 'auto',
    height: '224x',
    backgroundColor: 'red',
  },
  '& .MuiOutlinedInput-root': {
    padding: theme.spacing(0, 1),
  },
}));

const SignaturePanelColumnStyled = styled(Box)(({theme}) => ({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  marginRight: theme.spacing(3),
  paddingTop: theme.spacing(2),
  width: '100%',
}));

const NoteInputStyled = styled(MInput)(({theme}) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  '& .MuiOutlinedInput-root': {
    padding: theme.spacing(1, 1, 2, 1),
  },
}));

const MoveEvidenceContent = ({
  setAddItemDialogOpen,
  setRemoveItemDialogOpen,
  handleAddItem,
  submissionItems,
  itemIds,
  setCurrentItem,
}: MoveEvidenceContentProps): JSX.Element => {
  const theme = useTheme();
  const {control} = useForm({mode: 'onChange'});
  const {note, setNote} = useTransactionStore();
  const {t} = useTranslation();

  const locations = ['My Custody', "Analyst's Custody"];
  const [selectedId, setSelectedId] = useState<string | null>('');
  const [inputIdValue, setInputIdValue] = useState('');

  const [selectedLocation, setSelectedLocation] = useState<string | null>('');
  const [inputLocationValue, setInputLocationValue] = useState('');

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', overflow: 'auto', height: '100%', padding: 3, gap: 3}}>
      <Typography display="block" variant="xLargeMedium">
        Move
      </Typography>
      <Box>
        <Trans
          values={{
            lookup: t('evidence.receive.step4.lookupLink'),
          }}
          i18nKey="evidence.receive.step4.additionalItem"
          components={{
            Link: (
              <Link
                href="#"
                color={theme.palette.ui.brand}
                variant="text"
                underline="none"
                onClick={() => setAddItemDialogOpen(true)}
              ></Link>
            ),
          }}
        />
      </Box>
      <Box sx={{marginTop: 2, display: 'flex', gap: 1}}>
        <ItemAutoSingleSelect
          disablePortal
          sx={{width: '240px'}}
          value={selectedId}
          data-testid="item-id-selector"
          onChange={(_, value) => {
            setSelectedId(value as string | null);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if (itemIds.includes(inputIdValue)) {
                setSelectedId('');
                handleAddItem(inputIdValue as string);
                setInputIdValue('');
              }
            }
          }}
          inputValue={inputIdValue}
          onInputChange={(_, newInputValue) => {
            setInputIdValue(newInputValue);
          }}
          options={itemIds.map(String)}
          renderInput={(params) => <MInput {...params} label={'Item ID'} placeholder={'Type Item ID...'} />}
        />
        <IconButton
          aria-label="add-item"
          onClick={() => {
            handleAddItem(selectedId as string);
            setSelectedId('');
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>
      <Box sx={{overflow: 'auto', flexGrow: 1}}>
        <Stack flexDirection="row" gap={10} sx={{mb: 2}}>
          <ListItemColumnStyled>
            {map(submissionItems, (item) => (
              <LocationSubmissionItem
                key={item.id}
                itemCode={`${item.id}`}
                itemDescription={item.description || ''}
                onRemove={() => {
                  setRemoveItemDialogOpen(true);
                  setCurrentItem(item);
                }}
              />
            ))}
          </ListItemColumnStyled>
          <SignaturePanelColumnStyled>
            <ItemAutoSingleSelect
              fullWidth
              disablePortal
              data-testid="destination-selector"
              value={selectedLocation}
              onChange={(_, value) => {
                setSelectedLocation(value as string | null);
              }}
              inputValue={inputLocationValue}
              onInputChange={(_, newInputValue) => {
                setInputLocationValue(newInputValue);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setSelectedLocation(inputLocationValue);
                }
              }}
              options={locations.map(String)}
              renderInput={(params) => (
                <MInput
                  {...params}
                  label={t('evidence.receive.step4.description.label')}
                  placeholder={t('evidence.receive.step4.description.placeholder')}
                />
              )}
            />
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
                    label={t('evidence.receive.step4.note.label')}
                    multiline
                    rows={2}
                  />
                );
              }}
            />
            <MoveEvidenceSignaturePanel />
          </SignaturePanelColumnStyled>
        </Stack>
      </Box>
    </Box>
  );
};

export default MoveEvidenceContent;
