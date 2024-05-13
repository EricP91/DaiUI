import {render} from 'test-utils';
import TransactionConfirmationCard from './TransactionConfirmationCard';

test('should render title correctly', () => {
  const {getByText} = render(<TransactionConfirmationCard title="Test Title" />);
  const titleElement = getByText(/Test Title/i);
  expect(titleElement).toBeInTheDocument();
});

test('should render children correctly', () => {
  const {getByText} = render(
    <TransactionConfirmationCard title="Test Title">
      <div>Child Component</div>
    </TransactionConfirmationCard>,
  );
  const childElement = getByText(/Child Component/i);
  expect(childElement).toBeInTheDocument();
});
