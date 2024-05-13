import {SearchRequest} from './search-request';

export const enum ReportType {
  AssignmentsTable = 'assignments-table',
  ItemsTable = 'items-table',
}

export const REPORT_FORMAT_TYPES = ['csv', 'pdf', 'json', 'xml'] as const;

export type ReportFormat = (typeof REPORT_FORMAT_TYPES)[number];

export interface ReportRequest {
  reportFormat?: ReportFormat;
  params: SearchRequest;
}

export interface ReportResponse {
  url: string;
}
