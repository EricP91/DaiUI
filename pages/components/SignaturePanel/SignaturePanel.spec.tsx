import {render, screen} from 'test-utils';
import SignaturePanel from './SignaturePanel';
import userEvent from '@testing-library/user-event';

describe('SignaturePanel', () => {
  it('should have only lab signature tab on move type', async () => {
    render(<SignaturePanel type="move" />);

    expect(screen.getByText(/lab signature/i)).toBeVisible();
    expect(screen.queryByText(/submitter's signature/i)).not.toBeInTheDocument();
  });

  it('should have both lab signature & submitter signature on transaction type', async () => {
    render(<SignaturePanel type="transaction" />);

    expect(screen.getByText(/lab signature/i)).toBeVisible();
    expect(screen.queryByText(/submitter's signature/i)).toBeVisible();
  });

  it('should have clear & approve signature button disabled by default', async () => {
    render(<SignaturePanel type="transaction" />);

    expect(screen.getByRole('button', {name: /clear/i})).toBeDisabled();
    expect(screen.getByRole('button', {name: /accept signature/i})).toBeDisabled();
  });

  it('should have clear & approved enabled when data url exists', async () => {
    render(<SignaturePanel type="transaction" submitterSignature={{dataUrl: 'data:image/png;base64,123'}} />);

    expect(screen.getByRole('button', {name: /clear/i})).toBeEnabled();
    expect(screen.getByRole('button', {name: /accept signature/i})).toBeEnabled();
  });

  it('should show checkmark icon on tab, label , and count,when signature is approved', async () => {
    render(
      <SignaturePanel type="transaction" submitterSignature={{isApproved: true}} labSignature={{isApproved: true}} />,
    );

    expect(screen.getByText(/Signatures - 2 out of 2 accepted/i)).toBeVisible();
    expect(screen.getByText(/signature accepted/i)).toBeVisible();
    expect(screen.queryAllByTestId('checked-icon')).toHaveLength(2);
  });

  it('should not show checkmark icon but do show accept signature button and counter when signature is not approved', async () => {
    render(
      <SignaturePanel type="transaction" submitterSignature={{isApproved: false}} labSignature={{isApproved: false}} />,
    );

    expect(screen.getByText(/Signatures - 0 out of 2 accepted/i)).toBeVisible();
    expect(screen.getByRole('button', {name: /accept signature/i})).toBeVisible();
    expect(screen.queryAllByTestId('checked-icon')).toHaveLength(0);
  });

  it('should call onSubmitterSignatureChanged when changing name', async () => {
    const onSubmitterSignatureChangedSpy = vi.fn();
    render(<SignaturePanel type="transaction" onSubmitterSignatureChanged={onSubmitterSignatureChangedSpy} />);

    const input = screen.getByRole('searchbox', {name: /name/i});
    await userEvent.type(input, 'John Doe', {delay: 0});

    expect(onSubmitterSignatureChangedSpy).toHaveBeenCalledWith(expect.objectContaining({name: 'John Doe'}));
  });
});
