import {GridColumns} from '@mui/x-data-grid-pro';
import {useTranslation} from 'react-i18next';

export enum ColumnField {
  itemId = 'itemId',
  itemType = 'itemType',
  submittingAgency = 'submittingAgency',
  itemDescription = 'itemDescription',
  assignmentType = 'assignmentType',
  dangerFlag = 'dangerFlag',
}

const useGetColumns = (): GridColumns => {
  const {t} = useTranslation();

  return [
    {
      field: ColumnField.itemId,
      headerName: t('common.itemId'),
      filterable: false,
      minWidth: 99,
      flex: 1,
    },
    {
      field: ColumnField.itemType,
      filterable: false,
      minWidth: 123,
      headerName: t('common.table.itemType'),
      flex: 1,
    },
    {
      field: ColumnField.itemDescription,
      filterable: false,
      minWidth: 175,
      headerName: t('common.itemDescription'),
      flex: 1,
    },
    {
      field: ColumnField.assignmentType,
      filterable: false,
      minWidth: 175,
      headerName: t('common.table.assignmentType'),
      flex: 1,
    },
    {
      field: ColumnField.dangerFlag,
      filterable: false,
      minWidth: 160,
      headerName: t('dashboard.table.items.columns.dangerFlag'),
      flex: 1,
    },
  ];
};

export default useGetColumns;
