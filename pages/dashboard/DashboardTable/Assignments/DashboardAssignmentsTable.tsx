import useGetColumns, {ColumnField} from './useGetColumns';
import useGetRows from './useGetRows';
import {DashboardTable, GetRowsResult} from '../DashboardTable';
import {AssignmentSection} from 'types/search-request';
import {DashboardAssignmentsNestedItemsTable} from './DashboardAssignmentsNestedItemsTable';
import {useCallback} from 'react';
import {GridColumns, GridRowParams, GridSortModel} from '@mui/x-data-grid-pro';
import {useAssignmentTableStore} from 'store/dashboard/table.store.ts/table.store';
import {DashboardTableCustomToolbar} from '../Toolbar/DashboardTableCustomToolbar';
import first from 'lodash-es/first';
import {ReportType} from 'types/report';

interface DashboardAssignmentTableProps {
  activeSection: AssignmentSection;
  disableVirtualization?: boolean;
}

interface SortColumnsBySectionParams {
  columns: GridColumns;
  activeSection: AssignmentSection;
  visibleColumnIndexLimit: number;
}

const sortColumnsBySection = ({
  columns,
  activeSection,
  visibleColumnIndexLimit,
}: SortColumnsBySectionParams): GridColumns => {
  if (activeSection === AssignmentSection.MyAssignments) {
    const analystIndex = columns.findIndex((column) => column.field === ColumnField.analyst);
    const [removedItem] = columns.splice(analystIndex, 1);
    columns.splice(visibleColumnIndexLimit, 0, removedItem);
    return columns;
  }

  return columns;
};

export const DashboardAssignmentsTable = ({
  activeSection,
  disableVirtualization = false,
}: DashboardAssignmentTableProps): JSX.Element => {
  const {
    setSelectedColumns,
    selectedColumns,
    searchQuery,
    setSearchQuery,
    sort,
    setSort,
    setRowsPerPage,
    rowsPerPage,
    filter,
    pageSectionMapping,
    setPageSectionMapping,
  } = useAssignmentTableStore();

  const page = pageSectionMapping[activeSection];
  const setPage = (selectedPage: number): void => {
    setPageSectionMapping({...pageSectionMapping, [activeSection]: selectedPage});
  };

  const searchRequest = {
    page: page + 1,
    rowsPerPage,
    assignmentSection: activeSection,
    search: searchQuery,
    sort: first(sort)?.field,
    order: first(sort)?.sort || undefined,
    filter,
  };

  const useGetRowsWrapper = (): GetRowsResult => {
    return useGetRows(searchRequest);
  };

  const visibleColumnIndexLimit = 10;
  const columns = useGetColumns();
  const sortedColumns = sortColumnsBySection({
    columns,
    activeSection,
    visibleColumnIndexLimit,
  });

  const handleSortModelChange = useCallback(
    (sortModel: GridSortModel) => {
      setSort(sortModel);
    },
    [setSort],
  );

  const visibleColumns =
    selectedColumns ||
    sortedColumns
      .filter((column) => column.field !== ColumnField.actions)
      .reduce((acc, column, index) => {
        return {...acc, [column.field]: index < visibleColumnIndexLimit};
      }, {});

  const initialState = {
    pinnedColumns: {
      right: [ColumnField.actions],
    },
  };

  const getDetailPanelContent = useCallback(
    ({row}: GridRowParams) => {
      return row.items.length ? (
        <DashboardAssignmentsNestedItemsTable disableVirtualization={disableVirtualization} row={row} />
      ) : undefined;
    },
    [disableVirtualization],
  );

  const getDetailPanelHeight = useCallback(() => 'auto', []);

  return (
    <>
      <DashboardTable
        sortModel={sort}
        onSortModelChange={handleSortModelChange}
        disableMultipleColumnsSorting
        components={{
          Toolbar: DashboardTableCustomToolbar,
        }}
        componentsProps={{
          toolbar: {
            columns,
            initialSelection: visibleColumns,
            onItemChange: setSelectedColumns,
            onSearch: setSearchQuery,
            reportType: ReportType.AssignmentsTable,
            searchRequest,
          },
        }}
        dataTestId={activeSection}
        columns={sortedColumns}
        columnVisibilityModel={visibleColumns}
        useGetRows={useGetRowsWrapper}
        onPageChange={setPage}
        pageSize={rowsPerPage}
        page={page}
        onPageSizeChange={setRowsPerPage}
        initialState={initialState}
        disableVirtualization={disableVirtualization}
        getDetailPanelContent={getDetailPanelContent}
        getDetailPanelHeight={getDetailPanelHeight}
      ></DashboardTable>
    </>
  );
};
