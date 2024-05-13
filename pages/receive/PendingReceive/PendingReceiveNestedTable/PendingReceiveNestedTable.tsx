import {NestedTable} from 'pages/components/NestedTable';
import {Submission} from 'types/receive';
import useGetColumns, {ColumnField} from './useGetColumns';
import uniqueId from 'lodash-es/uniqueId';

export const PendingReceiveNestedItemsTable = ({
  disableVirtualization,
  row,
}: {
  disableVirtualization?: boolean;
  row: Submission;
}): JSX.Element => {
  const columns = useGetColumns();

  const rows = row.items.map((item) => ({
    id: uniqueId(),
    [ColumnField.itemId]: item.id,
    [ColumnField.itemType]: item.type,
    [ColumnField.itemDescription]: item.description,
    [ColumnField.assignmentType]: item.assignmentType,
    [ColumnField.dangerFlag]: item.dangerFlag,
  }));

  return <NestedTable disableVirtualization={disableVirtualization} columns={columns} rows={rows} />;
};
