import { Box, styled } from '@mui/material';

const WorkFlowContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.ui.light,
  height: '100%',
  padding: theme.spacing(3),
  width: 384,
}));

const AssignmentWorkFlow = (): JSX.Element => {
  return (
     <WorkFlowContainer>

     </WorkFlowContainer>
  )
} 

export default AssignmentWorkFlow;