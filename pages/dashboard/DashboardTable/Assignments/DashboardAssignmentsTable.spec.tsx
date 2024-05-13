import {fireEvent, render, screen, waitFor, within} from 'test-utils';
import {AssignmentSection} from 'types/search-request';
import {DashboardAssignmentsTable} from './DashboardAssignmentsTable';
import axios from 'axios';
import {
  allMyAssignmentColumnPickerVisibleColumns,
  allMyAssignmentHiddenColumns,
  allMyAssignmentVisibleTableColumns,
  nestedItemsTable,
  otherSectionsColumnPickerVisibleColumns,
  otherSectionsHiddenColumns,
  otherSectionsVisibleColumns,
} from './mocks/assignment-table.mock';
import userEvent from '@testing-library/user-event';
import {ReportType} from 'types/report';
import {apiRoutes} from 'utils/routes/api-routes';
import {downloadFile} from '@cellebrite/design-system';
import {pageRoutes} from 'utils/routes/page-routes';

vi.mock('@cellebrite/design-system', async () => {
  const ds = await vi.importActual('@cellebrite/design-system');
  return {
    ...(ds as object),
    downloadFile: vi.fn(),
  };
});

const pushSpy = vi.fn();

vitest.mock('react-router-dom', async () => {
  const reactRouterDom = await vi.importActual('react-router-dom');
  return {
    ...(reactRouterDom as object),
    useHistory: () => ({
      push: pushSpy,
    }),
  };
});

describe('DashboardAssignmentsTable', () => {
  it('should render 10 columns without analyst column when section is my assignments', async () => {
    render(<DashboardAssignmentsTable activeSection={AssignmentSection.MyAssignments} disableVirtualization />);

    await waitFor(() => {
      allMyAssignmentVisibleTableColumns.forEach((column) => expect(screen.getByText(column)).toBeInTheDocument());
      expect(screen.queryAllByText(AssignmentSection.MyAssignments).length).toBe(10);
    });
  });

  it.each([
    [AssignmentSection.AllAssignments],
    [AssignmentSection.ActiveAssignments],
    [AssignmentSection.ReviewRequired],
    [AssignmentSection.AllSections],
  ])('should render 10 columns with analyst column when section is %s', async (section) => {
    render(<DashboardAssignmentsTable activeSection={section} disableVirtualization />);

    await waitFor(() => {
      otherSectionsVisibleColumns.forEach((column) => expect(screen.getByText(column)).toBeInTheDocument());
      expect(screen.queryAllByText(section).length).toBe(10);
    });
  });

  it.each([
    [AssignmentSection.MyAssignments],
    [AssignmentSection.AllAssignments],
    [AssignmentSection.ActiveAssignments],
    [AssignmentSection.ReviewRequired],
    [AssignmentSection.AllSections],
  ])('should have default sort by id in %s table', async (section) => {
    const spy = vi.spyOn(axios, 'get');
    render(<DashboardAssignmentsTable activeSection={section} disableVirtualization />);
    await waitFor(() =>
      expect(spy).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({params: expect.objectContaining({sort: 'id', order: 'desc'})}),
      ),
    );
  });

  it.each([
    [AssignmentSection.MyAssignments],
    [AssignmentSection.AllAssignments],
    [AssignmentSection.ActiveAssignments],
    [AssignmentSection.ReviewRequired],
    [AssignmentSection.AllSections],
  ])('should have expandable items table for %s table', async (section) => {
    render(<DashboardAssignmentsTable activeSection={section} disableVirtualization />);

    userEvent.click((await screen.findAllByTestId('KeyboardArrowRightIcon'))[0]);
    const container = await screen.findByTestId('nested-table');

    nestedItemsTable.forEach((column) =>
      expect(within(container).getByText(new RegExp(column, 'i'))).toBeInTheDocument(),
    );
  });

  it.each([
    [AssignmentSection.MyAssignments],
    [AssignmentSection.AllAssignments],
    [AssignmentSection.ActiveAssignments],
    [AssignmentSection.ReviewRequired],
    [AssignmentSection.AllSections],
  ])('should go to the next page when clicking on next in %s table', async (assignmentSection) => {
    const spy = vi.spyOn(axios, 'get');
    render(<DashboardAssignmentsTable activeSection={assignmentSection} disableVirtualization />);
    userEvent.click(await screen.getByTitle('Go to next page'));
    await waitFor(() =>
      expect(spy).toHaveBeenCalledWith(
        apiRoutes.dashboard.assignments,
        expect.objectContaining({
          params: expect.objectContaining({page: 2, assignmentSection}),
        }),
      ),
    );
  });

  it.each([
    [AssignmentSection.MyAssignments],
    [AssignmentSection.AllAssignments],
    [AssignmentSection.ActiveAssignments],
    [AssignmentSection.ReviewRequired],
    [AssignmentSection.AllSections],
  ])('should go to the assignment page when clicking on view in %s table', async (assignmentSection) => {
    render(<DashboardAssignmentsTable activeSection={assignmentSection} disableVirtualization />);
    await userEvent.click(await screen.getAllByRole('button', {name: /view/i})[0]);
    await waitFor(() =>
      expect(pushSpy).toBeCalledWith(
        expect.stringContaining(`${pageRoutes.evidenceManagement.root}?assignmentId=`),
        expect.objectContaining({assignment: expect.anything(), from: pageRoutes.dashboard}),
      ),
    );
  });

  describe('Toolbar', () => {
    it.each([
      [AssignmentSection.MyAssignments],
      [AssignmentSection.AllAssignments],
      [AssignmentSection.ActiveAssignments],
      [AssignmentSection.ReviewRequired],
      [AssignmentSection.AllSections],
    ])('should search in %s table', async (section) => {
      const spy = vi.spyOn(axios, 'get');

      render(<DashboardAssignmentsTable activeSection={section} disableVirtualization />);
      const input = screen.getByPlaceholderText('Search...');
      await userEvent.clear(input);
      await userEvent.type(input, '123');

      await waitFor(() =>
        expect(spy).toHaveBeenCalledWith(
          apiRoutes.dashboard.assignments,
          expect.objectContaining({params: expect.objectContaining({search: '123'})}),
        ),
      );
    });

    it.each(['csv', 'pdf', 'json', 'xml'])('should export %s report', async (reportType) => {
      const spy = vi.spyOn(axios, 'post');

      render(<DashboardAssignmentsTable activeSection={AssignmentSection.ActiveAssignments} disableVirtualization />);
      userEvent.click(screen.getByText('Export'));
      userEvent.click(await screen.findByText(reportType));

      await waitFor(() => {
        expect(spy).toHaveBeenCalledWith(
          `${apiRoutes.dashboard.report}/${ReportType.AssignmentsTable}`,
          undefined,
          expect.objectContaining({
            params: expect.objectContaining({
              reportFormat: reportType,
              params: expect.objectContaining({
                assignmentSection: AssignmentSection.ActiveAssignments,
                page: expect.anything(),
                rowsPerPage: expect.anything(),
                search: expect.anything(),
                sort: expect.anything(),
              }),
            }),
          }),
        );
        expect(downloadFile).toHaveBeenCalledWith(`/download/test.${reportType}`);
      });
    });

    it('should have columns picker with only visible columns selected for my assignments table', async () => {
      render(<DashboardAssignmentsTable activeSection={AssignmentSection.MyAssignments} disableVirtualization />);

      userEvent.click(await screen.findByText('Columns'));
      const container = await screen.findByRole('menu');

      allMyAssignmentColumnPickerVisibleColumns.forEach((column) =>
        expect(within(container).getByLabelText(column)).toBeChecked(),
      );
      allMyAssignmentHiddenColumns.forEach((column) =>
        expect(within(container).getByLabelText(column)).not.toBeChecked(),
      );
    });

    it.each([
      [AssignmentSection.AllAssignments],
      [AssignmentSection.ActiveAssignments],
      [AssignmentSection.ReviewRequired],
      [AssignmentSection.AllSections],
    ])('should have columns picker with only visible columns selected for %s table', async (section) => {
      render(<DashboardAssignmentsTable activeSection={section} disableVirtualization />);

      userEvent.click(await screen.findByText('Columns'));
      const container = await screen.findByRole('menu');

      otherSectionsColumnPickerVisibleColumns.forEach((column) =>
        expect(within(container).getByLabelText(column)).toBeChecked(),
      );

      otherSectionsHiddenColumns.forEach((column) =>
        expect(within(container).getByLabelText(column)).not.toBeChecked(),
      );
    });

    it('should add a column when selecting a column in the column picker', async () => {
      render(<DashboardAssignmentsTable activeSection={AssignmentSection.AllAssignments} disableVirtualization />);

      fireEvent.click(await screen.findByText('Columns'));
      const hiddenColumn = 'Technical Reviewer';
      const columnCheckbox = await screen.findByLabelText(hiddenColumn);
      fireEvent.click(columnCheckbox);
      const [headers] = await screen.queryAllByRole('rowgroup');

      expect(within(headers).getByText(hiddenColumn)).toBeInTheDocument();
    });

    it('should remove a column when deselecting a column in the column picker', async () => {
      render(<DashboardAssignmentsTable activeSection={AssignmentSection.AllAssignments} disableVirtualization />);

      const columnsPickerElement = await screen.findByText('Columns');
      fireEvent.click(columnsPickerElement);
      const visibleColumn = 'Lab Case ID';
      const columnCheckbox = await within(screen.getByRole('menu')).findByLabelText(visibleColumn);
      fireEvent.click(columnCheckbox);

      const [headers] = await screen.queryAllByRole('rowgroup');
      expect(within(headers).queryByText(visibleColumn)).not.toBeInTheDocument();
    });
  });
});
