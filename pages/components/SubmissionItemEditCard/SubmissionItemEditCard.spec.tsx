import {render, screen, fireEvent} from 'test-utils';
import {vi} from 'vitest';
import SubmissionItemEditCard from './SubmissionItemEditCard';

describe('SubmissionItemEditCard', () => {
  const mockItem = {
    id: '1',
    submittingAgency: 'Test Agency',
    description: 'Test description',
    assignmentType: 'xx',
    servicesRequested: [
      {id: '1', name: 'Service 1'},
      {id: '2', name: 'Service 2'},
    ],
    submissionId: '123',
  };

  it('should render item details correctly', () => {
    render(<SubmissionItemEditCard submissionItem={mockItem} onChange={vi.fn()} />);
    expect(screen.getByText('Test Agency')).toBeInTheDocument();
    expect(screen.getByLabelText('Item Description')).toHaveValue('Test description');
    expect(screen.getByText('Service 1')).toBeInTheDocument();
    expect(screen.getByText('Service 2')).toBeInTheDocument();
  });

  it('should call onChange when description is changed', () => {
    const onChangeMock = vi.fn();
    render(
      <SubmissionItemEditCard
        submissionItem={mockItem}
        onChange={onChangeMock}
        onSubDivide={vi.fn()}
        onReject={vi.fn()}
      />,
    );

    const descriptionInput = screen.getByLabelText('Item Description');
    fireEvent.change(descriptionInput, {target: {value: 'New description'}});

    expect(onChangeMock).toHaveBeenCalledWith({...mockItem, description: 'New description'});
  });

  it('should call onSubDivide with the correct itemCount', () => {
    const onSubDivideMock = vi.fn();
    render(
      <SubmissionItemEditCard
        submissionItem={mockItem}
        onChange={vi.fn()}
        onSubDivide={onSubDivideMock}
        onReject={vi.fn()}
      />,
    );

    const subdivideButton = screen.getByText('Subdivide');
    fireEvent.click(subdivideButton);

    const menuItem = screen.getByText('2 Items');
    fireEvent.click(menuItem);

    expect(onSubDivideMock).toHaveBeenCalledWith(2);
  });

  it('should call onReject when the Reject button is clicked', () => {
    const onRejectMock = vi.fn();
    render(
      <SubmissionItemEditCard
        submissionItem={mockItem}
        onChange={vi.fn()}
        onSubDivide={vi.fn()}
        onReject={onRejectMock}
      />,
    );

    const rejectButton = screen.getByText('Reject');
    fireEvent.click(rejectButton);

    expect(onRejectMock).toHaveBeenCalled();
  });
});
