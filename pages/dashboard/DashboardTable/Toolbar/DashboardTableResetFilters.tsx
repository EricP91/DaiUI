import {MButton, RestartIcon} from '@cellebrite/design-system';
import {useTranslation} from 'react-i18next';
import {useAssignmentTableStore} from 'store/dashboard/table.store.ts/table.store';

import {useDashboardTileStore} from 'store/dashboard/table.store.ts/tiles.store';

const DashboardTableResetFilters = (): JSX.Element => {
  const setFilter = useAssignmentTableStore((state) => state.setFilter);
  const setActiveTile = useDashboardTileStore((state) => state.setActiveTile);
  const {t} = useTranslation();

  const onClick = (): void => {
    setFilter(undefined);
    setActiveTile(undefined);
  };

  return (
    <MButton sx={{marginLeft: 'auto'}} startIcon={<RestartIcon />} onClick={onClick} variant="outlined">
      {t('dashboard.table.resetFilters')}
    </MButton>
  );
};

export default DashboardTableResetFilters;
