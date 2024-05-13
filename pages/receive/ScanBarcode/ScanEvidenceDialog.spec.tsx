import {render, screen, waitFor} from 'test-utils';
import {ScanEvidenceDialog} from './ScanEvidenceDialog';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import {pageRoutes} from 'utils/routes/page-routes';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import {apiRoutes} from 'utils/routes/api-routes';
import {expect} from 'vitest';
import {server} from 'mocks/server';
import {notistackMock} from 'setupTests';
import {rest} from 'msw';

describe('ScanEvidenceDialog', () => {
  it('should render scan evidence dialog', async () => {
    const history = createMemoryHistory();
    history.push(pageRoutes.receiveSubmission.scanEvidence);

    render(
      <Router history={history}>
        <ScanEvidenceDialog />
      </Router>,
    );
    expect(await screen.findByText(/scan an item/i)).toBeVisible();
  });

  it('should show items on scan', async () => {
    const history = createMemoryHistory();
    const spy = vi.spyOn(axios, 'post');
    history.push(pageRoutes.receiveSubmission.scanEvidence);

    render(
      <Router history={history}>
        <ScanEvidenceDialog />
      </Router>,
    );

    await userEvent.keyboard('simulating-barcode-scan');
    await waitFor(() => {
      expect(screen.queryAllByTestId('submission-item')).toHaveLength(1);
      expect(spy).toHaveBeenCalledWith(
        apiRoutes.receive.root,
        undefined,
        expect.objectContaining({params: expect.objectContaining({barcode: 'simulating-barcode-scan'})}),
      );
    });
  });

  it('should remove scanned item when clicking on remove', async () => {
    const history = createMemoryHistory();
    history.push(pageRoutes.receiveSubmission.scanEvidence);

    render(
      <Router history={history}>
        <ScanEvidenceDialog />
      </Router>,
    );

    await userEvent.keyboard('simulating-barcode-scan');
    await userEvent.click(await screen.findByText('Remove'));
    await waitFor(() => {
      expect(screen.queryAllByTestId('submission-item')).toHaveLength(0);
    });
  });
  it('should show scanned item duplicate error message ', async () => {
    server.use(
      rest.post(apiRoutes.receive.root, (_req, res, ctx) => {
        return res(ctx.status(409));
      }),
    );

    const history = createMemoryHistory();
    history.push(pageRoutes.receiveSubmission.scanEvidence);

    render(
      <Router history={history}>
        <ScanEvidenceDialog />
      </Router>,
    );

    await userEvent.keyboard('simulating-barcode-scan');

    await waitFor(() => {
      expect(notistackMock.enqueueSnackbar).toBeCalledWith(
        expect.anything(),
        expect.objectContaining({autoHideDuration: 10000, variant: 'error'}),
      );
    });
  });

  it('should show scan item invalid agency dialog', async () => {
    server.use(
      rest.post(apiRoutes.receive.root, (_req, res, ctx) => {
        return res(ctx.status(400));
      }),
    );

    const history = createMemoryHistory();
    history.push(pageRoutes.receiveSubmission.scanEvidence);

    render(
      <Router history={history}>
        <ScanEvidenceDialog />
      </Router>,
    );

    await userEvent.keyboard('simulating-barcode-scan');

    await waitFor(() => {
      expect(screen.getByText(/can't scan item/i)).toBeVisible();
      expect(
        screen.getByText(
          /The agency indicated on the barcode label is not registered in this EP. Please add this agency and then try receiving the item again./i,
        ),
      ).toBeVisible();
    });
  });
});
