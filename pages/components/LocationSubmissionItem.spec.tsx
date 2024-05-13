import {render, screen} from 'test-utils';
import {LocationSubmissionItem} from './LocationSubmissionItem';

describe('LocationSubmissionItem', () => {
  it('should render location', async () => {
    render(<LocationSubmissionItem location="some location" />);
    expect(screen.getByText(/agency submission/i)).toBeVisible();
  });
});
