import {render, screen} from 'test-utils';
import userEvent from '@testing-library/user-event';
import AddItemDialogContent from './AddItemDialogContent';

import {Item} from 'types/items';

describe('Add Item Dialog Content', () => {
  const mockPendingItems: Item[] | undefined = [
    {
      id: '0',
      location: 'Analyst Custody',
      labCaseID: 'PDE2022-0000',
      submittingAgency: 'Zeus PD',
      caseType: 'Murder',
      type: 'Phone',
      description: 'Derivate of IPhone 11',
      dangerFlag: 'Broken Screen',
      incidentCaseNumber: '3',
      caseOfficer: 'Ann Sanford',
      status: 'Pending Destruction',
      modifiedDate: '2022-09-21T12:20:40.000Z',
      createdAt: '2022-09-21T12:20:40.000Z',
      associations: [
        {
          name: 'Whitney Hoppe',
          association: 'Victim',
        },
        {
          name: 'Glenn Lubowitz',
          association: 'Victim',
        },
        {
          name: 'Sylvia Hagenes',
          association: 'Victim',
        },
      ],
      assignments: [],
    },
  ];
  const mockSelectItemsFn = vi.fn();

  test('should select item', async () => {
    render(<AddItemDialogContent pendingItems={mockPendingItems} onSelectItems={mockSelectItemsFn} />);

    // Assert that the table component is rendered
    const rowSelectCheckbox = screen.getAllByLabelText('Select row')[0];
    expect(rowSelectCheckbox).toBeInTheDocument();
    await userEvent.click(rowSelectCheckbox);
    expect(mockSelectItemsFn).toHaveBeenCalled();
  });
});
