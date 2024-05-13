import {render, screen, fireEvent, waitForElementToBeRemoved} from 'test-utils';
import DashboardHeader from './DashboardHeader';

describe('DashboardHeader', () => {
  it('should show cover image', () => {
    const {container} = render(<DashboardHeader />);
    expect(container.querySelector(`[data-testid="cover-image-container"] svg`)).toBeInTheDocument();
  });

  it('should show 3 buttons', () => {
    render(<DashboardHeader />);
    expect(screen.getByText('Move')).toBeInTheDocument();
    expect(screen.getByText('Checkout')).toBeInTheDocument();
    expect(screen.getByText('Receive')).toBeInTheDocument();
  });

  it('should show 3 buttons', () => {
    render(<DashboardHeader />);
    expect(screen.getByText('Move')).toBeInTheDocument();
    expect(screen.getByText('Checkout')).toBeInTheDocument();
    expect(screen.getByText('Receive')).toBeInTheDocument();
  });

  it('should show receive menu', () => {
    render(<DashboardHeader />);
    fireEvent.click(screen.getByText('Receive'));
    expect(screen.getByText('View Pending & Receive')).toBeInTheDocument();
    expect(screen.getByText('Scan Evidence')).toBeInTheDocument();
  });

  it('should close receive menu when clicking on an option', async () => {
    render(<DashboardHeader />);
    fireEvent.click(screen.getByText('Receive'));
    fireEvent.click(screen.getByText('View Pending & Receive'));
    await waitForElementToBeRemoved(screen.getByText('View Pending & Receive'));
  });

  it('should navigate item to scan evidence', async () => {
    render(<DashboardHeader />);
    fireEvent.click(screen.getByText('Receive'));
    fireEvent.click(screen.getByText('Scan Evidence'));
    await waitForElementToBeRemoved(screen.getByText('Scan Evidence'));
  });

  it('should have agency name', async () => {
    render(<DashboardHeader />);
    expect(screen.getByText('Agency name: Cellebrite')).toBeInTheDocument();
  });

  it('should have greeting', async () => {
    render(<DashboardHeader />);
    expect(screen.getByText('Hello, John Doe')).toBeInTheDocument();
  });
});
