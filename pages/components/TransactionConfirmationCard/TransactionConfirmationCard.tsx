import React from 'react';
import {Box, Typography, useTheme} from '@mui/material';

const TransactionConfirmationCard = ({title, children}: {title: string; children?: React.ReactNode}): JSX.Element => {
  const theme = useTheme();
  return (
    <Box sx={{display: 'flex', flex: 1, flexDirection: 'column'}}>
      <Box
        sx={{
          padding: 2,
          width: '100%',
          backgroundColor: theme.palette.ui.mutedSoft,
          borderRadius: 1,
          alignItems: 'center',
        }}
      >
        <Typography>{title}</Typography>
      </Box>
      <Box sx={{display: 'flex', flex: 1}}>{children}</Box>
    </Box>
  );
};

export default TransactionConfirmationCard;
