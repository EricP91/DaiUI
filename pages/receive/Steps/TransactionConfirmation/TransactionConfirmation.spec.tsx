import {render, screen, fireEvent, waitFor} from 'test-utils';
import {vi} from 'vitest';
import TransactionConfirmation from './TransactionConfirmation';
import {useReceiveStore} from 'store/receive/receive.store';
import {useTransactionStore} from 'store/receive/transaction.store';
import userEvent from '@testing-library/user-event';

vi.mock('store/receive/transaction.store');
vi.mock('pages/components/TransactionConfirmationIconButton', () => ({
  default: ({showIcon, onClick}: {showIcon: boolean; onClick: () => void}) => (
    <button onClick={onClick}>{showIcon && 'CheckIcon'} Confirmation</button>
  ),
}));
vi.mock('pages/components/TransactionToast', () => ({
  default: ({onClose}: {onClose: () => void}) => (
    <div>
      <button onClick={onClose}>Close Toast</button>
      <span>Toast Message</span>
    </div>
  ),
}));

describe('TransactionConfirmation', () => {
  beforeEach(() => {
    //eslint-disable-next-line
    (useTransactionStore as any).mockReturnValue({
      note: 'Sample note',
      labSignature: 'Lab Signature',
      submitterSignature: 'Submitter Signature',
    });
  });

  test('should render transaction confirmation component', () => {
    render(<TransactionConfirmation />);

    expect(screen.getByText(/Success! You received all items/i)).toBeInTheDocument();
    expect(screen.getByText('Chain of Custody')).toBeInTheDocument();
    expect(screen.getByText('Note')).toBeInTheDocument();
    expect(screen.getByText('Submitter printed name')).toBeInTheDocument();
    expect(screen.getByText('Lab printed name')).toBeInTheDocument();
  });

  test('should show confirmation dialog once click email receipt button', async () => {
    render(<TransactionConfirmation />);

    userEvent.click(screen.getByText('Email Receipt'));

    await waitFor(() => expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument());

    fireEvent.click(screen.getByRole('button', {name: /Back/i}));

    await waitFor(() => expect(screen.queryByLabelText(/Email address/i)).not.toBeInTheDocument());
  });

  test('should show toast once click email receipt to case officer button and close toast once the button is clicked', async () => {
    const {getByText} = render(<TransactionConfirmation />);

    const button = getByText(/Confirmation/i);
    fireEvent.click(button);

    expect(getByText(/Toast Message/i)).toBeInTheDocument();
    expect(getByText(/CheckIcon/i)).toBeInTheDocument();

    fireEvent.click(getByText(/Close Toast/i));

    const toast = screen.queryByText(/Toast Message/i);
    expect(toast).toBeNull();
  });

  test('should call setActiveProcessStep when clicking previous', async () => {
    const setActiveProcessStepSpy = vi.spyOn(useReceiveStore.getState(), 'setActiveProcessStep');
    render(<TransactionConfirmation />);

    fireEvent.click(screen.getByText(/previous/i));
    expect(setActiveProcessStepSpy).toHaveBeenCalledWith(1);
  });

  test('should call setActiveProcessStep when clicking next', async () => {
    const setActiveProcessStepSpy = vi.spyOn(useReceiveStore.getState(), 'setActiveProcessStep');
    render(<TransactionConfirmation />);

    fireEvent.click(screen.getByText(/next/i));
    expect(setActiveProcessStepSpy).toHaveBeenCalledWith(3);
  });
});
