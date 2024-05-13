import {MCheckbox, MDataGridPro, TableSkeleton} from '@cellebrite/design-system';
import {useGetColumns} from './useGetColumns';
import {forwardRef, useState} from 'react';
import {AddItemTableToolbar} from './AddItemTableToolbar';
import {useTranslation} from 'react-i18next';
import {Box} from '@mui/system';
import {Item} from 'types/items';
import {styled} from '@mui/material';

const MDataGridProContainerStyled = styled(Box)(({theme}) => ({
  '& .MuiDataGrid-columnHeaderTitle': {
    color: theme.palette.ui.mutedDark,
    textTransform: 'uppercase',
  },
  '& .MuiDataGrid-detailPanelToggleCell.Mui-disabled': {
    display: 'none',
  },
  '& .MuiDataGrid-sortIcon': {
    opacity: 'inherit !important',
  },
  '& .MuiDataGrid-iconButtonContainer': {
    visibility: 'visible',
  },
}));

const AddItemDialogContent = ({
  pendingItems,
  onSelectItems,
}: {
  pendingItems: Item[] | undefined;
  onSelectItems: (ids?: string[]) => void;
  disableVirtualization?: boolean;
}): JSX.Element => {
  const columns = useGetColumns();
  //const {data: pendingSubmissions, isLoading} = useGetPendingSubmissions();
  const rows =
    pendingItems
      ?.map((item: Item) => ({
        ...item,
        labCaseID: 'PDE22-00468',
        incidentNumber: item.incidentCaseNumber,
      }))
      .flat() || [];

  const {t} = useTranslation();
  const [pageSize, setPageSize] = useState(10);
  const rowsPerPage = [10, 25, 50, 100];

  return (
    <MDataGridProContainerStyled>
      <MDataGridPro
        loadingOverlayPlaceHolder={{
          content: <TableSkeleton rowsNumber={pageSize} />,
          props: {
            sx: {
              height: '100%',
              width: '100%',
            },
          },
        }}
        columns={columns}
        checkboxSelection={true}
        onSelectionModelChange={(ids) => {
          onSelectItems(ids as string[]);
        }}
        rows={rows}
        rowCount={rows.length}
        sx={{
          minHeight: 590,
          '& .MuiDataGrid-detailPanel': {
            overflow: 'visible',
          },
        }}
        pagination
        rowHeight={40}
        headerHeight={40}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
        rowsPerPageOptions={rowsPerPage}
        components={{
          BaseCheckbox: forwardRef((props, ref) => (
            <Box ref={ref}>
              <MCheckbox {...props} data-testid="item-checkbox" />
            </Box>
          )),
          Toolbar: AddItemTableToolbar,
        }}
        componentsProps={{
          toolbar: {
            placeholder: t('evidence.pendingReceive.searchPlaceholder'),
          },
        }}
      />
    </MDataGridProContainerStyled>
  );
};

export default AddItemDialogContent;
