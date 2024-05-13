import {GridSortModel} from '@mui/x-data-grid-pro';
import {create} from 'zustand';
import {devtools, persist} from 'zustand/middleware';
import {AssignmentSection, ItemSection} from 'types/search-request';

export type TableState<T extends string> = {
  selectedColumns?: Record<string, boolean>;
  setSelectedColumns: (columns: Record<string, boolean>) => void;
  searchQuery?: string;
  setSearchQuery: (query: string) => void;
  sort: GridSortModel;
  setSort: (sort: GridSortModel) => void;
  rowsPerPage: number;
  setRowsPerPage: (rowsPerPage: number) => void;
  pageSectionMapping: Record<T, number>;
  setPageSectionMapping: (pageSectionMapping: Record<T, number>) => void;
};

interface AssignmentTableState extends TableState<AssignmentSection> {
  filter?: 'unclaimed' | 'my-active' | 'pending-review';
  setFilter: (filter?: 'unclaimed' | 'my-active' | 'pending-review') => void;
}

interface ItemTableState extends TableState<ItemSection> {}

export const useAssignmentTableStore = create<AssignmentTableState>()(
  devtools(
    persist(
      (set) => ({
        searchQuery: undefined,
        setSearchQuery: (query: string) => set((state: AssignmentTableState) => ({...state, searchQuery: query})),
        selectedColumns: undefined,
        setSelectedColumns: (columns: Record<string, boolean>) =>
          set((state: AssignmentTableState) => ({...state, selectedColumns: columns})),
        sort: [{field: 'id', sort: 'desc'}],
        setSort: (sort: GridSortModel) => set((state: AssignmentTableState) => ({...state, sort})),
        rowsPerPage: 10,
        pageSectionMapping: {
          [AssignmentSection.ActiveAssignments]: 0,
          [AssignmentSection.AllAssignments]: 0,
          [AssignmentSection.MyAssignments]: 0,
          [AssignmentSection.ReviewRequired]: 0,
          [AssignmentSection.AllSections]: 0,
        },
        setPageSectionMapping: (pageSectionMapping) =>
          set((state: AssignmentTableState) => ({...state, pageSectionMapping})),
        setRowsPerPage: (rowsPerPage: number) => set((state: AssignmentTableState) => ({...state, rowsPerPage})),
        filter: undefined,
        setFilter: (filter?: 'unclaimed' | 'my-active' | 'pending-review') =>
          set((state: AssignmentTableState) => ({...state, filter})),
      }),
      {name: 'dashboard-assignment-table-store'},
    ),
  ),
);

export const useItemsTableStore = create<ItemTableState>()(
  devtools(
    persist(
      (set) => ({
        searchQuery: undefined,
        setSearchQuery: (query: string) => set((state: ItemTableState) => ({...state, searchQuery: query})),
        selectedColumns: undefined,
        setSelectedColumns: (columns: Record<string, boolean>) =>
          set((state: ItemTableState) => ({...state, selectedColumns: columns})),
        sort: [],
        setSort: (sort: GridSortModel) => set((state: ItemTableState) => ({...state, sort})),
        pageSectionMapping: {
          [ItemSection.MyCustody]: 0,
          [ItemSection.AnalystCustody]: 0,
          [ItemSection.AllItems]: 0,
        },
        setPageSectionMapping: (pageSectionMapping) => set((state: ItemTableState) => ({...state, pageSectionMapping})),
        rowsPerPage: 10,
        setRowsPerPage: (rowsPerPage: number) => set((state: ItemTableState) => ({...state, rowsPerPage})),
      }),
      {name: 'dashboard-items-table-store'},
    ),
  ),
);
