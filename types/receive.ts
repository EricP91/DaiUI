import {Assignment} from './assignment';
import {Item} from './items';

export interface ReceiveResponse {
  itemCode: string;
  itemDescription: string;
  fromDepartment: string;
  ori: number;
  oriAssignmentId: number;
  eventId: number;
  location: string;
  services: {id: string; name: string}[];
}

export type SubmissionItem = Pick<Item, 'id'> &
  Partial<Item> &
  Pick<Assignment, 'assignmentType'> & {submissionId: string; servicesRequested: {id: string; name: string}[]};

export interface Submission {
  id: number;
  incidentCaseNumber: string;
  submittingAgency: string;
  caseType: string;
  caseClass: string;
  caseOfficer: string;
  packingSlip: string;
  items: SubmissionItem[];
}

export type Signature = {
  name?: string;
  dataUrl?: string;
  isApproved?: boolean;
};

export enum SignatureChangeType {
  ChangeName = 1,
  Clear,
  Sign,
  Approve,
}

export type SignatureChangeEvent = (signature: Signature, changeType: SignatureChangeType) => void;

export const enum ReceiveFlowSteps {
  ReviewAndEdit = 0,
  SignTransaction = 1,
  TransactionConfirmed = 2,
  MoveEvidence = 3,
  Complete = 4,
}
