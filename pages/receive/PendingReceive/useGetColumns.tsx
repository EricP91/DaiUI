import {ContactAvatar} from '@cellebrite/design-system';
import {Link, Box} from '@mui/material';
import {GridCellParams, GridColumns} from '@mui/x-data-grid-pro';
import {useTranslation} from 'react-i18next';

export enum ColumnField {
  incidentNumber = 'incidentNumber',
  submittingAgency = 'submittingAgency',
  caseType = 'caseType',
  caseClass = 'caseClass',
  caseOfficer = 'caseOfficer',
  filesAttached = 'filesAttached',
  packingSlip = 'packingSlip',
  items = 'items',
}

const getApplyQuickFilterFn = (value: string) => {
  return (params: GridCellParams): boolean => {
    return JSON.stringify(params.value).toLowerCase().includes(value.toLowerCase());
  };
};

export const useGetColumns = (): GridColumns => {
  const {t} = useTranslation();
  return [
    {
      field: ColumnField.incidentNumber,
      headerName: t('common.table.incidentNumber'),
      filterable: false,
      minWidth: 99,
      flex: 1,
    },
    {
      field: ColumnField.submittingAgency,
      filterable: false,
      minWidth: 120,
      headerName: t('common.table.submittingAgency'),
      flex: 1,
    },
    {
      field: ColumnField.caseType,
      filterable: false,
      minWidth: 135,
      headerName: t('common.table.caseType'),
      flex: 1,
    },
    {
      field: ColumnField.caseClass,
      filterable: false,
      minWidth: 190,
      headerName: t('evidence.pendingReceive.table.columns.caseClass'),
      flex: 1,
    },
    {
      field: ColumnField.caseOfficer,
      filterable: false,
      minWidth: 123,
      headerName: t('common.table.caseOfficer'),
      flex: 1,
      renderCell: (params: GridCellParams) => {
        return (
          <>
            <ContactAvatar size="smaller" name={params.value} />
            <Box sx={{ml: 1}}>{params.value}</Box>
          </>
        );
      },
    },
    {
      field: ColumnField.filesAttached,
      filterable: false,
      minWidth: 180,
      headerName: t('evidence.pendingReceive.table.columns.filesAttached'),
      flex: 1,
    },
    {
      field: ColumnField.packingSlip,
      filterable: false,
      minWidth: 200,
      headerName: t('evidence.pendingReceive.table.columns.packingSlip'),
      flex: 1,
      getApplyQuickFilterFn,
      renderCell: (params: GridCellParams) => {
        return (
          <>
            <Link target="_blank" href={params.value.url} underline="hover">
              {params.value.name}
            </Link>
          </>
        );
      },
    },
    {
      field: ColumnField.items,
      filterable: false,
      minWidth: 200,
      headerName: t('Items'),
      flex: 1,
      getApplyQuickFilterFn,
    },
  ];
};
