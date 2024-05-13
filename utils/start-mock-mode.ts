import axios from 'axios';
import {worker} from 'mocks/browser';
import {apiBaseUrl} from './routes/api-routes';

const KEEP_ALIVE_INTERVAL = 10000;

export const startMockServiceWorker = (): void => {
  worker.start({
    onUnhandledRequest: 'bypass',
    quiet: true,
    serviceWorker: {
      url: `${import.meta.env.VITE_PUBLIC_BASE_URL}/mockServiceWorker.js`,
    },
    findWorker: (scriptURL) => scriptURL.includes('mockServiceWorker'),
  });
  setInterval(() => {
    axios.get(`${apiBaseUrl}/keep-service-worker-alive`);
  }, KEEP_ALIVE_INTERVAL);
};
