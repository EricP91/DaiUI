import {GridRenderCellParams} from '@mui/x-data-grid-pro';
import {AssignmentStatus} from 'pages/components/AssignmentStatus';

export const AssignmentStatusCellRenderer = (params: GridRenderCellParams): JSX.Element => {
  const status = params.row.status;

  return (
    <>
      <AssignmentStatus status={status}></AssignmentStatus>
    </>
  );
};
