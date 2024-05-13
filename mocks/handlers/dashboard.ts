import {ms} from 'mocks/ms';
import {PathParams, RestRequest, rest} from 'msw';
import {DashboardOverview} from 'types/dashboard/overview';
import {apiRoutes} from 'utils/routes/api-routes';
import {getAssignmentsSearchResponseMock, getItemsSearchResponseMock} from './dashboard.mock';
import {UserDataCount} from 'types/dashboard/user-data-count';
import {CustomColumns as CustomFields} from 'types/dashboard/custom-columns';
import {AssignmentSearchRequest, AssignmentSection, ItemSection, ItemsSearchRequest} from 'types/search-request';

export const countUserDataMock: UserDataCount = {
  items: {
    total: 20,
    myCustody: 10,
  },
  assignments: {
    total: 40,
    allMyAssignments: 10,
    allAssignments: 10,
    activeAssignments: 10,
    reviewRequired: 10,
  },
};

export const userOverviewMock = {
  itemsInMyCustody: 13,
  unclaimedAssignments: 4,
  activeAssignments: 12,
  reviewRequired: 16,
};

export const dashboardOverviewMock: DashboardOverview = {
  userOverview: userOverviewMock,
  countUserData: countUserDataMock,
};

const customFieldsMock: CustomFields = {
  data: [
    {shortDescription: 'Search Warrant'},
    {shortDescription: 'Assignment Deadline'},
    {shortDescription: 'Priority'},
    {shortDescription: 'Notes / Observations'},
  ],
};

const getRequestParams = (
  req: RestRequest<never, PathParams<string>>,
): AssignmentSearchRequest & ItemsSearchRequest => {
  const url = new URL(req.url);
  return {
    rowsPerPage: Number(url.searchParams.get('rowsPerPage')) ?? 10,
    page: Number(url.searchParams.get('page')) - 1 || 1,
    assignmentSection: url.searchParams.get('assignmentSection') as AssignmentSection,
    itemsSection: url.searchParams.get('itemsSection') as ItemSection,
    search: url.searchParams.get('search') || undefined,
    sort: url.searchParams.get('sort') || undefined,
    order: (url.searchParams.get('order') as 'asc' | 'desc') || undefined,
  };
};

export const dashboardHandlers = [
  rest.get(`${apiRoutes.dashboard.overview}/:userId`, (_req, res, ctx) => {
    return res(ctx.delay(ms(1500)), ctx.status(200), ctx.json(dashboardOverviewMock));
  }),

  rest.get(`${apiRoutes.dashboard.customFields}`, (_req, res, ctx) => {
    return res(ctx.delay(ms(1500)), ctx.status(200), ctx.json(customFieldsMock));
  }),

  rest.get(`${apiRoutes.dashboard.assignments}`, (req, res, ctx) => {
    const {rowsPerPage, page, ...params} = getRequestParams(req);

    return res(
      ctx.delay(ms(500)),
      ctx.status(200),
      ctx.json(
        getAssignmentsSearchResponseMock({
          page: +page!,
          rowsPerPage: +rowsPerPage!,
          ...params,
        }),
      ),
    );
  }),

  rest.get(`${apiRoutes.dashboard.items}`, (req, res, ctx) => {
    const {rowsPerPage, page, ...params} = getRequestParams(req);
    return res(
      ctx.delay(ms(500)),
      ctx.status(200),
      ctx.json(getItemsSearchResponseMock({page: +page!, rowsPerPage: +rowsPerPage!, ...params})),
    );
  }),

  rest.get(`${apiRoutes.dashboard.sectionItems}`, (req, res, ctx) => {
    const {...params} = getRequestParams(req);
    return res(ctx.delay(ms(500)), ctx.status(200), ctx.json(getItemsSearchResponseMock({...params})));
  }),

  rest.post(`${apiRoutes.dashboard.report}/:reportType`, (req, res, ctx) => {
    const url = new URL(req.url);
    const reportFormat = url.searchParams.get('reportFormat');
    return res(
      ctx.delay(ms(500)),
      ctx.status(200),
      ctx.json({
        url: `/download/test.${reportFormat}`,
      }),
    );
  }),
];
