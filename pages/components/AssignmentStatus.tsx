import {Status} from './Status';

const neutral = ['Cancelled'];
const success = ['Approved'];
const warning = ['Pending Review', 'Pending Technical Review', 'Pending Administrative Review', 'Pending Analysis'];
const error = ['Submission Rejected'];

const getVariant = (status: string): string => {
  if (success.includes(status)) {
    return 'success';
  } else if (warning.includes(status)) {
    return 'warning';
  } else if (error.includes(status)) {
    return 'error';
  } else if (neutral.includes(status)) {
    return 'neutral';
  }
  return 'warning';
};

export const AssignmentStatus = ({status, size = 'wide'}: {status: string; size?: 'wide' | 'narrow'}): JSX.Element => {
  const variant = getVariant(status);

  return (
    <>
      <Status variant={variant} size={size}>
        {status}
      </Status>
    </>
  );
};
