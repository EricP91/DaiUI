import {useTheme} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import {IconButton} from '@mui/material';
import {Close as CloseIcon} from '@mui/icons-material';

const TransactionToast = ({onClose, text}: {onClose: () => void; text: string}): JSX.Element => {
  const theme = useTheme();

  const action = (
    <IconButton aria-label="close-toast" onClick={onClose}>
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <Snackbar open autoHideDuration={6000} onClose={onClose} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
      <Alert
        severity="success"
        variant="filled"
        sx={{width: '100%', backgroundColor: theme.palette.ui.positiveLightest, color: theme.palette.ui.positive}}
        action={action}
      >
        <Typography sx={{color: theme.palette.ui.brandDark}}>{text}</Typography>
      </Alert>
    </Snackbar>
  );
};

export default TransactionToast;
