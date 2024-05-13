import {render, screen} from 'test-utils';
import App from './App';

describe('App', () => {
  it('should render App with LayoutHeader', async () => {
    render(<App />);

    expect(await screen.findByTestId('topbar-app-name'));
  });
});
