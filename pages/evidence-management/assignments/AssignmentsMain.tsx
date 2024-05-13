import {ReactNode} from 'react';
import AssignmentBreadcrumbs from './AssignmentBreadcrumbs';
import AssignmentDetails from './AssignmentDetails';
import {useHistory, useLocation} from 'react-router-dom';
import {pageRoutes} from 'utils/routes/page-routes';
import {Assignment} from 'types/assignment';
import AssignmentContent from './AssignmentContent';

const AssignmentsMain = (): ReactNode => {
  const location = useLocation();
  const history = useHistory();

  const assignmentId = new URLSearchParams(location.search).get('assignmentId');
  const assignment: Assignment = history?.location?.state?.assignment ?? {};

  if (!assignmentId || !assignment.id) {
    history.push(pageRoutes.main);
  }

  return (
    <>
      <AssignmentBreadcrumbs />
      <AssignmentDetails />
      <AssignmentContent />
    </>
  );
};

export default AssignmentsMain;
