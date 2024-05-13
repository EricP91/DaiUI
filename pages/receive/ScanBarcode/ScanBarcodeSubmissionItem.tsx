import {OverflowTooltip} from '@cellebrite/design-system';
import {Typography, useTheme} from '@mui/material';
import {t} from 'i18next';
import {SubmissionItem, SubmissionItemProps} from 'pages/components/SubmissionItem';

const ScanBarcodeSubmissionItem = ({services, ...props}: SubmissionItemProps): JSX.Element => {
  const theme = useTheme();
  const serviceRequired = services?.map((service) => service.name).join(', ');
  return (
    <SubmissionItem {...props}>
      <OverflowTooltip title={serviceRequired || ''}>
        <Typography noWrap color={theme.palette.ui.mutedDark} display="block" variant="smallMedium">
          {t('evidence.scan.dialog.submissionItem.serviceRequired')}
        </Typography>
      </OverflowTooltip>
      <Typography noWrap variant="textMedium">
        {serviceRequired}
      </Typography>
    </SubmissionItem>
  );
};

export default ScanBarcodeSubmissionItem;
