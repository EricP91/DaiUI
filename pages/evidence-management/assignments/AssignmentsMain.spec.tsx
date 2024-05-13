import {render} from 'test-utils';
import AssignmentsMain from './AssignmentsMain';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

describe('AssignmentsMain', () => {
  it('should render AssignmentsMain', () => {
    const history = createMemoryHistory();
    history.push('?assignmentId=123', {assignment: {id: '123'}});
    const {getByTestId} = render(
      <Router history={history}>
        <AssignmentsMain />
      </Router>,
    );
    const assignmentBreadcrumbs = getByTestId('assignment-breadcrumbs');
    expect(assignmentBreadcrumbs).toBeInTheDocument();
  });
});
