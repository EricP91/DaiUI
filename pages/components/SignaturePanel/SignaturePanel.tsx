import {CheckedIcon, MTabs} from '@cellebrite/design-system';
import {Box, Typography, styled} from '@mui/material';
import {useTranslation} from 'react-i18next';
import SignaturePanelTab from './SignaturePanelTab';
import {Signature, SignatureChangeType} from 'types/receive';
import {useState} from 'react';
import SignatureCanvas from 'react-signature-canvas';

const SignaturePanelStyled = styled(Box)(({theme}) => ({
  minHeight: 384,
  padding: theme.spacing(2),
  backgroundColor: theme.palette.ui.mutedSoft,
  borderRadius: theme.spacing(1),
}));

const MTabsStyled = styled(MTabs)(({theme}) => ({
  margin: theme.spacing(1, 0, 0, 0),
  '& .MuiTabs-flexContainer': {
    borderBottom: `2px solid ${theme.palette.ui.mutedHover}`,
  },
}));

interface SignaturePanelProps {
  type: 'move' | 'transaction';
  labSignature?: Signature;
  submitterSignature?: Signature;
  onLabSignatureChanged?: (signature?: Signature) => void;
  onSubmitterSignatureChanged?: (signature?: Signature) => void;
  signatureCanvasRef?: React.RefObject<SignatureCanvas>;
}

const signatureTypes = {
  move: {
    requiredSignatureCount: 1,
    approvals: (isLabSignatureApproved = false): boolean[] => {
      return [isLabSignatureApproved];
    },
  },
  transaction: {
    requiredSignatureCount: 2,
    approvals: (isLabSignatureApproved = false, isSubmitterSignatureApproved = false): boolean[] => {
      return [isLabSignatureApproved, isSubmitterSignatureApproved];
    },
  },
};

const SignaturePanel = ({
  type,
  labSignature,
  submitterSignature,
  onLabSignatureChanged,
  onSubmitterSignatureChanged,
  signatureCanvasRef,
}: SignaturePanelProps): JSX.Element => {
  const {t} = useTranslation();
  const [selectedTab, setSelectedTab] = useState(0);
  const {requiredSignatureCount, approvals} = signatureTypes[type];
  const {isApproved: isLabSignatureApproved} = labSignature ?? {};
  const {isApproved: isSubmitterSignatureApproved} = submitterSignature ?? {};
  const currentSignatureCount = approvals(isLabSignatureApproved, isSubmitterSignatureApproved).filter(Boolean).length;
  const onSubmitterChangedWrapper = (signature: Signature, signatureChangeType: SignatureChangeType): void => {
    onSubmitterSignatureChanged!(signature);
    if (signatureChangeType === SignatureChangeType.Approve) {
      setSelectedTab(1);
    }
  };

  return (
    <SignaturePanelStyled>
      <Typography variant="largeMedium">
        {t('evidence.receive.signature.count', {
          currentCount: currentSignatureCount,
          totalCount: requiredSignatureCount,
        })}
      </Typography>
      <MTabsStyled
        value={selectedTab}
        size="medium"
        onChange={(_, value) => setSelectedTab(value)}
        tabs={[
          ...(type == 'transaction'
            ? [
                {
                  content: (
                    <SignaturePanelTab
                      signatureCanvasRef={signatureCanvasRef}
                      signature={submitterSignature}
                      onSignatureChange={onSubmitterChangedWrapper}
                    />
                  ),
                  icon: isSubmitterSignatureApproved ? <CheckedIcon data-testid="checked-icon" /> : <></>,
                  title: t('evidence.receive.signature.type.submitter'),
                },
              ]
            : []),
          {
            content: (
              <SignaturePanelTab
                signatureCanvasRef={signatureCanvasRef}
                signature={labSignature}
                onSignatureChange={onLabSignatureChanged}
              />
            ),
            icon: isLabSignatureApproved ? <CheckedIcon data-testid="checked-icon" /> : <></>,
            title: t('evidence.receive.signature.type.lab'),
          },
        ]}
      />
    </SignaturePanelStyled>
  );
};

export default SignaturePanel;
