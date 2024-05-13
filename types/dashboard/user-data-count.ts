interface UserItemsSectionsCount {
  total: number;
  myCustody: number;
}

interface UserAssignmentsSectionsCount {
  total: number;
  allMyAssignments: number;
  allAssignments: number;
  activeAssignments: number;
  reviewRequired: number;
}

export interface UserDataCount {
  items: UserItemsSectionsCount;
  assignments: UserAssignmentsSectionsCount;
}
