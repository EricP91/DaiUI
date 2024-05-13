import {render, screen, waitFor} from 'test-utils';
import userEvent from '@testing-library/user-event';
import {RenderResult, fireEvent} from '@testing-library/react';
import {vi} from 'vitest';
import MoveEvidenceContent from './MoveEvidenceContent';

const mockedSubmissionItems = [
  {
    id: '12345678',
    assignmentType: 'Digital forensics',
    submissionId: '7682',
    servicesRequested: [
      {
        id: '1',
        name: 'DNA Analysis',
      },
      {
        id: '2',
        name: 'Digitcal Forensic',
      },
    ],
    description: 'iPhone 12 Pro Max',
    dangerFlag: 'Broken screen',
    submittingAgency: 'NYPD',
    type: 'Iphone grey',
  },
];

const setAddItemDialogOpen = vi.fn();
const setRemoveItemDialogOpen = vi.fn();
const handleAddItem = vi.fn();
const submissionItems = mockedSubmissionItems;
const itemIds = ['123'];
const setCurrentItem = vi.fn();

const renderMoveEvidenceContent = (): RenderResult =>
  render(
    <MoveEvidenceContent
      setAddItemDialogOpen={setAddItemDialogOpen}
      setRemoveItemDialogOpen={setRemoveItemDialogOpen}
      handleAddItem={handleAddItem}
      submissionItems={submissionItems}
      itemIds={itemIds}
      setCurrentItem={setCurrentItem}
    />,
  );

describe('Move Evidence', () => {
  test('should show submission items', async () => {
    renderMoveEvidenceContent();

    expect(screen.getByText(/Item Description/i)).toBeInTheDocument();
    expect(screen.getByText(/Current location/i)).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText('12345678')).toBeInTheDocument());
  });

  test('should display location dropdown and test for type event', async () => {
    const {getByTestId} = renderMoveEvidenceContent();

    const wrapperNode = getByTestId('destination-selector');
    const locationSelector = screen.getByLabelText('Destination location');
    expect(wrapperNode).toBeInTheDocument();
    expect(locationSelector).toBeInTheDocument();
    await userEvent.click(wrapperNode);
    await userEvent.type(wrapperNode, 'My Custody');
    await userEvent.type(wrapperNode, '{enter}');
    expect(locationSelector).toHaveValue('My Custody');
  });

  test('should display item ids', async () => {
    renderMoveEvidenceContent();
    const wrapperNode = screen.getByTestId('item-id-selector');
    expect(wrapperNode).toBeInTheDocument();
    const itemIdsSelector = screen.getByLabelText('Item ID');
    expect(itemIdsSelector).toBeInTheDocument();

    await userEvent.click(wrapperNode);
    await userEvent.type(wrapperNode, '123');
    await userEvent.type(wrapperNode, '{enter}');
    await waitFor(() => expect(itemIdsSelector).toHaveValue(''));
  });

  test('should type for note and test for type event', async () => {
    renderMoveEvidenceContent();
    const noteEditor = screen.getByRole('textbox', {name: 'Add note...'});
    fireEvent.change(noteEditor, {target: {value: 'My Note'}});
    await waitFor(() => expect(noteEditor).toHaveValue('My Note'));
  });

  test('should add item by itemCode', async () => {
    renderMoveEvidenceContent();
    expect(screen.getByLabelText('add-item')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('add-item'));
    expect(handleAddItem).toBeCalled();
  });

  test('should show remove item dialog and remove item once by clicking remove item', async () => {
    renderMoveEvidenceContent();
    const removeButton = screen.getByRole('button', {name: /remove/i});
    expect(removeButton).toBeInTheDocument();

    fireEvent.click(removeButton);
    expect(setRemoveItemDialogOpen).toHaveBeenCalledWith(true);
    expect(setCurrentItem).toHaveBeenCalledWith(mockedSubmissionItems[0]);
  });
});
