import {fireEvent, render, screen, waitFor, within} from 'test-utils';
import PendingReceiveDialogContent from './PendingReceiveDialogContent';

describe('PendingReceiveDialogContent', () => {
  it('should render table columns', async () => {
    render(<PendingReceiveDialogContent disableVirtualization={true} />);

    await waitFor(() => {
      expect(screen.getByText(/Incident\/Case Number/i)).toBeVisible();
      expect(screen.getByText(/submitting agency/i)).toBeVisible();
      expect(screen.getByText(/case type/i)).toBeVisible();
      expect(screen.getByText(/case class/i)).toBeVisible();
      expect(screen.getByText(/case officer/i)).toBeVisible();
      expect(screen.getByText(/files attached/i)).toBeVisible();
      expect(screen.getByText(/packing slip/i)).toBeVisible();
    });
  });

  it('should render nested table columns', async () => {
    render(<PendingReceiveDialogContent disableVirtualization={true} />);

    fireEvent.click((await screen.findAllByTestId('KeyboardArrowRightIcon'))[0]);
    const container = await screen.findByTestId('nested-table');

    expect(within(container).getByText(/item id/i)).toBeInTheDocument();
    expect(within(container).getByText(/item type/i)).toBeInTheDocument();
    expect(within(container).getByText(/item description/i)).toBeInTheDocument();
    expect(within(container).getByText(/assignment type/i)).toBeInTheDocument();
    expect(within(container).getByText(/danger flag/i)).toBeInTheDocument();
  });
});
