import {Box, Typography} from '@mui/material';
import {Signature} from 'types/receive';

const SignatureCard = ({title, signature}: {title: string; signature?: Signature}): JSX.Element => {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', paddingX: 2}}>
      <Typography color={'#637381'} fontSize={14} sx={{fontWeight: 500}}>
        {title}
      </Typography>
      <Typography color={'black'} fontSize={16} sx={{fontWeight: 400}}>
        {signature?.name}
      </Typography>
      <img src={signature?.dataUrl} alt="signature" style={{flex: 1}} />
    </Box>
  );
};

export default SignatureCard;
