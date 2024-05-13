import DashboardHeader from './DashboardHeader/DashboardHeader';
import DashboardCounterTiles from './DashboardCounterTiles/DashboardCounterTiles';
import {styled} from '@mui/material';
import DashboardTableTabs from './DashboardTable/DashboardTableTabs';

const DashboardMainContainer = styled('div')(({theme}) => ({
  padding: theme.spacing(3),
}));

const DashboardMain = (): JSX.Element => {
  return (
    <>
      <DashboardMainContainer>
        <DashboardHeader />
        <DashboardCounterTiles />
        <DashboardTableTabs />
      </DashboardMainContainer>
    </>
  );
};

export default DashboardMain;
