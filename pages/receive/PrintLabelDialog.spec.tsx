import {render, cleanup, waitFor} from 'test-utils';
import userEvent from '@testing-library/user-event';
import PrintLabelDialog from './PrintLabelDialog';
import {SpyInstance} from 'vitest';

describe('Print Dialog Content', () => {
  it('renders correctly and can initiate print', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify([{id: '123'}, {id: '456'}]));
    const openSpy: SpyInstance = vi.spyOn(window, 'open');

    const {getAllByText, getByText} = render(<PrintLabelDialog />);
    await waitFor(() => expect(getAllByText(/Item Label/i).length).toBe(2));
    await waitFor(() => expect(getByText('Print All 6 Labels')).toBeInTheDocument());
    await userEvent.click(getAllByText('Print')[0]);

    expect(openSpy).toHaveBeenCalledTimes(1);
    expect(openSpy).toHaveBeenCalledWith('', '_blank', expect.stringContaining('width=776,height=638'));

    await userEvent.click(getByText('Print All 6 Labels'));

    expect(openSpy).toHaveBeenCalledTimes(2);
    expect(openSpy).toHaveBeenCalledWith('', '_blank', expect.stringContaining('width=776,height=638'));
    // Clean up
    openSpy.mockRestore();

    vi.restoreAllMocks();
    cleanup();
  });
});
