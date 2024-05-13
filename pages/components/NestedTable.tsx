import {MDataGridPro} from '@cellebrite/design-system';
import {useTheme} from '@mui/material';
import {GridColumns, GridRowsProp, useGridApiContext} from '@mui/x-data-grid-pro';
import React from 'react';
import {ColumnField} from '../dashboard/DashboardTable/Assignments/useGetColumns';
import {MDataGridProContainerStyled} from '../dashboard/DashboardTable/DashboardTable';

interface NestedTableProps {
  columns: GridColumns;
  rows: GridRowsProp;
  disableVirtualization?: boolean;
}

export const NestedTable = ({columns, rows, disableVirtualization}: NestedTableProps): JSX.Element => {
  const theme = useTheme();
  const apiRef = useGridApiContext();
  const [width, setWidth] = React.useState(() => {
    const dimensions = apiRef.current.getRootDimensions();
    return dimensions!.viewportInnerSize.width;
  });

  const handleViewportInnerSizeChange = React.useCallback(() => {
    const dimensions = apiRef.current.getRootDimensions();
    setWidth(dimensions!.viewportInnerSize.width);
  }, [apiRef]);

  React.useEffect(() => {
    return apiRef.current.subscribeEvent('viewportInnerSizeChange', handleViewportInnerSizeChange);
  }, [apiRef, handleViewportInnerSizeChange]);

  return (
    <MDataGridProContainerStyled
      data-testid="nested-table"
      sx={{padding: 1, background: theme.palette.ui.mutedSoft, left: 0, width, position: 'sticky'}}
    >
      <MDataGridPro
        sx={{backgroundColor: theme.palette.ui.light, padding: 2}}
        autoHeight
        initialState={{pinnedColumns: {right: [ColumnField.actions]}}}
        disableExtendRowFullWidth={true}
        disableSelectionOnClick={true}
        disableVirtualization={disableVirtualization}
        columns={columns}
        rows={rows}
        pagination={false}
        hideFooter={true}
      />
    </MDataGridProContainerStyled>
  );
};
