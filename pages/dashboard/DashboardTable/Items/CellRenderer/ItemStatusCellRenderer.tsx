import {GridRenderCellParams} from '@mui/x-data-grid-pro';
import {Status} from 'pages/components/Status';

const success = ['Check Out'];
const warning = ['Pending Return to Department', 'Pending Statute of Limitations', 'Pending Analysis'];
const error = ['Pending Destruction'];

const getVariant = (status: string): string => {
  if (success.includes(status)) {
    return 'success';
  } else if (warning.includes(status)) {
    return 'warning';
  } else if (error.includes(status)) {
    return 'error';
  }
  return 'warning';
};

export const ItemStatusCellRenderer = (params: GridRenderCellParams): JSX.Element => {
  const status = params.row.status;
  const variant = getVariant(status);

  return (
    <>
      <Status variant={variant}>{status}</Status>
    </>
  );
};
