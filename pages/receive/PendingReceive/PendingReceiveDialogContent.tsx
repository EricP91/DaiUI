import {MCheckbox, MDataGridPro, TableSkeleton} from '@cellebrite/design-system';
import {KeyboardArrowRight, KeyboardArrowDown} from '@mui/icons-material';
import {ColumnField, useGetColumns} from './useGetColumns';
import {forwardRef, useCallback, useState} from 'react';
import {GridRowParams} from '@mui/x-data-grid-pro';
import {PendingReceiveNestedItemsTable} from './PendingReceiveNestedTable/PendingReceiveNestedTable';
import {MDataGridProContainerStyled} from 'pages/dashboard/DashboardTable/DashboardTable';
import {PendingReceiveTableToolbar} from './PendingReceiveTableToolbar';
import {useTranslation} from 'react-i18next';
import {useGetPendingSubmissions} from 'api/receive';
import {mapPendingSubmissionsToTableRows} from './util/pending-submission.mapper';
import {Box} from '@mui/system';
import {Submission} from 'types/receive';

const PendingReceiveDialogContent = ({
  disableVirtualization = false,
  onSubmissionSelect = () => {},
}: {
  onSubmissionSelect?: (submissions?: Submission[]) => void;
  disableVirtualization?: boolean;
}): JSX.Element => {
  const columns = useGetColumns();
  const {data: pendingSubmissions, isLoading} = useGetPendingSubmissions();
  const rows = mapPendingSubmissionsToTableRows(pendingSubmissions);

  const {t} = useTranslation();
  const [pageSize, setPageSize] = useState(10);
  const rowsPerPage = [10, 25, 50, 100];
  const getDetailPanelHeight = useCallback(() => 'auto', []);
  const getDetailPanelContent = useCallback(
    ({row}: GridRowParams) => {
      return row.items?.length ? (
        <PendingReceiveNestedItemsTable disableVirtualization={disableVirtualization} row={row} />
      ) : undefined;
    },
    [disableVirtualization],
  );

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
        loading={!!isLoading}
        columns={columns}
        checkboxSelection={true}
        onSelectionModelChange={(ids) => {
          const selectedSubmission = pendingSubmissions?.filter((submission) => ids.includes(submission.id));
          onSubmissionSelect(selectedSubmission);
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
          DetailPanelExpandIcon: KeyboardArrowRight,
          DetailPanelCollapseIcon: KeyboardArrowDown,
          BaseCheckbox: forwardRef((props, ref) => (
            <Box ref={ref}>
              <MCheckbox {...props} />
            </Box>
          )),
          Toolbar: PendingReceiveTableToolbar,
        }}
        componentsProps={{
          toolbar: {
            placeholder: t('evidence.pendingReceive.searchPlaceholder'),
          },
        }}
        columnVisibilityModel={{[ColumnField.items]: false}}
        getDetailPanelContent={getDetailPanelContent}
        getDetailPanelHeight={getDetailPanelHeight}
        disableVirtualization={disableVirtualization}
      />
    </MDataGridProContainerStyled>
  );
};

export default PendingReceiveDialogContent;
