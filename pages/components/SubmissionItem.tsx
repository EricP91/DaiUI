import {MButton, OverflowTooltip} from '@cellebrite/design-system';
import {Box, Stack, Typography, styled, useTheme} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {ReceiveResponse} from 'types/receive';
import {ItemAvatar} from './ItemAvatar';

const BoxStyled = styled(Box)(({theme}) => ({
  padding: theme.spacing(2),
  boxShadow: '0px 16px 32px -4px rgba(145, 158, 171, 0.24), 0px 0px 2px 0px rgba(145, 158, 171, 0.24)',
  borderRadius: theme.spacing(1),
  backgroundColor: theme.palette.ui.light,
  width: '100%',
}));

export interface SubmissionItemProps extends Partial<ReceiveResponse> {
  onRemove?: (itemId?: string) => void;
  children?: React.ReactNode;
}

export const SubmissionItem = ({itemCode, itemDescription, onRemove, children}: SubmissionItemProps): JSX.Element => {
  const {t} = useTranslation();
  const theme = useTheme();

  return (
    <BoxStyled data-testid="submission-item">
      <Stack flexDirection="row" alignItems="center">
        <ItemAvatar />
        <Stack sx={{overflow: 'hidden', width: '100%'}} flexDirection="row" gap={2}>
          <Stack flexBasis={90}>
            <Typography noWrap color={theme.palette.ui.mutedDark} variant="smallMedium" display="block">
              {t('common.itemId')}
            </Typography>
            <Typography color={theme.palette.ui.brandDark} sx={{textTransform: 'uppercase'}} variant="textMedium">
              {itemCode}
            </Typography>
          </Stack>
          <Stack flexBasis={232} sx={{minWidth: 0}}>
            <Typography noWrap color={theme.palette.ui.mutedDark} variant="smallMedium">
              {t('common.itemDescription')}
            </Typography>
            <OverflowTooltip title={itemDescription || ''}>
              <Typography noWrap color={theme.palette.ui.brandDark} variant="textMedium">
                {itemDescription}
              </Typography>
            </OverflowTooltip>
          </Stack>
          <Stack flexBasis={258}>{children}</Stack>
        </Stack>
        {onRemove && (
          <MButton onClick={() => onRemove(itemCode)} variant="text">
            {t('common.remove')}
          </MButton>
        )}
      </Stack>
    </BoxStyled>
  );
};
