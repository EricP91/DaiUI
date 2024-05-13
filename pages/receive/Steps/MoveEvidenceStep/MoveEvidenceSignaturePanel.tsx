import SignaturePanel from 'pages/components/SignaturePanel/SignaturePanel';

import type SignatureCanvas from 'react-signature-canvas';
import {useTransactionStore} from 'store/receive/transaction.store';

interface MoveEvidenceSignaturePanelProps {
  signatureCanvasRef?: React.RefObject<SignatureCanvas>;
}

const MoveEvidenceSignaturePanel = ({signatureCanvasRef}: MoveEvidenceSignaturePanelProps): JSX.Element => {
  const {labSignature, setLabSignature} = useTransactionStore();
  return (
    <SignaturePanel
      type="move"
      signatureCanvasRef={signatureCanvasRef}
      labSignature={labSignature}
      onLabSignatureChanged={setLabSignature}
    />
  );
};

export default MoveEvidenceSignaturePanel;
