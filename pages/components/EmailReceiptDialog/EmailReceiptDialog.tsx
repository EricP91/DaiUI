import {useState} from 'react';
import {Box} from '@mui/material';
import {MButton, MAlertDialog} from '@cellebrite/design-system';
import {styled} from '@mui/system';
import EmailAutoMultiSelect from './EmailAutoMultiSelect';
import {useGetReceiptEmails} from 'api/receive';
import {useTranslation} from 'react-i18next';

const MAlertDialogStyled = styled(MAlertDialog)(({theme}) => ({
  '& h2 .MuiBox-root svg': {
    display: 'none',
  },
  '& h2 h6 *': {
    marginLeft: 0,
  },
  '& .MuiIconButton-root': {
    padding: 0,
  },
  '& .MuiDialogContent-root': {
    marginLeft: '0 !important',
    paddingTop: theme.spacing(2),
  },
}));

const EmailReceiptDialog = ({onClose}: {onClose: () => void}): JSX.Element => {
  const {t} = useTranslation();
  const {data} = useGetReceiptEmails();
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const onSubmit = (): void => {
    console.log(selectedEmails);
  };
  return (
    <>
      <MAlertDialogStyled
        open
        onClose={onClose}
        title="Email Receipt"
        variant="success"
        content={<EmailAutoMultiSelect emails={data || []} onChange={setSelectedEmails} />}
        actions={
          <Box sx={{display: 'flex', ml: 'auto', mt: 3}} gap={1}>
            <MButton onClick={onClose} variant="outlined">
              {t('common.back')}
            </MButton>
            <MButton variant="contained" onClick={onSubmit}>
              {t('evidence.receive.step3.emailReceiptDialog.actions.sendEmail')}
            </MButton>
          </Box>
        }
      />
    </>
  );
};

export default EmailReceiptDialog;
