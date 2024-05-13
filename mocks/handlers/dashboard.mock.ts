import {Assignment} from './../../types/assignment';

import {Item} from 'types/items';
import {AssignmentSearchRequest, ItemsSearchRequest, SearchResponse, ItemSection} from 'types/search-request';
import {faker} from '@faker-js/faker';
import random from 'lodash-es/random';
import {isString, orderBy} from 'lodash-es';

const NUMBER_OF_ASSIGNMENTS = 1000;
const NUMBER_OF_ITEMS = 1000;
const sections = ['all-assignments', 'my-assignments', 'active-assignments', 'review-required', 'all-sections'];
const assignmentStatus = [
  'Pending Analyst Assignment',
  'Pending Analysis',
  'Approved',
  'Cancelled',
  'Pending Administrative Review',
  'Submission Rejected',
];
const itemStatus = [
  'Pending Destruction',
  'Pending Analysis',
  'Check Out',
  'Pending Destruction',
  'Pending Return to Department',
];
const locations = ['Analyst Custody', 'My Custody'];

const itemsMock: Item[] = Array(NUMBER_OF_ITEMS)
  .fill(null)
  .map((_, i) => ({
    id: `${i}`,
    location: locations[random(0, locations.length - 1)],
    labCaseID: `PDE2022-000${i}`,
    submittingAgency: 'Zeus PD',
    caseType: 'Murder',
    type: 'Phone',
    description: 'Derivate of IPhone 11',
    dangerFlag: 'Broken Screen',
    incidentCaseNumber: faker.string.numeric(),
    caseOfficer: faker.person.fullName(),
    status: itemStatus[random(0, itemStatus.length - 1)],
    modifiedDate: '2022-09-21T12:20:40.000Z',
    createdAt: '2022-09-21T12:20:40.000Z',
    associations: [
      {
        name: faker.person.fullName(),
        association: 'Victim',
      },
      {
        name: faker.person.fullName(),
        association: 'Victim',
      },
      {
        name: faker.person.fullName(),
        association: 'Victim',
      },
    ],
    assignments: [
      {
        id: i,
        type: 'Digital Forensics',
        status: 'Pending Analyst Assignment',
        modifiedAt: faker.date.recent().toISOString(),
      },
    ],
  })) as Item[];

const assignmentsMock: Assignment[] = Array(NUMBER_OF_ASSIGNMENTS)
  .fill(null)
  .map(
    (_, i) =>
      ({
        id: i,
        age: 4,
        labCaseID: `DFU2022-000${i}`,
        submittingAgency: sections[random(0, sections.length - 1)],
        incidentCaseNumber: '12345678',
        caseType: 'Murder',
        type: 'Digital Forensics',
        status: assignmentStatus[random(0, assignmentStatus.length - 1)],
        analyst: 'QA Nanashev',
        claimedDate: '2022-09-21T12:20:40.000Z',
        createdAt: '2022-09-21T12:20:40.000Z',
        peerAssigned: faker.person.fullName(),
        peerAssignedActionDate: faker.date.recent().toISOString(),
        finalReviewer: faker.person.fullName(),
        finalReviewerActionDate: faker.date.recent().toISOString(),
        additionalField1: faker.company.name(),
        additionalField2: faker.company.name(),
        additionalField3: faker.company.name(),
        additionalField4: faker.company.name(),
        additionalField5: faker.company.name(),
        modifiedAt: faker.date.recent().toISOString(),
        items: itemsMock.slice(0, random(1, 3)),
        'Notes / Observations': faker.music.songName(),
        'Assignment Deadline': faker.word.words(),
        Priority: 'Low',
        'Search Warrant': faker.word.words(),
        createdBy: faker.person.fullName(),
        modifiedBy: faker.person.fullName(),
      }) as Assignment,
  );

export const getAssignmentsSearchResponseMock = ({
  page,
  rowsPerPage,
  assignmentSection,
  search,
  sort,
  order,
}: AssignmentSearchRequest): SearchResponse<Assignment> => {
  const sectionFilterCriteria = (assignment: Assignment): boolean => assignment.submittingAgency === assignmentSection;
  const searchFilterCriteria = search
    ? (assignment: Assignment) =>
        Object.values(assignment).filter(
          (key: unknown) => isString(key) && key.toLowerCase().includes(search.toLowerCase()),
        ).length > 0
    : () => true;
  const filterCriteria = (assignment: Assignment): boolean =>
    sectionFilterCriteria(assignment) && searchFilterCriteria(assignment);
  const sortedAndFilteredItems = orderBy(assignmentsMock, sort, order).filter(filterCriteria);

  return {
    data: sortedAndFilteredItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    currentPage: page,
    pages: Math.ceil(sortedAndFilteredItems.length / rowsPerPage),
    rowsPerPage: rowsPerPage,
  };
};

export const getItemsSearchResponseMock = ({
  page,
  rowsPerPage,
  itemsSection,
  search,
  sort,
  order,
}: ItemsSearchRequest): SearchResponse<Item> => {
  const getCustodyLocationFromSection = (section: ItemSection): string =>
    section
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  const sectionFilterCriteria =
    itemsSection === 'all-items'
      ? () => true
      : (item: Item) => item.location === getCustodyLocationFromSection(itemsSection);
  const searchFilterCriteria = search
    ? (item: Item) =>
        Object.values(item).filter((key: unknown) => isString(key) && key.toLowerCase().includes(search.toLowerCase()))
          .length > 0
    : () => true;
  const filterCriteria = (item: Item): boolean => sectionFilterCriteria(item) && searchFilterCriteria(item);
  const sortedAndFilteredItems = orderBy(itemsMock, sort, order).filter(filterCriteria);

  return {
    data: sortedAndFilteredItems.slice(
      page * rowsPerPage,
      rowsPerPage ? rowsPerPage + page * rowsPerPage : sortedAndFilteredItems.length,
    ),
    currentPage: page,
    pages: Math.ceil(sortedAndFilteredItems.length / rowsPerPage),
    rowsPerPage: rowsPerPage,
  };
};
