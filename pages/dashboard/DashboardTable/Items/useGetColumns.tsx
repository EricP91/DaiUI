import {GridColumns} from '@mui/x-data-grid-pro';
import {useTranslation} from 'react-i18next';
import {ItemStatusCellRenderer} from './CellRenderer/ItemStatusCellRenderer';
import {MButton} from '@cellebrite/design-system';
import {DateValueFormatter} from '../utils/date-value-formatter';
import ItemsActionsColumnMenu from './ItemsActionsColumnMenu';
import {Stack} from '@mui/material';

export enum ColumnField {
  itemId = 'id',
  location = 'location',
  labCaseId = 'labCaseID',
  submittingAgency = 'submittingAgency',
  caseType = 'caseType',
  itemType = 'type',
  itemDescription = 'description',
  dangerFlag = 'dangerFlag',
  itemStatus = 'status',
  incidentNumber = 'incidentCaseNumber',
  lastUpdated = 'modifiedDate',
  caseOfficer = 'caseOfficer',
  itemCreationDate = 'createdAt',
  assignments = 'assignments',
  name1 = 'name1',
  association1 = 'association1',
  name2 = 'name2',
  association2 = 'association2',
  name3 = 'name3',
  association3 = 'association3',
  name4 = 'name4',
  association4 = 'association4',
  actions = 'actions',
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
      field: ColumnField.location,
      filterable: false,
      minWidth: 120,
      headerName: t('dashboard.table.items.columns.location'),
      flex: 1,
    },
    {
      field: ColumnField.labCaseId,
      filterable: false,
      minWidth: 135,
      headerName: t('dashboard.table.labCaseId'),
      flex: 1,
    },
    {
      field: ColumnField.submittingAgency,
      filterable: false,
      minWidth: 190,
      headerName: t('common.table.submittingAgency'),
      flex: 1,
    },
    {
      field: ColumnField.caseType,
      filterable: false,
      minWidth: 123,
      headerName: t('common.table.caseType'),
      flex: 1,
    },
    {
      field: ColumnField.itemType,
      filterable: false,
      minWidth: 123,
      headerName: t('dashboard.table.items.columns.itemType'),
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
      field: ColumnField.dangerFlag,
      filterable: false,
      minWidth: 160,
      headerName: t('dashboard.table.items.columns.dangerFlag'),
      flex: 1,
    },
    {
      field: ColumnField.itemStatus,
      filterable: false,
      hide: false,
      minWidth: 250,
      renderCell: ItemStatusCellRenderer,
      headerName: t('dashboard.table.items.columns.itemStatus'),
      flex: 1,
    },
    {
      field: ColumnField.lastUpdated,
      filterable: false,
      minWidth: 180,
      headerName: t('dashboard.table.lastUpdated'),
      flex: 1,
      valueFormatter: DateValueFormatter,
    },
    {
      field: ColumnField.incidentNumber,
      filterable: false,
      minWidth: 200,
      headerName: t('common.table.incidentNumber'),
      flex: 1,
    },
    {
      field: ColumnField.caseOfficer,
      filterable: false,
      minWidth: 150,
      headerName: t('common.table.caseOfficer'),
      flex: 1,
    },
    {
      field: ColumnField.itemCreationDate,
      filterable: false,
      minWidth: 150,
      headerName: t('dashboard.table.items.columns.itemCreationDate'),
      flex: 1,
      valueFormatter: DateValueFormatter,
    },
    {
      field: ColumnField.name1,
      filterable: false,
      minWidth: 150,
      headerName: t('dashboard.table.items.columns.name', {count: 1}),
      flex: 1,
    },
    {
      field: ColumnField.association1,
      filterable: false,
      minWidth: 150,
      headerName: t('dashboard.table.items.columns.association', {count: 1}),
      flex: 1,
    },
    {
      field: ColumnField.name2,
      filterable: false,
      minWidth: 150,
      headerName: t('dashboard.table.items.columns.name', {count: 2}),
      flex: 1,
    },
    {
      field: ColumnField.association2,
      filterable: false,
      minWidth: 150,
      headerName: t('dashboard.table.items.columns.association', {count: 2}),
      flex: 1,
    },
    {
      field: ColumnField.name3,
      filterable: false,
      minWidth: 150,
      headerName: t('dashboard.table.items.columns.name', {count: 3}),
      flex: 1,
    },
    {
      field: ColumnField.association3,
      filterable: false,
      minWidth: 150,
      headerName: t('dashboard.table.items.columns.association', {count: 3}),
      flex: 1,
    },
    {
      field: ColumnField.name4,
      filterable: false,
      sortable: false,
      minWidth: 150,
      headerName: t('dashboard.table.items.columns.name', {count: 4}),
      flex: 1,
    },
    {
      field: ColumnField.association4,
      filterable: false,
      sortable: false,
      minWidth: 150,
      headerName: t('dashboard.table.items.columns.association', {count: 4}),
      flex: 1,
    },
    {
      field: ColumnField.actions,
      headerName: t('dashboard.table.actions'),
      filterable: false,
      sortable: false,
      resizable: false,
      minWidth: 140,
      flex: 1,
      renderCell: () => {
        return (
          <Stack flexDirection="row" justifyContent="center" alignItems="center">
            <MButton color="primary" variant="text">
              {t('dashboard.table.view')}
            </MButton>
            <ItemsActionsColumnMenu />
          </Stack>
        );
      },
    },
  ];
};

export default useGetColumns;
