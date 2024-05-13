import {Chip, styled} from '@mui/material';

export const ChipStyled = styled(Chip)(({theme}) => ({
  '&.MuiChip-root': {
    display: 'flex',
    height: 24,
    alignItems: 'center',
    backgroundColor: theme.palette.ui.brandLightest,
    border: `1px solid ${theme.palette.ui.brand}`,
    borderRadius: theme.spacing(5),
  },
  '& .MuiChip-deleteIcon': {
    color: theme.palette.ui.brand,
  },
  '& .MuiChip-deleteIcon:hover': {
    color: theme.palette.ui.brand,
  },
  '& .MuiChip-label': {
    marginTop: 0,
    color: theme.palette.ui.brand,
    ...theme.typography.textMedium,
  },
}));
