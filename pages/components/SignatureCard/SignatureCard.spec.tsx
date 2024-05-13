import {render} from 'test-utils';
import SignatureCard from './SignatureCard';

test('should render title correctly', () => {
  const {getByText} = render(<SignatureCard title="Test Title" />);
  const titleElement = getByText(/Test Title/i);
  expect(titleElement).toBeInTheDocument();
});

test('should render signature name correctly when signature is provided', () => {
  const mockSignature = {
    name: 'John Doe',
    dataUrl: 'mock-data-url',
  };
  const {getByText} = render(<SignatureCard title="Test Title" signature={mockSignature} />);
  const signatureNameElement = getByText(/John Doe/i);
  expect(signatureNameElement).toBeInTheDocument();
});

test('does not render signature name when signature is not provided', () => {
  const {queryByText} = render(<SignatureCard title="Test Title" />);
  const signatureNameElement = queryByText(/John Doe/i);
  expect(signatureNameElement).toBeNull();
});
