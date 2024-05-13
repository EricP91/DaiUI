import {MInput} from '@cellebrite/design-system';
import SignaturePanelSignArea from './SignaturePanelSignArea';
import {styled} from '@mui/material';
import {Signature, SignatureChangeEvent, SignatureChangeType} from 'types/receive';
import SignatureCanvas from 'react-signature-canvas';

const MInputStyled = styled(MInput)(({theme}) => ({
  margin: theme.spacing(4, 0, 3, 0),
  input: {
    backgroundColor: theme.palette.ui.light,
    border: `1px solid ${theme.palette.ui.mutedLight}`,
    borderRadius: theme.spacing(1),
  },
}));

interface SignaturePanelTabProps {
  signature?: Signature;
  onSignatureChange?: SignatureChangeEvent;
  signatureCanvasRef?: React.RefObject<SignatureCanvas>;
}

const SignaturePanelTab = ({
  onSignatureChange = () => {},
  signature,
  signatureCanvasRef,
}: SignaturePanelTabProps): JSX.Element => {
  const handleTextInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onSignatureChange({...signature, name: event.target.value}, SignatureChangeType.ChangeName);
  };

  return (
    <>
      <MInputStyled
        size="small"
        label="Name"
        type="search"
        fullWidth
        value={signature?.name}
        onChange={handleTextInputChange}
      />
      <SignaturePanelSignArea
        signatureCanvasRef={signatureCanvasRef}
        signature={signature}
        onSignatureChange={onSignatureChange}
      />
    </>
  );
};

export default SignaturePanelTab;
