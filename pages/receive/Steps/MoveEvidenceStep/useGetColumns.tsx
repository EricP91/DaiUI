import {GridColumns} from '@mui/x-data-grid-pro';
import {useTranslation} from 'react-i18next';

export enum ColumnField {
  itemId = 'id',
  location = 'location',
  labCaseId = 'labCaseID',
  incidentNumber = 'incidentNumber',
  itemDescription = 'description',
  itemType = 'type',
}

export const useGetColumns = (): GridColumns => {
  const {t} = useTranslation();

  return [
    {
      field: ColumnField.itemId,
      headerName: t('common.itemId'),
      filterable: false,
      sortable: false,
      minWidth: 99,
      flex: 1,
    },
    {
      field: ColumnField.labCaseId,
      filterable: false,
      sortable: false,
      minWidth: 135,
      headerName: t('dashboard.table.labCaseId'),
      flex: 1,
    },
    {
      field: ColumnField.incidentNumber,
      filterable: false,
      sortable: true,
      minWidth: 210,
      headerName: t('common.table.incidentNumber'),
      flex: 1,
    },
    {
      field: ColumnField.itemDescription,
      filterable: false,
      sortable: false,
      minWidth: 175,
      headerName: t('common.itemDescription'),
      flex: 1,
    },
    {
      field: ColumnField.location,
      filterable: false,
      sortable: false,
      minWidth: 120,
      headerName: t('dashboard.table.items.columns.location'),
      flex: 1,
    },
    {
      field: ColumnField.itemType,
      filterable: false,
      sortable: false,
      minWidth: 123,
      headerName: t('dashboard.table.items.columns.itemType'),
      flex: 1,
    },
  ];
};

export default useGetColumns;
