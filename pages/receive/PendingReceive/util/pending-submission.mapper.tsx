import {ColumnField} from '../useGetColumns';
import {Submission} from 'types/receive';
import {GridRowsProp} from '@mui/x-data-grid-pro';

export const mapPendingSubmissionsToTableRows = (pendingSubmissions?: Submission[]): GridRowsProp => {
  return (
    pendingSubmissions?.map((submission: Submission) => ({
      id: submission.id,
      [ColumnField.incidentNumber]: submission.incidentCaseNumber,
      [ColumnField.submittingAgency]: submission.submittingAgency,
      [ColumnField.caseType]: submission.caseType,
      [ColumnField.caseClass]: submission.caseClass,
      [ColumnField.caseOfficer]: submission.caseOfficer,
      [ColumnField.filesAttached]: submission.items?.length || 0,
      [ColumnField.packingSlip]: submission.packingSlip,
      items: submission.items,
    })) || []
  );
};
