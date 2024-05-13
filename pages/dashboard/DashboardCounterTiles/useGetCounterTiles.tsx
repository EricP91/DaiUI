import {t} from 'i18next';
import {Key, ReactNode} from 'react';
import {useAssignmentTableStore, useItemsTableStore} from 'store/dashboard/table.store.ts/table.store';
import {useDashboardTabsStore} from 'store/dashboard/table.store.ts/tabs.store';
import {useDashboardTileStore} from 'store/dashboard/table.store.ts/tiles.store';
import {PrimaryTabs, ItemTabs, AssignmentTabs} from 'types/dashboard/tabs';
import {DashboardTileType} from 'types/dashboard/tiles';
import {ItemSection, AssignmentSection} from 'types/search-request';
import {useShallow} from 'zustand/react/shallow';
import DashboardCounterTileIcon from './DashboardCounterTileIcons';
import {DashboardOverview} from 'types/dashboard/overview';

interface CounterTileProps {
  key: Key;
  icon: ReactNode;
  color: 'info' | 'success' | 'warning' | 'error';
  header?: string | JSX.Element;
  count?: number;
  dataTestId: string;
  onClick?: () => void;
  active: boolean;
}

export const useGetCounterTiles = ({data}: {data?: DashboardOverview}): CounterTileProps[] => {
  const {
    filter,
    setFilter,
    setPageSectionMapping: setAssignmentPageSectionMapping,
    pageSectionMapping: assignmentPageSectionMapping,
  } = useAssignmentTableStore(
    useShallow((state) => {
      return {
        filter: state.filter,
        setFilter: state.setFilter,
        setPageSectionMapping: state.setPageSectionMapping,
        pageSectionMapping: state.pageSectionMapping,
      };
    }),
  );
  const {setPageSectionMapping: setItemsPageSectionMapping, pageSectionMapping: itemsPageSectionMapping} =
    useItemsTableStore(
      useShallow((state) => {
        return {
          setPageSectionMapping: state.setPageSectionMapping,
          pageSectionMapping: state.pageSectionMapping,
        };
      }),
    );
  const {setPrimaryActiveTab, setItemsActiveTab, setAssignmentsActiveTab} = useDashboardTabsStore(
    useShallow((state) => {
      return {
        setPrimaryActiveTab: state.setPrimaryActiveTab,
        setItemsActiveTab: state.setItemsActiveTab,
        setAssignmentsActiveTab: state.setAssignmentsActiveTab,
      };
    }),
  );

  const {setActiveTile, activeTile} = useDashboardTileStore();
  const {itemsInMyCustody, unclaimedAssignments, activeAssignments, reviewRequired} = data?.userOverview ?? {};

  const counterTiles: CounterTileProps[] = [
    {
      key: DashboardTileType.MyCustody,
      dataTestId: `${DashboardTileType.MyCustody}-tile`,
      icon: <DashboardCounterTileIcon data-testid="items-icon" color="error" />,
      color: 'error',
      active: activeTile === DashboardTileType.MyCustody,
      header: t('dashboard.tiles.itemsInMyCustody'),
      count: itemsInMyCustody,
      onClick: () => {
        setActiveTile(DashboardTileType.MyCustody);
        setPrimaryActiveTab(PrimaryTabs.Items);
        setItemsActiveTab(ItemTabs.MyCustody);
        setFilter(undefined);
        setItemsPageSectionMapping({...itemsPageSectionMapping, [ItemSection.MyCustody]: 0});
      },
    },
    {
      key: DashboardTileType.Unclaimed,
      dataTestId: `${DashboardTileType.Unclaimed}-tile`,
      icon: <DashboardCounterTileIcon data-testid="unclaimed-assignments-icon" color="warning" />,
      color: 'warning',
      header: t('dashboard.tiles.unclaimedAssignments'),
      count: unclaimedAssignments,
      active: activeTile === DashboardTileType.Unclaimed,
      onClick: () => {
        setActiveTile(DashboardTileType.Unclaimed);
        setFilter(DashboardTileType.Unclaimed);
        setPrimaryActiveTab(PrimaryTabs.Assignments);
        setAssignmentsActiveTab(AssignmentTabs.AllAssignments);
        setAssignmentPageSectionMapping({...assignmentPageSectionMapping, [AssignmentSection.AllAssignments]: 0});
      },
    },
    {
      key: DashboardTileType.MyActive,
      dataTestId: `${DashboardTileType.MyActive}-tile`,
      icon: <DashboardCounterTileIcon data-testid="active-assignments-icon" color="success" />,
      color: 'success',
      header: t('dashboard.tiles.myActiveAssignments'),
      active: filter === DashboardTileType.MyActive,
      count: activeAssignments,
      onClick: () => {
        setActiveTile(DashboardTileType.MyActive);
        setFilter(DashboardTileType.MyActive);
        setPrimaryActiveTab(PrimaryTabs.Assignments);
        setAssignmentsActiveTab(AssignmentTabs.ActiveAssignments);
        setAssignmentPageSectionMapping({...assignmentPageSectionMapping, [AssignmentSection.ActiveAssignments]: 0});
      },
    },
    {
      key: DashboardTileType.PendingReview,
      dataTestId: `${DashboardTileType.PendingReview}-tile`,
      icon: <DashboardCounterTileIcon data-testid="review-required-icon" color="info" />,
      color: 'info',
      active: filter === DashboardTileType.PendingReview,
      header: t('dashboard.tiles.reviewRequired'),
      count: reviewRequired,
      onClick: () => {
        setActiveTile(DashboardTileType.PendingReview);
        setFilter(DashboardTileType.PendingReview);
        setPrimaryActiveTab(PrimaryTabs.Assignments);
        setAssignmentsActiveTab(AssignmentTabs.ReviewRequired);
        setAssignmentPageSectionMapping({...assignmentPageSectionMapping, [AssignmentSection.ReviewRequired]: 0});
      },
    },
  ];

  return counterTiles;
};
