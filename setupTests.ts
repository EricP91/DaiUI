import '@testing-library/jest-dom';
import * as matchers from '@testing-library/jest-dom/matchers';
import {server} from './mocks/server';
import {cleanup} from '@testing-library/react';
import {configure} from '@testing-library/react';

configure({defaultHidden: true});

class ChannelMock {
  public onmessage(): void {}

  public postMessage(): void {
    this.onmessage();
  }

  public name: string = '';

  public onmessageerror(): void {}

  public close(): void {}

  public addEventListener(): void {}

  public removeEventListener(): void {}

  public dispatchEvent(): boolean {
    return true;
  }
}

global.BroadcastChannel = ChannelMock;

export const notistackMock = {
  enqueueSnackbar: vi.fn(),
  closeSnackbar: vi.fn(),
};

vi.mock('notistack', async () => {
  const actual: Record<string, unknown> = await vi.importActual('notistack');
  return {
    ...actual,
    useSnackbar: () => notistackMock,
  };
});

expect.extend(matchers);

beforeAll(() => server.listen({onUnhandledRequest: 'error'}));

afterEach(() => {
  server.resetHandlers();
  cleanup();
});

afterAll(() => server.close());
