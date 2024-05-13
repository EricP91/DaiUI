import {render, screen, fireEvent} from 'test-utils';
import {vi} from 'vitest';
import TransactionToast from './TransactionToast';

vi.mock('@mui/material/Snackbar', () => ({
  default: ({onClose, children}: {onClose: () => void; children?: React.ReactNode}) => {
    return (
      <div>
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    );
  },
}));

vi.mock('@mui/material/Alert', () => ({
  default: ({children}: {children?: React.ReactNode}) => <div>{children}</div>,
}));

vi.mock('@mui/material/Typography', () => ({
  default: ({children}: {children?: React.ReactNode}) => <span>{children}</span>,
}));

describe('TransactionToast', () => {
  test('should render toast with correct message', () => {
    const onCloseMock = vi.fn();
    render(<TransactionToast onClose={onCloseMock} text="Receipt emailed to the case officer." />);
    const toastMessage = screen.getByText(/Receipt emailed to the case officer./i);
    expect(toastMessage).toBeInTheDocument();
  });

  test('should call onClose function when toast is closed', () => {
    const onCloseMock = vi.fn();
    render(<TransactionToast onClose={onCloseMock} text="Receipt emailed to the case officer." />);
    const closeIcon = screen.getByRole('button', {name: /Close/i});
    fireEvent.click(closeIcon);
    expect(onCloseMock).toHaveBeenCalled();
  });
});
