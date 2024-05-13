import SignaturePanel from 'pages/components/SignaturePanel/SignaturePanel';

import type SignatureCanvas from 'react-signature-canvas';
import {useTransactionStore} from 'store/receive/transaction.store';

interface SignTransactionSignaturePanelProps {
  signatureCanvasRef?: React.RefObject<SignatureCanvas>;
}

const SignTransactionSignaturePanel = ({signatureCanvasRef}: SignTransactionSignaturePanelProps): JSX.Element => {
  const {labSignature, setLabSignature, submitterSignature, setSubmitterSignature} = useTransactionStore();
  return (
    <SignaturePanel
      signatureCanvasRef={signatureCanvasRef}
      type="transaction"
      labSignature={labSignature}
      onLabSignatureChanged={setLabSignature}
      submitterSignature={submitterSignature}
      onSubmitterSignatureChanged={setSubmitterSignature}
    />
  );
};

export default SignTransactionSignaturePanel;
