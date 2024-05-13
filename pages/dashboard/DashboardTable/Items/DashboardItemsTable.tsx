import useGetColumns, {ColumnField} from './useGetColumns';
import useGetRows from './useGetRows';
import {DashboardTable, GetRowsResult} from '../DashboardTable';
import {ItemSection} from 'types/search-request';
import {GridColumnVisibilityModel, GridRowParams, GridSortModel} from '@mui/x-data-grid-pro';
import {DashboardItemsNestedAssignmentsTable} from './DashboardItemsNestedAssignmentsTable';
import {useItemsTableStore} from 'store/dashboard/table.store.ts/table.store';
import {DashboardTableCustomToolbar} from '../Toolbar/DashboardTableCustomToolbar';
import {useCallback} from 'react';
import first from 'lodash-es/first';
import {ReportType} from 'types/report';

interface DashboardItemsTableProps {
  activeSection: ItemSection;
  disableVirtualization?: boolean;
}

export const DashboardItemsTable = ({
  activeSection,
  disableVirtualization = false,
}: DashboardItemsTableProps): JSX.Element => {
  const {
    setSelectedColumns,
    selectedColumns,
    setSearchQuery,
    searchQuery,
    sort,
    setSort,
    rowsPerPage,
    setRowsPerPage,
    pageSectionMapping,
    setPageSectionMapping,
  } = useItemsTableStore();

  const page = pageSectionMapping[activeSection];
  const setPage = (selectedPage: number): void => {
    setPageSectionMapping({...pageSectionMapping, [activeSection]: selectedPage});
  };

  const searchRequest = {
    rowsPerPage,
    page: page + 1,
    itemsSection: activeSection,
    search: searchQuery,
    sort: first(sort)?.field,
    order: first(sort)?.sort || undefined,
  };

  const useGetRowsWrapper = (): GetRowsResult => useGetRows(searchRequest);

  const columns = useGetColumns();

  const handleSortModelChange = useCallback(
    (sortModel: GridSortModel) => {
      setSort(sortModel);
    },
    [setSort],
  );

  const visibleColumns =
    selectedColumns ||
    columns
      .filter((column) => column.field !== ColumnField.actions)
      .reduce((acc, currentValue, index) => {
        return {...acc, [currentValue.field]: index < 10};
      }, {});

  const initialState = {
    pinnedColumns: {
      right: [ColumnField.actions],
    },
  };

  const getDetailPanelContent = useCallback(
    ({row}: GridRowParams) => <DashboardItemsNestedAssignmentsTable row={row} />,
    [],
  );

  const getDetailPanelHeight = useCallback(() => 'auto', []);

  return (
    <>
      <DashboardTable
        sortModel={sort}
        onSortModelChange={handleSortModelChange}
        dataTestId={activeSection}
        columns={columns}
        components={{
          Toolbar: DashboardTableCustomToolbar,
        }}
        componentsProps={{
          toolbar: {
            columns,
            initialSelection: visibleColumns,
            onItemChange: setSelectedColumns,
            onSearch: setSearchQuery,
            reportType: ReportType.ItemsTable,
            searchRequest,
          },
        }}
        useGetRows={useGetRowsWrapper}
        onPageChange={setPage}
        pageSize={rowsPerPage}
        page={page}
        onPageSizeChange={setRowsPerPage}
        initialState={initialState}
        columnVisibilityModel={visibleColumns as GridColumnVisibilityModel}
        disableVirtualization={disableVirtualization}
        getDetailPanelContent={getDetailPanelContent}
        getDetailPanelHeight={getDetailPanelHeight}
      ></DashboardTable>
    </>
  );
};
