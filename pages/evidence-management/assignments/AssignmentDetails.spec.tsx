import {render, screen} from 'test-utils';
import AssignmentDetails from './AssignmentDetails';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import {ReactNode} from 'react';

describe('AssignmentDetails', () => {
  const AssignmentDetailsWrapper = (): ReactNode => {
    const history = createMemoryHistory();
    history.push('?assignmentId=123', {
      assignment: {
        id: '123',
        status: 'Pending Assignment',
        type: 'Digital Forensic',
        createdAt: '2021-10-01T00:00:00.000Z',
        createdBy: 'John Doe',
        modifiedBy: 'Robena Sara',
      },
    });
    return (
      <Router history={history}>
        <AssignmentDetails />
      </Router>
    );
  };

  it('should render assignment title', () => {
    render(<AssignmentDetailsWrapper />);
    const titleElement = screen.getByText(/Assignment #123/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('should render assignment status', () => {
    render(<AssignmentDetailsWrapper />);
    const statusElement = screen.getByText(/pending assignment/i);
    expect(statusElement).toBeInTheDocument();
  });

  it('should render assignment type', () => {
    render(<AssignmentDetailsWrapper />);
    const typeElement = screen.getByText(/digital forensic/i);
    expect(typeElement).toBeInTheDocument();
  });

  it('should render assignment created by', () => {
    render(<AssignmentDetailsWrapper />);
    const createdByElement = screen.getByText(/John Doe/i);
    expect(createdByElement).toBeInTheDocument();
  });

  it('should render assignment modified by', () => {
    render(<AssignmentDetailsWrapper />);
    const modifiedByElement = screen.getByText(/Robena Sara/i);
    expect(modifiedByElement).toBeInTheDocument();
  });
});
