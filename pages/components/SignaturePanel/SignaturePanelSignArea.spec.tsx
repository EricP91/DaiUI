import {render, screen} from 'test-utils';
import SignaturePanelSignArea from './SignaturePanelSignArea';
import React from 'react';
import SignatureCanvas from 'react-signature-canvas';
import {SignatureChangeType} from 'types/receive';
import userEvent from '@testing-library/user-event';

describe('SignaturePanelSignArea', () => {
  const onSignatureChange = vi.fn();

  it('should call onSignatureChange with correct parameters after signature happens ', async () => {
    const ref = React.createRef<SignatureCanvas & {_sigPad: {onEnd: () => void; off: () => void}}>();
    render(<SignaturePanelSignArea signatureCanvasRef={ref} onSignatureChange={onSignatureChange} />);
    ref?.current?._sigPad.onEnd(); // simulate signature

    expect(onSignatureChange).toHaveBeenCalledWith(
      expect.objectContaining({dataUrl: ref.current?.toDataURL()}),
      SignatureChangeType.Sign,
    );
  });

  it('should call onSignatureChange with correct parameters after clear happens ', async () => {
    render(
      <SignaturePanelSignArea
        onSignatureChange={onSignatureChange}
        signature={{dataUrl: 'data:image/png;base64,123'}}
      />,
    );

    await userEvent.click(screen.getByRole('button', {name: /clear/i}));

    expect(onSignatureChange).toHaveBeenCalledWith(
      {dataUrl: undefined, name: '', isApproved: false},
      SignatureChangeType.Clear,
    );
  });

  it('should call onSignatureChange with the correct paramters after approve happens', async () => {
    render(
      <SignaturePanelSignArea
        onSignatureChange={onSignatureChange}
        signature={{dataUrl: 'data:image/png;base64,123'}}
      />,
    );

    await userEvent.click(screen.getByRole('button', {name: /accept signature/i}));

    expect(onSignatureChange).toHaveBeenCalledWith(
      expect.objectContaining({isApproved: true}),
      SignatureChangeType.Approve,
    );
  });
});
