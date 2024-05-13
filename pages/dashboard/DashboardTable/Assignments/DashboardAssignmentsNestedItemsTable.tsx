import useGetColumns, {ColumnField} from '../Items/useGetColumns';
import {Assignment} from 'types/assignment';
import {GridRowsProp} from '@mui/x-data-grid-pro';
import {NestedTable} from '../../../components/NestedTable';
import {getItemRows} from '../Items/useGetRows';

export const DashboardAssignmentsNestedItemsTable = ({
  row,
  disableVirtualization = false,
}: {
  row: Assignment;
  disableVirtualization?: boolean;
}): JSX.Element => {
  const fields = [
    ColumnField.itemId,
    ColumnField.location,
    ColumnField.itemType,
    ColumnField.itemDescription,
    ColumnField.dangerFlag,
    ColumnField.itemStatus,
    ColumnField.lastUpdated,
    ColumnField.caseOfficer,
    ColumnField.itemCreationDate,
    ColumnField.actions,
  ];

  const columns = useGetColumns()
    .filter((column) => fields.includes(column.field as ColumnField))
    .map((column) => ({
      ...column,
    }));

  const rows: GridRowsProp = row.items.map(getItemRows);

  return <NestedTable disableVirtualization={disableVirtualization} columns={columns} rows={rows} />;
};
