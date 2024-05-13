import {fireEvent, render, screen, waitFor} from 'test-utils';
import DashboardTableTabs from './DashboardTableTabs';
import {countUserDataMock} from 'mocks/handlers/dashboard';

describe('DashboardTableTabs', () => {
  it('should have My Assignments folder with related tabs', async () => {
    render(<DashboardTableTabs />);

    await waitFor(() => {
      expect(
        screen.getByText(`All My Assignments: My Sections (${countUserDataMock.assignments.allMyAssignments})`),
      ).toBeInTheDocument();
      expect(
        screen.getByText(`All Assignments: My Sections (${countUserDataMock.assignments.allAssignments})`),
      ).toBeInTheDocument();
      expect(
        screen.getByText(`Active Assignments: All Sections (${countUserDataMock.assignments.activeAssignments})`),
      ).toBeInTheDocument();
      expect(
        screen.getByText(`Review Required: All Sections (${countUserDataMock.assignments.reviewRequired})`),
      ).toBeInTheDocument();
      expect(screen.getByText(`All Assignments: (${countUserDataMock.assignments.total})`)).toBeInTheDocument();
    });

    const allAssignmentTab = screen.getByText(
      `All Assignments: My Sections (${countUserDataMock.assignments.allAssignments})`,
    );
    fireEvent.click(allAssignmentTab);
    expect(allAssignmentTab).toHaveAttribute('tabIndex', '0');
  });

  it('should have Items folder with related tabs', async () => {
    render(<DashboardTableTabs />);

    fireEvent.click(screen.getByRole('tab', {name: 'Items'}));

    await waitFor(() => {
      expect(screen.getByText(`My Custody (${countUserDataMock.items.myCustody})`)).toBeInTheDocument();
      expect(screen.getByText(`All Items (${countUserDataMock.items.total})`)).toBeInTheDocument();
    });

    const allItemTab = screen.getByText(`All Items (${countUserDataMock.items.total})`);
    fireEvent.click(allItemTab);
    expect(allItemTab).toHaveAttribute('tabIndex', '0');
  });
});
