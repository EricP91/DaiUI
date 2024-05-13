import {render} from 'test-utils';
import TransactionConfirmationTable from './TransactionConfirmationTable';

test('renders the table correctly', () => {
  const mockItem = [
    {
      id: '1',
      submittingAgency: 'Test Agency',
      description: 'Test description',
      assignmentType: 'xx',
      servicesRequested: [
        {id: '1', name: 'Service 1'},
        {id: '2', name: 'Service 2'},
      ],
      submissionId: '123',
    },
    {
      id: '1',
      submittingAgency: 'Test Agency',
      description: 'Test description',
      assignmentType: 'xx',
      servicesRequested: [
        {id: '1', name: 'Service 1'},
        {id: '2', name: 'Service 2'},
      ],
      submissionId: '123',
    },
  ];

  const {container} = render(<TransactionConfirmationTable items={mockItem} />);

  // Assert that the table component is rendered
  const tableElement = container.querySelector('.MuiDataGrid-root');
  expect(tableElement).toBeInTheDocument();

  // Assert that the table headers are rendered
  const columnHeaderElements = container.querySelectorAll('.MuiDataGrid-columnHeader');
  expect(columnHeaderElements.length).toBeGreaterThan(0);

  // Assert that the table rows are rendered
  const rowElements = container.querySelectorAll('.MuiDataGrid-row');
  expect(rowElements.length).toBe(mockItem.length);
});

// You can add more tests to cover other scenarios, such as testing the behavior when `items` is undefined or an empty array.
