import {userOverviewMock} from 'mocks/handlers/dashboard';
import DashboardCounterTiles from './DashboardCounterTiles';
import {render, screen, waitFor, within} from 'test-utils';
import {DashboardTileType} from 'types/dashboard/tiles';

describe('DashboardCounterTiles', () => {
  it('should show all counter tiles', async () => {
    render(<DashboardCounterTiles />);

    const reviewRequireTile = screen.queryByTestId(`${DashboardTileType.PendingReview}-tile`) as HTMLElement;
    const myActiveAssignmentsTile = screen.queryByTestId(`${DashboardTileType.MyActive}-tile`) as HTMLElement;
    const unclaimedAssignmentsTile = screen.queryByTestId(`${DashboardTileType.Unclaimed}-tile`) as HTMLElement;
    const itemsInMyCustodyTile = screen.queryByTestId(`${DashboardTileType.MyCustody}-tile`) as HTMLElement;

    await waitFor(() => {
      expect(within(reviewRequireTile).getByText('Review required: My sections')).toBeInTheDocument();
      expect(within(reviewRequireTile).getByText(userOverviewMock.reviewRequired)).toBeInTheDocument();
      expect(within(reviewRequireTile).queryByTestId('review-required-icon')).toBeInTheDocument();
      expect(within(myActiveAssignmentsTile).getByText('My active assignments')).toBeInTheDocument();
      expect(within(myActiveAssignmentsTile).getByText(userOverviewMock.activeAssignments)).toBeInTheDocument();
      expect(within(myActiveAssignmentsTile).queryByTestId('active-assignments-icon')).toBeInTheDocument();
      expect(within(unclaimedAssignmentsTile).getByText('Unclaimed Assignments: My sections')).toBeInTheDocument();
      expect(within(unclaimedAssignmentsTile).getByText(userOverviewMock.unclaimedAssignments)).toBeInTheDocument();
      expect(within(unclaimedAssignmentsTile).queryByTestId('unclaimed-assignments-icon')).toBeInTheDocument();
      expect(within(itemsInMyCustodyTile).getByText('Items in My Custody')).toBeInTheDocument();
      expect(within(itemsInMyCustodyTile).getByText(userOverviewMock.itemsInMyCustody)).toBeInTheDocument();
      expect(within(itemsInMyCustodyTile).queryByTestId('items-icon')).toBeInTheDocument();
    });
  });
});
