import useGetColumns, {ColumnField} from '../Assignments/useGetColumns';
import {getAssignmentRows} from '../Assignments/useGetRows';
import {Item} from 'types/items';
import {NestedTable} from '../../../components/NestedTable';
import {GridRowsProp} from '@mui/x-data-grid-pro';

export const DashboardItemsNestedAssignmentsTable = ({row}: {row: Item}): JSX.Element => {
  const fields = [
    ColumnField.assignmentType,
    ColumnField.assignmentStatus,
    ColumnField.lastUpdated,
    ColumnField.actions,
  ];

  const columns = useGetColumns().filter((column) => fields.includes(column.field as ColumnField));
  const rows: GridRowsProp = row.assignments.map((assignment) => getAssignmentRows(assignment));

  return <NestedTable columns={columns} rows={rows} />;
};
