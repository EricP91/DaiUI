import {render} from 'test-utils';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import AssignmentBreadcrumbs from './AssignmentBreadcrumbs';
import {pageRoutes} from 'utils/routes/page-routes';

describe('AssignmentBreadcrumbs', () => {
  it('should render assignment only when from does not exists', () => {
    const history = createMemoryHistory();
    history.push('?assignmentId=123');
    const {getByText} = render(
      <Router history={history}>
        <AssignmentBreadcrumbs />
      </Router>,
    );
    const assignmentTitle = getByText('Assignment #123'); // Replace with your expected assignment title
    expect(assignmentTitle).toBeInTheDocument();
  });

  it('should render from when exists', () => {
    const history = createMemoryHistory();
    history.push('?assignmentId=123', {from: pageRoutes.dashboard});
    const {getByText} = render(
      <Router history={history}>
        <AssignmentBreadcrumbs />
      </Router>,
    );

    expect(getByText('Assignment #123')).toBeInTheDocument();
    expect(getByText('Dashboard')).toBeInTheDocument();
  });

  it('should not render from when assignmentId does not exists', () => {
    const history = createMemoryHistory();
    const {queryByTestId} = render(
      <Router history={history}>
        <AssignmentBreadcrumbs />
      </Router>,
    );

    expect(queryByTestId('assignment-breadcrumbs')).not.toBeInTheDocument();
  });
});
