import {GridColumns} from '@mui/x-data-grid-pro';
import {Box, Typography, useTheme} from '@mui/material';
import {ContactAvatar} from '@cellebrite/design-system';

const useGetColumns: () => GridColumns = (): GridColumns => {
  const theme = useTheme();
  return [
    {
      field: 'itemId',
      headerName: 'ITEM ID',
      filterable: false,
      flex: 1,
      renderCell: (param) => {
        return (
          <Typography color={theme.palette.ui.brand} fontSize={'14px'}>
            {param.value}
          </Typography>
        );
      },
    },
    {
      field: 'date',
      headerName: 'DATE',
      flex: 1,
    },
    {
      field: 'user',
      headerName: 'USER',
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <ContactAvatar size="smaller" name={params.value.toUpperCase()} />
            <Box sx={{ml: 1}}>{params.value}</Box>
          </>
        );
      },
    },
    {
      field: 'sourceLocation',
      headerName: 'SOURCE LOCATION',
      flex: 1,
    },
    {
      field: 'location',
      headerName: 'LOCATION',
      flex: 1,
    },
  ];
};

export default useGetColumns;
