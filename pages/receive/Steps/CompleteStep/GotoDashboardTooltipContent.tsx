import {useTranslation} from 'react-i18next';
import {Box, Typography, useTheme, styled} from '@mui/material';
import ScanBarcodeImage from './assets/scan-barcode.svg?react';
import {MButton} from '@cellebrite/design-system';

const TooltipContainer = styled(Box)(({theme}) => ({
  alignItems: 'center',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.ui.light,
  boxShadow: '0px 24px 48px 0px rgba(145, 158, 171, 0.24), 0px 0px 4px 0px rgba(145, 158, 171, 0.24)',
  display: 'flex',
  gap: theme.spacing(4),
  height: '124px',
  justifyContent: 'flex-end',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(1),
}));

const TooltipContent = styled(Box)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
}));

const GotoDashboardTooltipContent = (): JSX.Element => {
  const theme = useTheme();
  const {t} = useTranslation();

  return (
    <TooltipContainer data-testid="gotoDashboard-tooltip">
      <ScanBarcodeImage />
      <TooltipContent>
        <Box display="flex" flexDirection="column">
          <Typography variant="button">{t('evidence.receive.step5.tooltip.title')}</Typography>
          <Typography variant="text" color={theme.palette.ui.mutedDark}>
            {t('evidence.receive.step5.tooltip.content')}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <MButton variant="outlined">{t('evidence.receive.step5.tooltip.button')}</MButton>
        </Box>
      </TooltipContent>
    </TooltipContainer>
  );
};

export default GotoDashboardTooltipContent;
