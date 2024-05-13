import { Box, styled } from '@mui/material';
import AssignmentInfoSection from './AssignmentInfoSection';
import AssignmentTabs from './AssignmentTabs';
import AssignmentWorkFlow from './AssignmentWorkFlow';

const AssignmentContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  backgroundColor: theme.palette.ui.mutedSoft,
  width: '100%',
  height: 'calc(100vh - 256px)',
}));

const AssignmentContent = (): JSX.Element => {
  return (
    <AssignmentContainer gap={3}>
      <AssignmentWorkFlow />
      <AssignmentTabs />
      <AssignmentInfoSection />
    </AssignmentContainer>
  );
};
export default AssignmentContent;