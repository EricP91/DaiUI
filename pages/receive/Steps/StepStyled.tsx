import {Stack} from '@mui/material';
import {styled} from '@mui/system';

export const StepContainer = styled(Stack)(({theme}) => ({
  width: '100%',
  height: '100%',
  backgroundColor: theme.palette.ui.light,
  padding: 0,
  overflow: 'hidden',
}));
