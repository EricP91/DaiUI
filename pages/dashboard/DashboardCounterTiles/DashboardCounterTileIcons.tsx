import {PendingReviewIcon, ItemIcon, UnclaimedAssignmentsIcon, ActiveAssignmentsIcon} from '@cellebrite/design-system';
import {styled, Theme, useTheme} from '@mui/system';
import {HTMLAttributes} from 'react';

interface DashboardCounterTileIconProps extends HTMLAttributes<HTMLDivElement> {
  color: 'info' | 'success' | 'warning' | 'error';
}

const getBackgroundColorMapping = (theme: Theme): Record<string, string> => ({
  error: theme.palette.ui.negativeSoft,
  success: '#ECF7F0',
  warning: '#FFE8DD',
  info: '#E4EBFF',
});

const DashboardCounterTileIconStyled = styled('div', {
  shouldForwardProp: (propName: string) => !['color'].includes(propName),
})<DashboardCounterTileIconProps>(({theme, color}) => ({
  height: 40,
  width: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: theme.spacing(1),
  backgroundColor: getBackgroundColorMapping(theme)[color],
  '& svg': {
    height: 40,
    width: 40,
    color: theme.palette.ui.primary,
  },
}));

const DashboardCounterTileIcon = ({color, ...rest}: DashboardCounterTileIconProps): JSX.Element => {
  const theme = useTheme();
  return (
    <DashboardCounterTileIconStyled color={color} {...rest}>
      {color === 'error' && <ItemIcon fill={theme.palette.ui.negativeLight} />}
      {color === 'warning' && <UnclaimedAssignmentsIcon fill={theme.palette.ui.warningLight} />}
      {color === 'success' && <ActiveAssignmentsIcon fill={theme.palette.ui.positiveLight} />}
      {color === 'info' && <PendingReviewIcon fill="#6884D9" />}
    </DashboardCounterTileIconStyled>
  );
};

export default DashboardCounterTileIcon;
