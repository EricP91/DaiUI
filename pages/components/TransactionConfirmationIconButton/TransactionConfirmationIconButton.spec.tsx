import {render, fireEvent, screen} from 'test-utils';
import {vi} from 'vitest';
import TransactionConfirmationIconButton from './TransactionConfirmationIconButton';

describe('TransactionConfirmationIconButton', () => {
  test('renders button with text', () => {
    render(<TransactionConfirmationIconButton showIcon={false} text="Click me" onClick={() => {}} />);
    const buttonElement = screen.getByText('Click me');
    expect(buttonElement).toBeInTheDocument();
  });

  test('calls onClick function when clicked', () => {
    const onClickMock = vi.fn();
    const {getByText} = render(
      <TransactionConfirmationIconButton showIcon={false} text="Click me" onClick={onClickMock} />,
    );
    const buttonElement = getByText('Click me');
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalled();
  });
});
