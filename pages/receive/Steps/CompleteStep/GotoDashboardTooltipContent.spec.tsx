import {render, screen} from 'test-utils';
import GotoDashboardTooltipContent from './GotoDashboardTooltipContent';

describe('Go to Dashboard Tooltip Component', () => {
  test('should render Go to Dashboard Tooltip component', () => {
    render(<GotoDashboardTooltipContent />);

    expect(screen.getByText(/Before you go..../i)).toBeInTheDocument();
    expect(screen.getByText('Did you remember to print the labels?')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Open Labels'})).toBeInTheDocument();
  });
});
