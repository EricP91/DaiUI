import {useGetItems} from 'api/dashboard';
import {GetRowsResult} from '../DashboardTable';
import {ItemsSearchRequest} from 'types/search-request';
import {Item} from 'types/items';

export const getItemRows = (item: Item): {[key: string]: unknown} => {
  return {
    ...item,
  };
};

const useGetRows = (searchRequest: ItemsSearchRequest): GetRowsResult => {
  const {data: items, isLoading, isPreviousData} = useGetItems(searchRequest);

  return items
    ? {
        isPreviousData,
        isLoading,
        totalCount: items.pages * items.rowsPerPage,
        rows: items.data.map(getItemRows),
      }
    : {totalCount: 0, rows: [], isLoading, isPreviousData};
};

export default useGetRows;
