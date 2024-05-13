import {Box, styled} from '@mui/system';
import {MButton} from '@cellebrite/design-system';
import {useTranslation} from 'react-i18next';

const StepFooterStyled = styled(Box)(({theme}) => ({
  width: '100%',
  display: 'flex',
  padding: theme.spacing(2),
  justifyContent: 'space-between',
  '& .MuiButton-root': {
    width: 100,
  },
  borderTop: `1px solid ${theme.palette.ui.mutedSoft}`,
}));

interface StepFooterProps {
  disablePrevious?: boolean;
}

interface StepFooterProps {
  onNextClick?: () => void;
  onPreviousClick?: () => void;
  disablePrevious?: boolean;
}

export const StepFooter = ({onNextClick, onPreviousClick, disablePrevious}: StepFooterProps): JSX.Element => {
  const {t} = useTranslation();
  return (
    <StepFooterStyled>
      <MButton onClick={onPreviousClick} disabled={disablePrevious} variant="outlined" data-testid={'previous-button'}>
        {t('common.previous')}
      </MButton>
      <MButton onClick={onNextClick} variant="contained" data-testid={'next-button'}>
        {t('common.next')}
      </MButton>
    </StepFooterStyled>
  );
};
