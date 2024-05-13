import {authHandlers} from './auth';
import {dashboardHandlers} from './dashboard';
import {receiveHandlers} from './receive';
import {keepServiceWorkerAliveHandlers} from './service-worker';

export const handlers = [...authHandlers, ...dashboardHandlers, ...receiveHandlers, ...keepServiceWorkerAliveHandlers];
