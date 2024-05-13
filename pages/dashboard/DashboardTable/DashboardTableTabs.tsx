import {MFolderTabs, MTabs, ActiveAssignmentsIcon, PendingReviewIcon, ItemIcon} from '@cellebrite/design-system';
import {AllAssignmentsIcon} from 'assets/AllAssignmentsIcon';
import {AllMyAssignmentsIcon} from 'assets/AllMyAssignmentsIcon';
import {MyCustodyIcon} from 'assets/MyCustodyIcon';
import {useTranslation} from 'react-i18next';
import {useGetDashboardOverview} from 'api/dashboard';
import {AssignmentSection, ItemSection} from 'types/search-request';
import {DashboardAssignmentsTable} from './Assignments/DashboardAssignmentsTable';
import {DashboardItemsTable} from './Items/DashboardItemsTable';
import {useDashboardTabsStore} from 'store/dashboard/table.store.ts/tabs.store';
import {useAssignmentTableStore} from 'store/dashboard/table.store.ts/table.store';
import {useDashboardTileStore} from 'store/dashboard/table.store.ts/tiles.store';

const DashboardTableTabs = (): JSX.Element => {
  const {t} = useTranslation();
  const {data} = useGetDashboardOverview();
  const {
    primaryActiveTab,
    setPrimaryActiveTab,
    assignmentsActiveTab,
    setAssignmentsActiveTab,
    itemsActiveTab,
    setItemsActiveTab,
  } = useDashboardTabsStore();
  const setFilter = useAssignmentTableStore((state) => state.setFilter);
  const setActiveTile = useDashboardTileStore((state) => state.setActiveTile);
  const {items, assignments} = data?.countUserData ?? {items: {}, assignments: {}};
  const getCountKey = (count?: number): object => ({count: `${count || 0}`});
  const changeAssignmentTab = (value: number): void => {
    setActiveTile(undefined);
    setFilter(undefined);
    setAssignmentsActiveTab(value);
  };

  const changePrimaryTab = (value: number): void => {
    setActiveTile(undefined);
    setFilter(undefined);
    setAssignmentsActiveTab(value);
    setPrimaryActiveTab(value);
  };

  const changeItemsTab = (value: number): void => {
    setActiveTile(undefined);
    setFilter(undefined);
    setItemsActiveTab(value);
  };

  return (
    <MFolderTabs
      value={primaryActiveTab}
      onChange={(_, value) => changePrimaryTab(value)}
      tabs={[
        {
          title: t('dashboard.tabs.primary.myAssignments'),
          icon: null,
          content: (
            <MTabs
              value={assignmentsActiveTab}
              onChange={(_, value) => changeAssignmentTab(value)}
              size="medium"
              tabs={[
                {
                  title: t('dashboard.tabs.secondary.allMyAssignments', getCountKey(assignments.allMyAssignments)),
                  content: <DashboardAssignmentsTable activeSection={AssignmentSection.MyAssignments} />,
                  icon: <AllMyAssignmentsIcon />,
                },
                {
                  title: t(
                    'dashboard.tabs.secondary.allAssignmentsMySections',
                    getCountKey(assignments.allAssignments),
                  ),
                  content: <DashboardAssignmentsTable activeSection={AssignmentSection.AllAssignments} />,
                  icon: <AllAssignmentsIcon />,
                },
                {
                  title: t('dashboard.tabs.secondary.activeAssignments', getCountKey(assignments.activeAssignments)),
                  content: <DashboardAssignmentsTable activeSection={AssignmentSection.ActiveAssignments} />,
                  icon: <ActiveAssignmentsIcon />,
                },
                {
                  title: t('dashboard.tabs.secondary.reviewRequired', getCountKey(assignments.reviewRequired)),
                  content: <DashboardAssignmentsTable activeSection={AssignmentSection.ReviewRequired} />,
                  icon: <PendingReviewIcon />,
                },
                {
                  title: t('dashboard.tabs.secondary.allAssignmentsAllSections', getCountKey(assignments.total)),
                  content: <DashboardAssignmentsTable activeSection={AssignmentSection.AllSections} />,
                  icon: <AllAssignmentsIcon />,
                },
              ]}
            ></MTabs>
          ),
        },
        {
          title: t('dashboard.tabs.primary.items'),
          icon: null,
          content: (
            <MTabs
              value={itemsActiveTab}
              onChange={(_, value) => changeItemsTab(value)}
              size="medium"
              tabs={[
                {
                  title: t('dashboard.tabs.secondary.myCustody', getCountKey(items.myCustody)),
                  icon: <MyCustodyIcon />,
                  content: <DashboardItemsTable activeSection={ItemSection.MyCustody} />,
                },
                {
                  title: t('dashboard.tabs.secondary.allItems', getCountKey(items.total)),
                  content: <DashboardItemsTable activeSection={ItemSection.AllItems} />,
                  icon: <ItemIcon />,
                },
              ]}
            ></MTabs>
          ),
        },
      ]}
    />
  );
};

export default DashboardTableTabs;
