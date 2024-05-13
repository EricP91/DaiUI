export interface SearchRequest {
  search?: string;
  page: number;
  rowsPerPage: number;
  filter?: string;
  sort?: string;
  order?: 'asc' | 'desc';
}

export const enum AssignmentSection {
  AllAssignments = 'all-assignments',
  MyAssignments = 'my-assignments',
  ActiveAssignments = 'active-assignments',
  ReviewRequired = 'review-required',
  AllSections = 'all-sections',
}

export const enum ItemSection {
  MyCustody = 'my-custody',
  AnalystCustody = 'analyst-custody',
  AllItems = 'all-items',
}

export interface AssignmentSearchRequest extends SearchRequest {
  assignmentSection: AssignmentSection;
  filter?: string;
}

export interface ItemsSearchRequest extends SearchRequest {
  itemsSection: ItemSection;
}

export interface SearchResponse<T> {
  data: T[];
  currentPage: number;
  pages: number;
  rowsPerPage: number;
}
