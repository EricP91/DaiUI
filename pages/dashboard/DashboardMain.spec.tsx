import {render, screen, waitFor} from 'test-utils';
import {DashboardTileType} from 'types/dashboard/tiles';
import DashboardMain from './DashboardMain';
import axios from 'axios';
import {apiRoutes} from 'utils/routes/api-routes';
import userEvent from '@testing-library/user-event';

describe('DashboardMain', () => {
  it.each([[DashboardTileType.Unclaimed], [DashboardTileType.PendingReview], [DashboardTileType.MyActive]])(
    'should call assignments table api with filter when clicking on %s tile',
    async (tileType) => {
      const spy = vi.spyOn(axios, 'get');
      render(<DashboardMain />);

      const tileElement = screen.getByTestId(`${tileType}-tile`);
      userEvent.click(tileElement);

      await waitFor(() =>
        expect(spy).toHaveBeenCalledWith(
          apiRoutes.dashboard.assignments,
          expect.objectContaining({
            params: expect.objectContaining({
              filter: tileType,
            }),
          }),
        ),
      );
    },
  );

  it.each([
    [DashboardTileType.MyCustody, '#FAC5C5', 'My Custody (10)'],
    [DashboardTileType.PendingReview, '#D1E4F9', 'Review Required: All Sections (10)'],
    [DashboardTileType.MyActive, '#D1E4F9', 'Active Assignments: All Sections (10)'],
    [DashboardTileType.Unclaimed, '#D1E4F9', 'All Assignments: My Sections (10)'],
  ])('should set tile as active and tab as active when clicking on %s tile', async (tileType, color, tabName) => {
    render(<DashboardMain />);

    const tile = screen.getByTestId(`${tileType}-tile`);

    userEvent.click(tile);

    await waitFor(() => {
      expect(tile).toHaveStyle(`border: 2px solid ${color}`);
      expect(screen.getByText(tabName)).toHaveStyle(`color: #0064CC`);
    });
  });

  it.each([
    [DashboardTileType.PendingReview, '#D1E4F9'],
    [DashboardTileType.MyActive, '#D1E4F9'],
    [DashboardTileType.Unclaimed, '#D1E4F9'],
  ])('should reset filter for %s tile when clicking on reset filters', async (tileType, color) => {
    const spy = vi.spyOn(axios, 'get');
    render(<DashboardMain />);

    const tile = screen.getByTestId(`${tileType}-tile`);

    userEvent.click(tile);

    await waitFor(() => {
      expect(tile).toHaveStyle(`border: 2px solid ${color}`);
      expect(spy).toHaveBeenCalledWith(
        apiRoutes.dashboard.assignments,
        expect.objectContaining({
          params: expect.objectContaining({
            filter: tileType,
          }),
        }),
      );
    });

    spy.mockClear();
    userEvent.click(screen.getByText('Reset Filters'));

    await waitFor(() => {
      expect(tile).toHaveStyle(`border: 1px solid ${color}`);
      expect(spy).toHaveBeenCalledWith(
        apiRoutes.dashboard.assignments,
        expect.objectContaining({
          params: expect.not.objectContaining({
            filter: tileType,
          }),
        }),
      );
    });
  });
});
