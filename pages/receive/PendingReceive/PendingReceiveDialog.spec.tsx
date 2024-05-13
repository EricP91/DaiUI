import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import {pageRoutes} from 'utils/routes/page-routes';
import PendingReceiveDialog from './PendingReceiveDialog';
import {fireEvent, render, screen, waitFor} from 'test-utils';
import userEvent from '@testing-library/user-event';
import {receivedItem} from 'mocks/handlers/receive';

const goBack = vi.fn();

vitest.mock('react-router-dom', async () => {
  const reactRouterDom = await vi.importActual('react-router-dom');
  return {
    ...(reactRouterDom as object),
    useHistory: () => ({
      goBack,
      push: vi.fn(),
    }),
  };
});

describe('PendingReceiveDialog', () => {
  it('should show confirm dialog after selecting a submission and clicking on start receiving process button', async () => {
    const history = createMemoryHistory();
    history.push(pageRoutes.receiveSubmission.viewPendingAndReceive);

    render(
      <Router history={history}>
        <PendingReceiveDialog />
      </Router>,
    );

    await userEvent.click(await screen.findByText(receivedItem.incidentCaseNumber));
    await userEvent.click(await screen.findByText(/start receiving process/i));

    await waitFor(() => {
      expect(screen.getByText('Are you sure you want to receive 1 items from 1 submission?'));
    });
  });

  it('should close confirm when clicking on receive', async () => {
    const history = createMemoryHistory();
    const modalContent = 'Are you sure you want to receive 1 items from 1 submission?';
    history.push(pageRoutes.receiveSubmission.viewPendingAndReceive);

    render(
      <Router history={history}>
        <PendingReceiveDialog />
      </Router>,
    );

    await userEvent.click(await screen.findByText(receivedItem.incidentCaseNumber));
    await userEvent.click(await screen.findByText(/start receiving process/i));
    await screen.findByText(modalContent);
    fireEvent.click(await screen.findByText('Receive'));
    expect(screen.queryByText(modalContent)).not.toBeInTheDocument();
  });

  it('should call goBack when clicking on X icon', async () => {
    const history = createMemoryHistory();
    history.push(pageRoutes.receiveSubmission.viewPendingAndReceive);

    render(
      <Router history={history}>
        <PendingReceiveDialog />
      </Router>,
    );

    fireEvent.click(await screen.findByTestId('dialog-close'));
    expect(goBack).toHaveBeenCalled();
  });

  it('should call goBack when clicking on Cancel', async () => {
    const history = createMemoryHistory();
    history.push(pageRoutes.receiveSubmission.viewPendingAndReceive);

    render(
      <Router history={history}>
        <PendingReceiveDialog />
      </Router>,
    );

    fireEvent.click(await screen.findByText('Cancel'));
    expect(goBack).toHaveBeenCalled();
  });
});
