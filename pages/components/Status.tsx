import {MLabel} from '@cellebrite/design-system';
import {Theme, useTheme} from '@mui/material';
import {ReactNode} from 'react';

interface StatusProps {
  variant: string;
  children: ReactNode;
  size?: 'wide' | 'narrow';
}

export const getStatusColorMapping = (theme: Theme): Record<string, {color: string; backgroundColor: string}> => ({
  success: {color: theme.palette.ui.light, backgroundColor: theme.palette.ui.positive},
  warning: {color: theme.palette.ui.brandDark, backgroundColor: theme.palette.ui.warningLight},
  error: {color: theme.palette.ui.light, backgroundColor: theme.palette.ui.negativeHeavy},
  neutral: {color: theme.palette.ui.light, backgroundColor: theme.palette.ui.mutedDark},
});

export const Status = ({variant, size = 'wide', children}: StatusProps): JSX.Element => {
  const theme = useTheme();
  const {color, backgroundColor} = getStatusColorMapping(theme)[variant];

  return (
    <>
      <MLabel size={size} color={color} backgroundColor={backgroundColor}>
        {children}
      </MLabel>
    </>
  );
};
