import {MButton} from '@cellebrite/design-system';
import {Box, Divider, Stack, Typography, styled, useTheme} from '@mui/material';
import {createRef, useEffect, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import SignatureCanvas from 'react-signature-canvas';
import {Signature, SignatureChangeEvent, SignatureChangeType} from 'types/receive';

const SignaturePanelSignAreaStyled = styled(Box)(({theme}) => ({
  backgroundColor: theme.palette.ui.light,
  border: `1px solid ${theme.palette.ui.mutedLight}`,
  borderRadius: theme.spacing(1),

  '& .MuiButton-root': {
    height: 32,
  },
}));

interface SignaturePanelSignAreaProps {
  signature?: Signature;
  onSignatureChange?: SignatureChangeEvent;
  signatureCanvasRef?: React.RefObject<SignatureCanvas>;
}

const SignaturePanelSignArea = ({
  onSignatureChange = () => {},
  signature,
  signatureCanvasRef = createRef(),
}: SignaturePanelSignAreaProps): JSX.Element => {
  const {dataUrl, isApproved} = signature ?? {};
  const theme = useTheme();
  const {t} = useTranslation();
  const ref = useRef<HTMLElement>();

  useEffect(() => {
    const canvas = signatureCanvasRef.current?.getCanvas();
    if (canvas) {
      canvas.style.width = '100%';
      canvas.width = canvas.offsetWidth;
    }
  }, [signatureCanvasRef]);

  useEffect(() => {
    signatureCanvasRef?.current?.fromDataURL(dataUrl || '');
  }, [dataUrl, signatureCanvasRef]);

  useEffect(() => {
    if (isApproved) {
      signatureCanvasRef?.current?.off();
      return;
    }
    signatureCanvasRef?.current?.on();
  }, [isApproved, signatureCanvasRef]);

  return (
    <Box ref={ref}>
      <Typography display="block" variant="text">
        {t('evidence.receive.signature.title')}
      </Typography>
      <SignaturePanelSignAreaStyled>
        <SignatureCanvas
          onEnd={() =>
            onSignatureChange(
              {...signature, dataUrl: signatureCanvasRef?.current?.toDataURL()},
              SignatureChangeType.Sign,
            )
          }
          ref={signatureCanvasRef}
          canvasProps={{height: 95}}
        />
        <Divider sx={{mr: 2, ml: 2}} />
        <Stack sx={{p: 2}} flexDirection="row" justifyContent="space-between">
          <MButton
            disabled={!dataUrl}
            onClick={() => {
              onSignatureChange(
                {...signature, dataUrl: undefined, isApproved: false, name: ''},
                SignatureChangeType.Clear,
              );
              signatureCanvasRef?.current?.clear();
            }}
            variant="text"
          >
            {t('common.clear')}
          </MButton>
          {isApproved ? (
            <Typography sx={{alignSelf: 'center'}} color={theme.palette.ui.positive} variant="textMedium">
              {t('evidence.receive.signature.accepted')}
            </Typography>
          ) : (
            <MButton
              disabled={!dataUrl}
              onClick={() => onSignatureChange({...signature, isApproved: true}, SignatureChangeType.Approve)}
              variant="outlined"
            >
              {t('evidence.receive.signature.accept')}
            </MButton>
          )}
        </Stack>
      </SignaturePanelSignAreaStyled>
    </Box>
  );
};

export default SignaturePanelSignArea;
