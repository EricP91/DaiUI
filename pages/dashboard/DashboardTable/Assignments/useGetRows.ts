import {useGetAssignments, useGetCustomFields} from 'api/dashboard';
import {Assignment} from 'types/assignment';
import {AssignmentSearchRequest} from 'types/search-request';
import {GetRowsResult} from '../DashboardTable';
import {ColumnField} from './useGetColumns';

export const getAssignmentRows = (
  assignment: Assignment,
  customFields?: {shortDescription: string}[],
): {[key: string]: unknown} => {
  const additionalFields = customFields?.reduce((acc, currentValue) => {
    return {
      ...acc,
      [currentValue.shortDescription]: assignment[currentValue.shortDescription],
    };
  }, {});
  return {
    ...assignment,
    ...additionalFields,
    [ColumnField.itemsCount]: assignment.items?.length,
  };
};

const useGetRows = (searchRequest: AssignmentSearchRequest): GetRowsResult => {
  const {data: assignments, isLoading, isPreviousData} = useGetAssignments(searchRequest);
  const {data: customFieldResponse} = useGetCustomFields();
  const customFields = customFieldResponse?.data ?? [];

  return assignments
    ? {
        isPreviousData,
        isLoading,
        totalCount: assignments.pages * assignments.rowsPerPage,
        rows: assignments.data.map((row) => getAssignmentRows(row, customFields)),
      }
    : {totalCount: 0, rows: [], isLoading, isPreviousData};
};

export default useGetRows;
