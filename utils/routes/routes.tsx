import DashboardMain from '../../pages/dashboard/DashboardMain';
import {Redirect} from 'react-router-dom';
import {pageRoutes} from './page-routes';
import ReceiveFlowDialog from 'pages/receive/ReceiveProcessMain';
import PrintLabelDialog from 'pages/receive/PrintLabelDialog';
import AssignmentsMain from 'pages/evidence-management/assignments/AssignmentsMain';

export const routes = [
  {
    path: pageRoutes.dashboard,
    component: DashboardMain,
  },
  {
    exact: true,
    path: pageRoutes.main,
    component: (): JSX.Element => <Redirect to={pageRoutes.dashboard} />,
  },
  {
    path: pageRoutes.receiveSubmission.root,
    component: () => <ReceiveFlowDialog />,
  },
  {
    exact: true,
    path: pageRoutes.print,
    component: () => <PrintLabelDialog />,
  },
  {
    path: pageRoutes.evidenceManagement.root,
    component: () => <AssignmentsMain />,
    exact: true,
  },
];

export default routes;
