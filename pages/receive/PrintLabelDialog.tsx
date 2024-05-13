import {useEffect} from 'react';
import {Box, Button, Typography, styled, useTheme} from '@mui/material';
import {MButton, ItemIcon, FileIcon} from '@cellebrite/design-system';
import {map} from 'lodash-es';
import {useTranslation} from 'react-i18next';

interface PrintLabelItemProps {
  itemCode: string;
}

const PrintContentContainer = styled(Box)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(3),
}));

const PrintLabelItemContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

const PrintLabelItemHeader = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});

const PrintLabelItemTitle = styled(Box)(({theme}) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const PrintLabelItem = styled(Box)(({theme}) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  backgroundColor: 'white',
  borderRadius: theme.shape.borderRadius,
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  border: `1px solid ${theme.palette.ui.mutedHover}`,
  width: '100%',
}));

const PrintItemIcon = styled(ItemIcon)({
  width: '32px',
  height: '32px',
});

const PrintFileIcon = styled(FileIcon)({
  width: '48px',
  height: '48px',
  path: {
    fill: '#BDC3C8',
  },
});

const PrintItem = (props: PrintLabelItemProps): JSX.Element => {
  const {t} = useTranslation();
  const theme = useTheme();

  useEffect(() => {
    document.title = t('evidence.receive.step4.print.title');
  }, [t]);

  const handlePrint = (): void => {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const left = (screenWidth - 776) / 2;
    const top = (screenHeight - 638) / 2;

    const printDialog = window.open('', '_blank', `width=776,height=638,left=${left},top=${top}`);
    printDialog?.window.print();
  };

  const PrintLabelSection = ({sectionText}: {sectionText: string}): JSX.Element => (
    <PrintLabelItem>
      <Box display="flex" flexDirection="row" alignItems="center">
        <PrintFileIcon />
        <Typography variant="textMedium">{sectionText}</Typography>
      </Box>
      <Box display="flex" flexDirection="row" gap={1.5}>
        <MButton variant="text">{t('evidence.receive.step4.print.preview')}</MButton>
        <MButton variant="text" onClick={handlePrint}>
          {t('evidence.receive.step4.print.print')}
        </MButton>
      </Box>
    </PrintLabelItem>
  );

  return (
    <PrintLabelItemContainer>
      <Box display="flex" flexDirection="column" gap={1}>
        <PrintLabelItemHeader>
          <PrintLabelItemTitle>
            <PrintItemIcon fill={theme.palette.ui.mutedDark} />
            <Typography variant="xLargeMedium">Item {props.itemCode}</Typography>
          </PrintLabelItemTitle>
          <Button variant="outlined">{t('evidence.receive.step4.print.print3Labels')}</Button>
        </PrintLabelItemHeader>
        <PrintLabelSection sectionText={t('evidence.receive.step4.print.caseLabel')} />
        <PrintLabelSection sectionText={t('evidence.receive.step4.print.itemLabel')} />
        <PrintLabelSection sectionText={t('evidence.receive.step4.print.microLabel')} />
      </Box>
    </PrintLabelItemContainer>
  );
};

const PrintLabelDialog = (): JSX.Element => {
  const {t} = useTranslation();

  const submissionItems = JSON.parse(localStorage.getItem('Submission Items') ?? '[]');

  const handleALlLabelsPrint = (): void => {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const left = (screenWidth - 776) / 2;
    const top = (screenHeight - 638) / 2;

    const printDialog = window.open('', '_blank', `width=776,height=638,left=${left},top=${top}`);
    printDialog?.window.print();
  };

  return (
    <Box>
      <PrintContentContainer gap={3}>
        {map(submissionItems, (item) => (
          <PrintItem key={item.id} itemCode={`${item.id}`} />
        ))}
      </PrintContentContainer>
      <Box display="flex" justifyContent="flex-end" px={3} paddingBottom={3}>
        <Button variant="contained" onClick={handleALlLabelsPrint}>
          {t('evidence.receive.step4.print.printAllLabels', {count: (submissionItems ?? []).length * 3})}
        </Button>
      </Box>
    </Box>
  );
};

export default PrintLabelDialog;
