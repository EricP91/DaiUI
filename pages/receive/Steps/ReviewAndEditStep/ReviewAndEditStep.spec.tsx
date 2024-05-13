import {fireEvent, render} from 'test-utils';
import ReviewAndEditStep from './ReviewAndEditStep';
import {useReceiveStore} from 'store/receive/receive.store';

describe('ReviewAndEditStep', () => {
  it('should render the correct title', () => {
    const {getByText} = render(<ReviewAndEditStep />);
    expect(getByText(/review and edit/i)).toBeInTheDocument();
  });

  it('should call setActiveProcessStep when "Next" button is clicked', () => {
    const setActiveProcessStepSpy = vi.spyOn(useReceiveStore.getState(), 'setActiveProcessStep');

    const {getByText} = render(<ReviewAndEditStep />);

    const nextButton = getByText(/next/i);
    fireEvent.click(nextButton);

    expect(setActiveProcessStepSpy).toHaveBeenCalledWith(1);
  });

  it('should have previous button disabled', () => {
    const {getByText} = render(<ReviewAndEditStep />);

    const previousButton = getByText(/previous/i);

    expect(previousButton).toBeDisabled();
  });
});
