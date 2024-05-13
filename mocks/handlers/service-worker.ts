import {rest} from 'msw';
import {apiBaseUrl} from 'utils/routes/api-routes';

export const keepServiceWorkerAliveHandlers = [
  rest.get(`${apiBaseUrl}/keep-service-worker-alive`, (_req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
