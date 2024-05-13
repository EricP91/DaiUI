import {fireEvent, render, screen, waitFor} from 'test-utils';
import ReceiveProcessMain from './ReceiveProcessMain';

describe('ReceiveProcessMain', () => {
  it('should render Exit process button', async () => {
    render(<ReceiveProcessMain />);
    expect(await screen.getByText(/exit process/i)).toBeVisible();
  });

  it('should render title', async () => {
    render(<ReceiveProcessMain />);
    expect(await screen.getByText('Receiving Process')).toBeVisible();
  });

  it('should render step 1 active by default', async () => {
    render(<ReceiveProcessMain />);
    expect(await screen.getByText(/review & edit/i)).toBeVisible();
    expect(
      await screen.getByText(/review and edit the items you want to receive. you can also subdivide or reject items/i),
    ).toBeVisible();
  });

  it('should render all steps', async () => {
    render(<ReceiveProcessMain />);
    expect(await screen.getByText(/review & edit/i)).toBeVisible();
    expect(await screen.getByText(/sign transaction/i)).toBeVisible();
    expect(await screen.getByText(/transaction confirmed/i)).toBeVisible();
    expect(await screen.getByText(/move evidence/i)).toBeVisible();
    expect(await screen.getByText(/complete/i)).toBeVisible();
  });

  it('should render the exit process dialog', async () => {
    render(<ReceiveProcessMain />);

    fireEvent.click(screen.getByText(/exit process/i));
    await waitFor(() => expect(screen.getByText(/Exit Receiving Process/i)).toBeInTheDocument());
    expect(screen.getByRole('button', {name: /no/i})).toBeVisible();

    const yesButton = screen.getByRole('button', {name: /yes/i});
    expect(yesButton).toBeVisible();

    fireEvent.click(yesButton);

    await waitFor(() => expect(screen.queryByText(/Exit Receiving Process/i)).not.toBeInTheDocument());
  });
});
