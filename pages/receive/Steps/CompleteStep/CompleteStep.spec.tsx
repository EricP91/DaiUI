import {render, screen, fireEvent, waitFor} from 'test-utils';
import userEvent from '@testing-library/user-event';
import {vi} from 'vitest';
import CompleteStep from './CompleteStep';
import {createMemoryHistory} from 'history';
import {pageRoutes} from 'utils/routes/page-routes';
import {Router} from 'react-router-dom';
import {useTransactionStore} from 'store/receive/transaction.store';

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

describe('Complete Step', () => {
  beforeEach(() => {
    //eslint-disable-next-line
    (useTransactionStore as any).mockReturnValue({
      note: 'Sample note',
      labSignature: 'Lab Signature',
      submitterSignature: 'Submitter Signature',
    });
  });

  test('should render transaction confirmation component', () => {
    render(<CompleteStep />);

    expect(screen.getByText(/Items received successfully./i)).toBeInTheDocument();
    expect(screen.getByText('Chain of Custody')).toBeInTheDocument();
    expect(screen.getByText('Note')).toBeInTheDocument();
    expect(screen.getByText('Submitter printed name')).toBeInTheDocument();
    expect(screen.getByText('Lab printed name')).toBeInTheDocument();
  });

  test('should show confirmation dialog once click email receipt button', async () => {
    render(<CompleteStep />);

    fireEvent.click(screen.getByText('Email Receipt'));

    waitFor(() => expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument());

    fireEvent.click(screen.getByRole('button', {name: /Back/i}));

    waitFor(() => expect(screen.queryByLabelText(/Email address/i)).not.toBeInTheDocument());
  });

  test('should show toast once click email receipt to case officer button and close toast once the button is clicked', async () => {
    const {getByText} = render(<CompleteStep />);

    const button = getByText(/Confirmation/i);
    fireEvent.click(button);

    expect(getByText(/Toast Message/i)).toBeInTheDocument();
    expect(getByText(/CheckIcon/i)).toBeInTheDocument();

    fireEvent.click(getByText(/Close Toast/i));

    const toast = screen.queryByText(/Toast Message/i);
    expect(toast).toBeNull();
  });

  test('should display tooltip when hovering go to dashboard button and should disappear when unhovering button', async () => {
    render(<CompleteStep />);
    const gotoDashboardButton = screen.getByRole('button', {name: 'Go to Dashboard'});
    userEvent.hover(gotoDashboardButton);
    await waitFor(() => expect(screen.queryByTestId('gotoDashboard-tooltip')).toBeInTheDocument());

    userEvent.unhover(gotoDashboardButton);
    await waitFor(() => expect(screen.queryByTestId('gotoDashboard-tooltip')).not.toBeInTheDocument());
  });

  test('should navigate to dashboard once click go to dashboard button', async () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <CompleteStep />
      </Router>,
    );

    const gotoDashboardButton = screen.getByRole('button', {name: 'Go to Dashboard'});
    userEvent.click(gotoDashboardButton);
    await waitFor(() => expect(history.location.pathname).toBe(pageRoutes.dashboard));
  });
});
