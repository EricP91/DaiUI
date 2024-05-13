import {fireEvent, render, screen} from 'test-utils';
import SignTransactionStep from './SignTransactionStep';
import {useReceiveStore} from 'store/receive/receive.store';

describe('SignTransactionStep', () => {
  it('should show title', async () => {
    render(<SignTransactionStep />);
    expect(await screen.getByText(/sign transaction/i)).toBeVisible();
  });

  it('should show destination location title', async () => {
    render(<SignTransactionStep />);
    expect(await screen.getByText(/destination location/i)).toBeVisible();
    expect(await screen.getByText(/Agency Custody/i)).toBeVisible();
  });

  it('should call setActiveProcessStep when clicking next', async () => {
    const setActiveProcessStepSpy = vi.spyOn(useReceiveStore.getState(), 'setActiveProcessStep');
    render(<SignTransactionStep />);

    fireEvent.click(screen.getByText(/next/i));
    expect(setActiveProcessStepSpy).toHaveBeenCalledWith(2);
  });

  it('should call setActiveProcessStep when clicking previous', async () => {
    const setActiveProcessStepSpy = vi.spyOn(useReceiveStore.getState(), 'setActiveProcessStep');
    render(<SignTransactionStep />);

    fireEvent.click(screen.getByText(/previous/i));
    expect(setActiveProcessStepSpy).toHaveBeenCalledWith(0);
  });
});
