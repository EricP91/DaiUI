import {fireEvent, render, screen, waitFor, within} from 'test-utils';
import {ItemSection} from 'types/search-request';
import {DashboardItemsTable} from './DashboardItemsTable';
import axios from 'axios';
import {itemsHiddenColumns, itemsVisibleColumns} from './mocks/items-table.mock';
import {downloadFile} from '@cellebrite/design-system';
import userEvent from '@testing-library/user-event';
import {ReportType} from 'types/report';
import {apiRoutes} from 'utils/routes/api-routes';

vi.mock('@cellebrite/design-system', async () => {
  const ds = await vi.importActual('@cellebrite/design-system');
  return {
    ...(ds as object),
    downloadFile: vi.fn(),
  };
});

describe('DashboardItemsTable', () => {
  it.each([[ItemSection.AllItems], [ItemSection.MyCustody]])(
    'should render 10 columns when section is %s',
    async (section) => {
      render(<DashboardItemsTable activeSection={section} disableVirtualization />);

      await waitFor(() => {
        itemsVisibleColumns.forEach((column) => expect(screen.getByText(new RegExp(column, 'i'))).toBeInTheDocument());
      });
    },
  );

  it.each([[ItemSection.AllItems], [ItemSection.MyCustody]])(
    'should have expandable assignments table for %s table',
    async (section) => {
      render(<DashboardItemsTable activeSection={section} disableVirtualization />);

      fireEvent.click((await screen.findAllByTestId('KeyboardArrowRightIcon'))[0]);
      const container = await screen.findByTestId('nested-table');

      expect(within(container).getByText(/Assignment Type/i)).toBeInTheDocument();
      expect(within(container).getByText(/Assignment Status/i)).toBeInTheDocument();
      expect(within(container).getByText(/Last Updated/i)).toBeInTheDocument();
      expect(within(container).getByText(/Actions/i)).toBeInTheDocument();
    },
  );

  it.each([[ItemSection.AllItems], [ItemSection.MyCustody]])(
    'should sort by lab case id in %s table',
    async (section) => {
      const spy = vi.spyOn(axios, 'get');
      render(<DashboardItemsTable activeSection={section} disableVirtualization />);
      fireEvent.click(await screen.findByText('Lab Case ID'));
      await waitFor(() =>
        expect(spy).toHaveBeenCalledWith(
          expect.anything(),
          expect.objectContaining({params: expect.objectContaining({sort: 'labCaseID', order: 'asc'})}),
        ),
      );
    },
  );

  describe('Toolbar', () => {
    it.each([[ItemSection.AllItems], [ItemSection.MyCustody]])('should search in %s table', async (section) => {
      const spy = vi.spyOn(axios, 'get');
      render(<DashboardItemsTable activeSection={section} disableVirtualization />);
      const input = screen.getByPlaceholderText('Search...');
      fireEvent.change(input, {target: {value: '123'}});

      await waitFor(() =>
        expect(spy).toHaveBeenCalledWith(
          expect.anything(),
          expect.objectContaining({params: expect.objectContaining({search: '123'})}),
        ),
      );
    });

    it.each(['csv', 'pdf', 'json', 'xml'])('should export %s report', async (reportType) => {
      const spy = vi.spyOn(axios, 'post');

      render(<DashboardItemsTable activeSection={ItemSection.AllItems} disableVirtualization />);
      userEvent.click(screen.getByText('Export'));
      userEvent.click(await screen.findByText(reportType));

      await waitFor(() => {
        expect(spy).toHaveBeenCalledWith(
          `${apiRoutes.dashboard.report}/${ReportType.ItemsTable}`,
          undefined,
          expect.objectContaining({
            params: expect.objectContaining({
              reportFormat: reportType,
              params: expect.objectContaining({
                itemsSection: ItemSection.AllItems,
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

    it.each([[ItemSection.AllItems], [ItemSection.MyCustody]])(
      'should have columns picker with only visible columns selected for %s table',
      async (section) => {
        render(<DashboardItemsTable activeSection={section} disableVirtualization />);

        fireEvent.click(await screen.findByText('Columns'));
        const container = await screen.findByRole('menu');
        itemsVisibleColumns.forEach((column) =>
          expect(within(container).getByLabelText(new RegExp(column, 'i'))).toBeChecked(),
        );
        itemsHiddenColumns.forEach((column) =>
          expect(within(container).getByLabelText(new RegExp(column, 'i'))).not.toBeChecked(),
        );
      },
    );
  });
});
