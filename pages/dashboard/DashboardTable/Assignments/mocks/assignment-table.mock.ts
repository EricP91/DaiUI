export const allMyAssignmentVisibleTableColumns = [
  'Items',
  'Age (Days)',
  'Lab Case ID',
  'Submitting Agency',
  'Incident/Case Number',
  'Case Type',
  'Assignment Type',
  'Assignment Status',
  'Claimed/Assigned',
  'Assignment Creation',
  'Actions',
];

export const allMyAssignmentHiddenColumns = [
  'Analyst',
  'Technical Reviewer',
  'Technical Action Date',
  'Administrative Reviewer',
  'Administrative Action Date',
  'Last Updated',
  'ID',
  'Assignment Deadline',
  'Priority',
  'Notes / Observations',
];

export const otherSectionsVisibleColumns = [
  'Items',
  'Age (Days)',
  'Lab Case ID',
  'Submitting Agency',
  'Incident/Case Number',
  'Case Type',
  'Assignment Type',
  'Assignment Status',
  'Analyst',
  'Claimed/Assigned',
  'Actions',
];

export const otherSectionsHiddenColumns = [
  'Assignment Creation',
  'Technical Reviewer',
  'Technical Action Date',
  'Administrative Reviewer',
  'Administrative Action Date',
  'Last Updated',
  'ID',
  'Assignment Deadline',
  'Priority',
  'Notes / Observations',
];

export const nestedItemsTable = [
  'Item ID',
  'Location',
  'Item Type',
  'Item Description',
  'Danger Flag',
  'Item Status',
  'Last Updated',
  'Case Officer',
  'Item Creation Date',
  'Actions',
];

export const otherSectionsColumnPickerVisibleColumns = otherSectionsVisibleColumns.filter(
  (column) => column !== 'Actions',
);

export const allMyAssignmentColumnPickerVisibleColumns = allMyAssignmentVisibleTableColumns.filter(
  (column) => column !== 'Actions',
);
