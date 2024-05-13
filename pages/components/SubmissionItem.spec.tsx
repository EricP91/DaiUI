import {render, screen, waitFor} from 'test-utils';
import {SubmissionItem} from './SubmissionItem';
import userEvent from '@testing-library/user-event';

const onRemoveMock = vi.fn();

describe('SubmissionItem', () => {
  it('should render SubmissionItem', async () => {
    render(<SubmissionItem itemCode="A1B2C3" itemDescription="some description" onRemove={onRemoveMock} />);
    expect(screen.getByText('some description')).toBeVisible();
    expect(screen.getByText('A1B2C3')).toBeVisible();
  });

  it('should call onRemove when remove button is clicked', async () => {
    render(<SubmissionItem itemCode="A1B2C3" itemDescription="some description" onRemove={onRemoveMock} />);

    userEvent.click(screen.getByText('Remove'));
    await waitFor(() => expect(onRemoveMock).toHaveBeenCalledWith('A1B2C3'));
  });
});
