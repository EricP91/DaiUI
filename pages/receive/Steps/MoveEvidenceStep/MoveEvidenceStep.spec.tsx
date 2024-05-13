import {render, screen, fireEvent, waitFor, cleanup} from 'test-utils';
import {vi, SpyInstance} from 'vitest';
import MoveEvidenceStep from './MoveEvidenceStep';
import {useReceiveStore} from 'store/receive/receive.store';
import userEvent from '@testing-library/user-event';
import {pageRoutes} from 'utils/routes/page-routes';

const mockedSubmissionItems = [
  {
    id: '12345678',
    assignmentType: 'Digital forensics',
    submissionId: '7682',
    servicesRequested: [
      {
        id: '1',
        name: 'DNA Analysis',
      },
      {
        id: '2',
        name: 'Digitcal Forensic',
      },
    ],
    description: 'iPhone 12 Pro Max',
    dangerFlag: 'Broken screen',
    submittingAgency: 'NYPD',
    type: 'Iphone grey',
  },
];

describe('Move Evidence', () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  test('should render move evidence component', () => {
    render(<MoveEvidenceStep />);
    expect(screen.getByText('Move')).toBeInTheDocument();
    expect(screen.getByText(/lookup item tool/i)).toBeInTheDocument();
    expect(screen.getByText(/Lab Signature/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Destination location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Add note.../i)).toBeInTheDocument();
  });

  test('should show add item dialog once click lookup item tool', async () => {
    render(<MoveEvidenceStep />);

    fireEvent.click(screen.getByText('lookup item tool'));

    await waitFor(() => expect(screen.getByText('Add Items Manually')).toBeInTheDocument());
    expect(screen.getByRole('button', {name: /add items/i})).toBeDisabled();
    const noButton = screen.getByRole('button', {name: 'Cancel'});
    fireEvent.click(noButton);
    await waitFor(() => expect(screen.queryByText('Add Items Manually')).toBeNull());
  });

  test('should call print label dialog', async () => {
    useReceiveStore.setState({
      submissionItems: mockedSubmissionItems,
    });

    const openSpy: SpyInstance = vi.spyOn(window, 'open');

    vi.spyOn(window.localStorage.__proto__, 'setItem');
    window.localStorage.__proto__.setItem = vi.fn();

    render(<MoveEvidenceStep />);
    expect(openSpy).toHaveBeenCalledTimes(1);
    expect(openSpy).toHaveBeenCalledWith(pageRoutes.print, '_blank', expect.stringContaining('width=380'));
    expect(localStorage.setItem).toHaveBeenCalledWith('Submission Items', expect.any(String));

    openSpy.mockRestore();
    cleanup();
  });

  test('should add item by using item code', async () => {
    useReceiveStore.setState({
      submissionItems: mockedSubmissionItems,
    });
    render(<MoveEvidenceStep />);

    const wrapperNode = screen.getByTestId('item-id-selector');
    expect(wrapperNode).toBeInTheDocument();
    const itemIdsSelector = screen.getByLabelText('Item ID');
    expect(itemIdsSelector).toBeInTheDocument();
  });

  test('should add item by lookup item tool', async () => {
    useReceiveStore.setState({
      submissionItems: mockedSubmissionItems,
    });
    render(<MoveEvidenceStep />);

    const setSubmissionItem = vi.spyOn(useReceiveStore.getState(), 'setSubmissionItems');
    fireEvent.click(screen.getByText(/lookup item tool/i));
    const rowSelectCheckbox = await waitFor(() => screen.getAllByLabelText('Select row')[0]);
    expect(rowSelectCheckbox).toBeInTheDocument();

    await userEvent.click(rowSelectCheckbox);

    const addItems = screen.getByRole('button', {name: 'Add Items'});
    expect(addItems).toBeEnabled();
    fireEvent.click(addItems);

    await waitFor(() => expect(setSubmissionItem).toHaveBeenCalled());
  });

  test('should call remove item when clicking remove button', async () => {
    useReceiveStore.setState({
      submissionItems: mockedSubmissionItems,
    });

    render(<MoveEvidenceStep />);
    const setSubmissionItem = vi.spyOn(useReceiveStore.getState(), 'setSubmissionItems');
    const removeButton = screen.getByRole('button', {name: /remove/i});
    fireEvent.click(removeButton);

    const noButton = await screen.findByText('No');
    fireEvent.click(noButton);

    await waitFor(() => expect(setSubmissionItem).not.toBeCalled());

    fireEvent.click(removeButton);
    const yesButton = await screen.findByText('Yes, Keep it in My Custody');
    fireEvent.click(yesButton);

    await waitFor(() => expect(setSubmissionItem).toHaveBeenCalled());
  });

  test('should call setActiveProcessStep when clicking previous', async () => {
    const setActiveProcessStepSpy = vi.spyOn(useReceiveStore.getState(), 'setActiveProcessStep');
    render(<MoveEvidenceStep />);
    fireEvent.click(screen.getByText(/previous/i));
    expect(setActiveProcessStepSpy).toHaveBeenCalledWith(2);
  });

  test('should call setActiveProcessStep when clicking next', async () => {
    const setActiveProcessStepSpy = vi.spyOn(useReceiveStore.getState(), 'setActiveProcessStep');
    render(<MoveEvidenceStep />);

    fireEvent.click(screen.getByText(/next/i));
    expect(setActiveProcessStepSpy).toHaveBeenCalledWith(4);
  });
});
