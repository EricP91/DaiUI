import type {Item} from './items';

export interface Assignment {
  id: number;
  age: number;
  labCaseID: string;
  submittingAgency: string;
  incidentCaseNumber: string;
  caseType: string;
  type: string;
  status: string;
  analyst: string;
  claimedDate: string;
  items: Item[];
  peerAssigned: string;
  peerAssignedActionDate: string;
  finalReviewer: string;
  finalReviewerActionDate: string;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  [key: string]: unknown;
}
