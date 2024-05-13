import {MButton} from '@cellebrite/design-system';
import {GridColumns, GridRenderCellParams} from '@mui/x-data-grid-pro';
import {useTranslation} from 'react-i18next';
import {AssignmentStatusCellRenderer} from './CellRenderers/AssignmentStatusCellRenderer';
import {useGetCustomFields} from 'api/dashboard';
import {DateValueFormatter} from '../utils/date-value-formatter';
import {useHistory} from 'react-router-dom';
import {pageRoutes} from 'utils/routes/page-routes';

export enum ColumnField {
  itemsCount = 'itemsCount',
  items = 'items',
  age = 'age',
  labCaseId = 'labCaseID',
  submittingAgency = 'submittingAgency',
  incidentNumber = 'incidentCaseNumber',
  caseType = 'caseType',
  assignmentType = 'type',
  assignmentStatus = 'status',
  analyst = 'analyst',
  claimed = 'claimedDate',
  assignmentCreation = 'createdAt',
  technicalReviewer = 'technicalReviewer',
  technicalActionDate = 'technicalActionDate',
  administrativeReviewer = 'administrativeReviewer',
  administrativeActionDate = 'administrativeActionDate',
  lastUpdated = 'modifiedAt',
  id = 'id',
  actions = 'actions',
}

const useGetColumns = (): GridColumns => {
  const {t} = useTranslation();
  const history = useHistory();
  const {data: customFieldResponse} = useGetCustomFields();
  const customFields = customFieldResponse?.data || [];
  const customColumnFields: GridColumns = customFields.length
    ? customFields.map((item) => {
        return {
          field: item.shortDescription,
          filterable: false,
          sortable: false,
          minWidth: 240,
          headerName: item.shortDescription,
          flex: 1,
        };
      })
    : [];

  return [
    {
      field: ColumnField.itemsCount,
      headerName: t('dashboard.table.assignments.columns.items'),
      filterable: false,
      minWidth: 99,
      flex: 1,
    },
    {
      field: ColumnField.age,
      filterable: false,
      minWidth: 120,
      headerName: t('dashboard.table.assignments.columns.age'),
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
      field: ColumnField.incidentNumber,
      filterable: false,
      minWidth: 225,
      headerName: t('common.table.incidentNumber'),
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
      field: ColumnField.assignmentType,
      filterable: false,
      minWidth: 175,
      headerName: t('common.table.assignmentType'),
      flex: 1,
    },
    {
      field: ColumnField.assignmentStatus,
      filterable: false,
      minWidth: 250,
      headerName: t('dashboard.table.assignments.columns.assignmentStatus'),
      renderCell: AssignmentStatusCellRenderer,
      flex: 1,
    },
    {
      field: ColumnField.analyst,
      filterable: false,
      hide: false,
      minWidth: 130,
      headerName: t('dashboard.table.assignments.columns.analyst'),
      flex: 1,
    },
    {
      field: ColumnField.claimed,
      filterable: false,
      minWidth: 180,
      headerName: t('dashboard.table.assignments.columns.claimed'),
      flex: 1,
      valueFormatter: DateValueFormatter,
    },
    {
      field: ColumnField.assignmentCreation,
      filterable: false,
      minWidth: 210,
      headerName: t('dashboard.table.assignments.columns.assignmentCreation'),
      flex: 1,
      valueFormatter: DateValueFormatter,
    },
    {
      field: ColumnField.technicalReviewer,
      filterable: false,
      minWidth: 200,
      headerName: t('dashboard.table.assignments.columns.technicalReviewer'),
      flex: 1,
    },
    {
      field: ColumnField.technicalActionDate,
      filterable: false,
      minWidth: 225,
      headerName: t('dashboard.table.assignments.columns.technicalActionDate'),
      flex: 1,
      valueFormatter: DateValueFormatter,
    },
    {
      field: ColumnField.administrativeReviewer,
      filterable: false,
      minWidth: 250,
      headerName: t('dashboard.table.assignments.columns.administrativeReviewer'),
      flex: 1,
    },
    {
      field: ColumnField.administrativeActionDate,
      filterable: false,
      minWidth: 265,
      headerName: t('dashboard.table.assignments.columns.administrativeActionDate'),
      flex: 1,
      valueFormatter: DateValueFormatter,
    },
    {
      field: ColumnField.lastUpdated,
      filterable: false,
      minWidth: 265,
      headerName: t('dashboard.table.lastUpdated'),
      flex: 1,
      valueFormatter: DateValueFormatter,
    },
    {
      field: ColumnField.id,
      filterable: false,
      minWidth: 80,
      headerName: t('dashboard.table.assignments.columns.id'),
      flex: 1,
    },
    ...customColumnFields,
    {
      field: ColumnField.actions,
      headerName: t('dashboard.table.actions'),
      filterable: false,
      sortable: false,
      resizable: false,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <>
            <MButton
              onClick={() =>
                history.push(`${pageRoutes.evidenceManagement.root}?assignmentId=${params.row[ColumnField.id]}`, {
                  assignment: params.row,
                  from: pageRoutes.dashboard,
                })
              }
              color="primary"
              variant="text"
            >
              {t('dashboard.table.view')}
            </MButton>
          </>
        );
      },
    },
  ];
};

export default useGetColumns;
