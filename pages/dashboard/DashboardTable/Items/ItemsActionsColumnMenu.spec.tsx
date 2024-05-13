import userEvent from '@testing-library/user-event';
import ItemsActionsColumnMenu from './ItemsActionsColumnMenu';
import {render, screen, waitForElementToBeRemoved} from 'test-utils';

describe('ItemsActionsColumnMenu', () => {
  it('should render actions menu items', async () => {
    render(<ItemsActionsColumnMenu />);
    userEvent.click(await screen.findByTestId('menu-icon'));
    expect(await screen.findByText('Move')).toBeInTheDocument();
    expect(await screen.findByText('Checkout')).toBeInTheDocument();
    expect(await screen.findByText('Chain of Custody')).toBeInTheDocument();
    expect(await screen.findByText('Case Report')).toBeInTheDocument();
  });

  it('should close actions menu when click on menu item', async () => {
    render(<ItemsActionsColumnMenu />);
    userEvent.click(await screen.findByTestId('menu-icon'));
    userEvent.click(await screen.findByText('Move'));
    await waitForElementToBeRemoved(screen.getByText('Move'));
  });
});
