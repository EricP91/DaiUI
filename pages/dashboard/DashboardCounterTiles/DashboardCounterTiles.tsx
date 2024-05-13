import {CounterTile, InlineSpinner} from '@cellebrite/design-system';
import {Typography} from '@mui/material';
import {styled} from '@mui/system';
import {ReactNode} from 'react';
import {useTranslation} from 'react-i18next';
import {useGetCounterTiles} from './useGetCounterTiles';
import {useGetDashboardOverview} from 'api/dashboard';

const DashboardCounterTilesStyled = styled('div')(({theme}) => ({
  margin: theme.spacing(0, 0, 10, 0),
  display: 'flex',
  '& > :last-child': {
    marginRight: 0,
  },
}));

const DashboardCounterTilesTitleStyled = styled(Typography)(({theme}) => ({
  margin: theme.spacing(3, 0, 2, 0),
  display: 'block',
}));

const CounterTileStyled = styled(CounterTile)<{count?: number | JSX.Element}>(({count}) => ({
  flex: '1 0 0',
  marginRight: 12,
  ...(count === 0
    ? {
        '&:hover': {
          backgroundColor: 'white',
        },
      }
    : {}),
}));

const DashboardCounterTiles = (): ReactNode => {
  const {t} = useTranslation();
  const {data, isLoading} = useGetDashboardOverview();
  const counterTiles = useGetCounterTiles({data});

  return (
    <>
      <DashboardCounterTilesTitleStyled variant="xLargeBold">
        {t('dashboard.myOverview')}
      </DashboardCounterTilesTitleStyled>
      <DashboardCounterTilesStyled>
        {counterTiles.map(({dataTestId, key, active, color, count, onClick, header, ...counterTileProps}) => (
          <CounterTileStyled
            key={key}
            active={isLoading ? false : active}
            color={isLoading || count === 0 ? 'info' : color}
            header={header}
            onClick={isLoading || count === 0 ? undefined : onClick}
            count={isLoading ? <InlineSpinner /> : count}
            data-testid={dataTestId}
            {...counterTileProps}
          />
        ))}
      </DashboardCounterTilesStyled>
    </>
  );
};

export default DashboardCounterTiles;
