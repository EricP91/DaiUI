import {GridToolbarContainer} from '@mui/x-data-grid-pro';
import DashboardTableColumnPicker, {DashboardTableColumnSelectorProps} from './DashboardTableColumnPicker';

import DashboardTableExportButton from './DashboardTableExportButton';
import DashboardTableResetFilters from './DashboardTableResetFilters';
import {AssignmentSearchRequest, ItemsSearchRequest} from 'types/search-request';
import {ReportType} from 'types/report';
import DashboardTableSearch, {DashboardTableSearchProps} from '../DashboardTableSearch';

type DashboardTableCustomToolbarProps = DashboardTableColumnSelectorProps &
  DashboardTableSearchProps & {searchRequest: AssignmentSearchRequest & ItemsSearchRequest} & {reportType: ReportType};

export const DashboardTableCustomToolbar = ({
  columns,
  initialSelection,
  onItemChange,
  onSearch,
  searchRequest,
  reportType,
}: DashboardTableCustomToolbarProps): JSX.Element => (
  <GridToolbarContainer sx={{flexFlow: 'row', padding: 2, '& .MuiTextField-root': {m: 0, width: 240}, gap: 1}}>
    <DashboardTableSearch onSearch={onSearch} />
    <DashboardTableResetFilters />
    <DashboardTableColumnPicker columns={columns} initialSelection={initialSelection} onItemChange={onItemChange} />
    <DashboardTableExportButton reportParams={searchRequest} reportType={reportType} />
  </GridToolbarContainer>
);
