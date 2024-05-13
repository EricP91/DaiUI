import {render, screen, fireEvent} from 'test-utils';
import LayoutHeader from './LayoutHeader';

describe('LayoutHeader', () => {
  it('should show app name', async () => {
    render(<LayoutHeader />);
    expect(await screen.findByText('Lab Essentials'));
  });

  it('should show user first and last name initials', async () => {
    render(<LayoutHeader />);

    expect(await screen.findByText('JD'));
  });

  describe('when clicking on the avtar', () => {
    it('should show user full name & email', async () => {
      render(<LayoutHeader />);
      fireEvent.click(await screen.findByText('JD'));

      expect(await screen.findByText('John Doe'));
      expect(await screen.findByText('johndoe@cellebrite.com'));
    });
    it('should show logout button', async () => {
      render(<LayoutHeader />);
      fireEvent.click(await screen.findByText('JD'));
      expect(await screen.findByText('Logout'));
    });
  });
});
