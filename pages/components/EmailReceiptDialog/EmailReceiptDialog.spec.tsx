import {vi} from 'vitest';
import {render, fireEvent} from 'test-utils';
import EmailReceiptDialog from './EmailReceiptDialog';

vi.mock('api/receive', () => ({
  useGetReceiptEmails: vi.fn(() => ({
    data: ['email1@example.com', 'email2@example.com'],
  })),
}));

test('renders EmailReceiptDialog component', () => {
  const mockOnClose = vi.fn();
  const {getByText} = render(<EmailReceiptDialog onClose={mockOnClose} />);

  // Test rendering of the component
  const emailReceiptTitle = getByText('Email Receipt');
  expect(emailReceiptTitle).toBeInTheDocument();

  // Test onSubmit function
  const sendEmailButton = getByText('Send Email');
  fireEvent.click(sendEmailButton);
  // Add more assertions to test the behavior of the onSubmit function

  // Test onClose function
  const backButton = getByText('Back');
  fireEvent.click(backButton);
  expect(mockOnClose).toHaveBeenCalledTimes(1);
});
