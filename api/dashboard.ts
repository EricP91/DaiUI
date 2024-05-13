import {apiRoutes} from 'utils/routes/api-routes';
import {UsePostVariables, useFetch, usePost} from 'utils/react-query';
import {UseMutationResult, UseQueryResult} from '@tanstack/react-query';
import {Assignment} from 'types/assignment';
import {DashboardOverview} from 'types/dashboard/overview';
import {AssignmentSearchRequest, ItemSection, ItemsSearchRequest, SearchResponse} from 'types/search-request';
import {Item} from 'types/items';
import {CustomColumns} from 'types/dashboard/custom-columns';
import {ReportResponse, ReportType} from 'types/report';

export const useGetDashboardOverview = (userId = 1): UseQueryResult<DashboardOverview, Error> => {
  return useFetch<DashboardOverview>({url: `${apiRoutes.dashboard.overview}/${userId}`, config: {retry: false}});
};

export const useGetAssignments = (
  searchRequest: AssignmentSearchRequest,
): UseQueryResult<SearchResponse<Assignment>, Error> => {
  return useFetch<SearchResponse<Assignment>>({
    url: apiRoutes.dashboard.assignments,
    params: {...searchRequest},
    config: {retry: false, keepPreviousData: true},
  });
};

export const useGetItems = (searchRequest: ItemsSearchRequest): UseQueryResult<SearchResponse<Item>, Error> => {
  return useFetch<SearchResponse<Item>>({
    url: apiRoutes.dashboard.items,
    params: {...searchRequest},
    config: {
      retry: false,
      keepPreviousData: true,
      select: ({data, ...other}) => {
        return {
          ...other,
          data: data.map((item) => {
            return {
              ...item,
              ...item.associations.reduce((acc, association, i) => {
                return {
                  ...acc,
                  [`association${i + 1}`]: association.association,
                  [`name${i + 1}`]: association.name,
                };
              }, {}),
            };
          }),
        };
      },
    },
  });
};

export const useGetSectionItems = (itemsSection: ItemSection): UseQueryResult<{data: Item[]}, Error> => {
  return useFetch<{data: Item[]}>({
    url: apiRoutes.dashboard.sectionItems,
    params: {itemsSection},
  });
};

export const useGetCustomFields = (): UseQueryResult<CustomColumns, Error> => {
  return useFetch<CustomColumns>({
    url: `${apiRoutes.dashboard.customFields}`,
    config: {retry: false},
  });
};

export const useGenerateReport = (
  reportType: ReportType,
): UseMutationResult<ReportResponse, unknown, UsePostVariables> => {
  return usePost<{url: string}>({url: `${apiRoutes.dashboard.report}/${reportType}`});
};
