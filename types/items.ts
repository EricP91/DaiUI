import type {Assignment} from './assignment';

export interface Association {
  name: string;
  association: string;
}

export interface Item {
  id: string;
  location: string;
  labCaseID: string;
  submittingAgency: string;
  incidentCaseNumber: string;
  caseType: string;
  type: string;
  description: string;
  dangerFlag: string;
  status: string;
  caseOfficer: string;
  associations: Association[];
  modifiedDate: string;
  createdAt: string;
  servicesRequested?: {id: string; name: string}[];
  assignments: Assignment[];
}
