import {render, screen} from 'test-utils';
import ScanBarcodeSubmissionItem from './ScanBarcodeSubmissionItem';

const onRemoveMock = vi.fn();

describe('ScanBarcodeSubmissionItem', () => {
  it('should render services', async () => {
    render(
      <ScanBarcodeSubmissionItem
        itemCode="A1B2C3"
        itemDescription="some description"
        services={[
          {name: 'Service 1', id: '1'},
          {name: 'Service 2', id: '2'},
        ]}
        onRemove={onRemoveMock}
      />,
    );
    expect(screen.getByText('Service 1, Service 2')).toBeVisible();
  });
});
