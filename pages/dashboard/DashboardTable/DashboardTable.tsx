import {MDataGridPro, MDataGridProProps, TableSkeleton} from '@cellebrite/design-system';
import {Box} from '@mui/system';
import {styled} from '@mui/material';
import {GridRowsProp} from '@mui/x-data-grid-pro';
import {KeyboardArrowRight, KeyboardArrowDown} from '@mui/icons-material';

export interface GetRowsResult {
  totalCount: number;
  rows: GridRowsProp;
  isLoading: boolean;
  isPreviousData: boolean;
}

export interface DashboardTableProps extends Partial<MDataGridProProps> {
  useGetRows: () => GetRowsResult;
  dataTestId?: string;
}

export const MDataGridProContainerStyled = styled(Box)(({theme}) => {
  return {
    '& .MuiDataGrid-columnHeaderTitle': {
      color: theme.palette.ui.mutedDark,
      textTransform: 'uppercase',
    },
    '& .MuiDataGrid-detailPanelToggleCell.Mui-disabled': {
      display: 'none',
    },
  };
});

export const DashboardTable = ({
  useGetRows,
  dataTestId = '',
  columns = [],
  pageSize = 10,
  ...rest
}: DashboardTableProps): JSX.Element => {
  const {rows, totalCount, isLoading, isPreviousData} = useGetRows();
  const rowsPerPage = [10, 25, 50, 100];

  return (
    <MDataGridProContainerStyled data-testid={dataTestId}>
      <MDataGridPro
        sx={{
          minHeight: 586,
          '& .MuiDataGrid-detailPanel': {
            overflow: 'visible',
          },
        }}
        loading={!!isLoading || !!isPreviousData}
        loadingOverlayPlaceHolder={{
          content: <TableSkeleton rowsNumber={pageSize} />,
          props: {
            sx: {
              height: '100%',
              width: '100%',
            },
          },
        }}
        pageSize={pageSize}
        rowHeight={40}
        headerHeight={40}
        paginationMode="server"
        sortingMode="server"
        rowCount={totalCount}
        columns={columns}
        rows={isPreviousData ? [] : rows}
        pagination
        rowsPerPageOptions={rowsPerPage}
        {...rest}
        components={{
          DetailPanelExpandIcon: KeyboardArrowRight,
          DetailPanelCollapseIcon: KeyboardArrowDown,
          ...rest.components,
        }}
      />
    </MDataGridProContainerStyled>
  );
};
