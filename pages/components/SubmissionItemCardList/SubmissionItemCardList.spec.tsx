import {useReceiveStore} from 'store/receive/receive.store';
import {fireEvent, render, screen} from 'test-utils';
import SubmissionItemCardList from './SubmissionItemCardList';
import {SubmissionItem} from 'types/receive';

vi.mock('store/receive/receive.store');

describe('SubmissionItemCardList', () => {
  const items: SubmissionItem[] = [
    {
      id: '1',
      assignmentType: 'assignmentType 1',
      description: 'description 1',
      servicesRequested: [],
      submissionId: '123',
    },
    {
      id: '2',
      assignmentType: 'assignmentType 2',
      description: 'description 2',
      servicesRequested: [],
      submissionId: '123',
    },
    {
      id: '3',
      assignmentType: 'assignmentType 3',
      description: 'description 3',
      servicesRequested: [],
      submissionId: '123',
    },
  ];
  const submissionId = '123';

  it('should render the submission ID and visibility icon', () => {
    render(<SubmissionItemCardList items={items} submissionId={submissionId} allItems={items} />);

    const submissionIdText = screen.getByText(`Submission ${submissionId}`);
    const visibilityIcon = screen.getByTestId('visibility-icon');

    expect(submissionIdText).toBeInTheDocument();
    expect(visibilityIcon).toBeInTheDocument();
  });

  it('should subDivide work as expected', () => {
    // Mock props
    const mockItems = [
      {
        id: 'submission1',
        submittingAgency: 'Agency 1',
        assignmentType: 'xx',
        description: 'Item 1',
        servicesRequested: [],
        submissionId: '123',
      },
    ];
    const mockSubmissionId = '123';

    const setSubmissionItems = vi.fn();
    //eslint-disable-next-line
    (useReceiveStore as any).mockReturnValue(setSubmissionItems);

    const props = {
      items: mockItems,
      allItems: mockItems,
      submissionId: mockSubmissionId,
    };

    render(<SubmissionItemCardList {...props} />);

    const subdivideButton = screen.getAllByText('Subdivide')[0];
    fireEvent.click(subdivideButton);

    const menuItem = screen.getByText('2 Items');
    fireEvent.click(menuItem);

    expect(setSubmissionItems).toHaveBeenCalledWith([
      {
        id: 'submission1',
        submittingAgency: 'Agency 1',
        assignmentType: 'xx',
        description: 'Item 1',
        servicesRequested: [],
        submissionId: '123',
      },
      {
        id: 'submission1.1',
        submittingAgency: 'Agency 1',
        assignmentType: 'xx',
        description: 'Item 1',
        servicesRequested: [],
        submissionId: '123',
      },
      {
        id: 'submission1.2',
        submittingAgency: 'Agency 1',
        assignmentType: 'xx',
        description: 'Item 1',
        servicesRequested: [],
        submissionId: '123',
      },
    ]);
  });

  it('should Reject button work as expected', () => {
    // Mock props
    const mockItems = [
      {
        id: 'submission1',
        submittingAgency: 'Agency 1',
        assignmentType: 'xx',
        description: 'Item 1',
        servicesRequested: [],
        submissionId: '123',
      },
      {
        id: 'submission2',
        submittingAgency: 'Agency 2',
        assignmentType: 'xx',
        description: 'Item 2',
        servicesRequested: [],
        submissionId: '123',
      },
    ];
    const mockSubmissionId = '123';

    const setSubmissionItems = vi.fn();
    //eslint-disable-next-line
    (useReceiveStore as any).mockReturnValue(setSubmissionItems);

    const props = {
      items: mockItems,
      allItems: mockItems,
      submissionId: mockSubmissionId,
    };

    render(<SubmissionItemCardList {...props} />);

    const rejectButton = screen.getAllByRole('button', {name: /reject/i})[0];
    fireEvent.click(rejectButton);
    expect(setSubmissionItems).toHaveBeenCalledTimes(1);
    expect(setSubmissionItems).toHaveBeenCalledWith([
      {
        id: 'submission2',
        submittingAgency: 'Agency 2',
        assignmentType: 'xx',
        description: 'Item 2',
        servicesRequested: [],
        submissionId: '123',
      },
    ]);
  });
});
