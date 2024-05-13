import { Box, Typography, styled } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { MButton, MAccordion } from '@cellebrite/design-system';

const InformationAccordion = styled(MAccordion)(({ theme }) => ({
  padding: theme.spacing(0.5),
  width: '100%',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.ui.light,
  boxShadow: '0px 0px 2px 0px rgba(145, 158, 171, 0.24), 0px 16px 32px -4px rgba(145, 158, 171, 0.24)',
}));

const InformationContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

const InformationContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: 344,
  marginTop: theme.spacing(2),
}));

const InfoItem = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

const InfoTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.ui.mutedDark,
}))

const InfoContent = styled(Typography)(({ theme }) => ({
  color: theme.palette.ui.brand,
}))

const InformationSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: theme.palette.ui.light,
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0px 0px 2px 0px rgba(145, 158, 171, 0.24), 0px 16px 32px -4px rgba(145, 158, 171, 0.24)',
}))

const ViewButton = styled(MButton)({
  padding: 0,
});

const GeneralInformation = (): JSX.Element => (
  <InformationContent gap={1}>
    <InfoItem>
      <InfoTitle variant="small">Case type</InfoTitle>
      <Typography variant="smallBold">Assult</Typography>
    </InfoItem>
    <InfoItem>
      <InfoTitle variant="small">Lab case ID</InfoTitle>
      <InfoContent variant="smallBold">PDE324-887</InfoContent>
    </InfoItem>
    <InfoItem>
      <InfoTitle variant="small">Submitting agency</InfoTitle>
      <Typography variant="smallBold">Guardian City PD</Typography>
    </InfoItem>
    <InfoItem>
      <InfoTitle variant="small">Incident/Case Number</InfoTitle>
      <Typography variant="smallBold">FV-IP-10-02-23-E2E</Typography>
    </InfoItem>
    <InfoItem>
      <InfoTitle variant="small">Offense date</InfoTitle>
      <Typography variant="smallBold">2023-10-02</Typography>
    </InfoItem>
  </InformationContent>
);

const AdditionalInformation = (): JSX.Element => (
  <InformationContent gap={1}>
    <InfoItem>
      <InfoTitle variant="small">Case type</InfoTitle>
      <Typography variant="smallBold">Assult</Typography>
    </InfoItem>
    <InfoItem>
      <InfoTitle variant="small">Offense date</InfoTitle>
      <Typography variant="smallBold">2023-10-02</Typography>
    </InfoItem>
  </InformationContent>
);

const AssignmentInfoSection = (): JSX.Element => {
  return (
    <InformationContainer display="flex" flexDirection="column" gap={3}>
      <InformationAccordion
        expandIcon={<ExpandMoreIcon />}
        header={<Typography variant="subtitle1">General Information</Typography>}
      >
        <GeneralInformation />
      </InformationAccordion>
      <InformationAccordion
        expandIcon={<ExpandMoreIcon />}
        header={<Typography variant="subtitle1">Additional Information</Typography>}
      >
        <AdditionalInformation />
      </InformationAccordion>
      <InformationSection>
        <Typography variant="subtitle1">History</Typography>
        <ViewButton variant="text">View All</ViewButton>
      </InformationSection>
      <InformationSection>
        <Typography variant="subtitle1">Case Notes (18)</Typography>
        <ViewButton variant="text">View All</ViewButton>
      </InformationSection>
    </InformationContainer>
  );
};
export default AssignmentInfoSection;