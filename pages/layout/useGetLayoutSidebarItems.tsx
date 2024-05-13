import {
  DashboardIcon,
  CaseIcon,
  AddItemIcon,
  CampaignIcon,
  MoveIcon,
  CheckoutIcon,
  UndoIcon,
  ReceiveIcon,
  PendingSubmissionIcon,
  ScanIcon,
  ReportFileIcon,
  AuditIcon,
  RestartIcon,
  SessionBeginIcon,
  WatchlistIcon,
  AdminIcon,
} from '@cellebrite/design-system';
import {ReactNode} from 'react';

import {useTranslation} from 'react-i18next';
import {pageRoutes} from 'utils/routes/page-routes';

interface SidebarItem {
  title: string;
  link?: string;
  icon: ReactNode;
}

interface UseGetLayoutSidebarItemsResult extends SidebarItem {
  subItems?: SidebarItem[];
}

export const useGetLayoutSidebarItems = (): UseGetLayoutSidebarItemsResult[] => {
  const {t} = useTranslation();

  return [
    {title: t('navbar.dashboard'), link: pageRoutes.dashboard, icon: <DashboardIcon />},
    {
      title: t('navbar.evidenceManagement.root'),
      link: pageRoutes.evidenceManagement.root,
      icon: <CaseIcon />,
      subItems: [
        {
          title: t('navbar.evidenceManagement.addItem'),
          link: pageRoutes.evidenceManagement.addItem,
          icon: <AddItemIcon />,
        },
        {
          title: t('navbar.evidenceManagement.bulkUpdate'),
          link: pageRoutes.evidenceManagement.bulkUpdate,
          icon: <CampaignIcon />,
        },
        {
          title: t('common.move'),
          link: pageRoutes.evidenceManagement.move,
          icon: <MoveIcon />,
        },
        {
          title: t('common.checkout'),
          link: pageRoutes.evidenceManagement.checkout,
          icon: <CheckoutIcon />,
        },
        {
          title: t('navbar.evidenceManagement.undoCheckout'),
          link: pageRoutes.evidenceManagement.undoCheckout,
          icon: <UndoIcon />,
        },
      ],
    },
    {
      title: t('navbar.receiveSubmission'),
      icon: <ReceiveIcon />,
      subItems: [
        {
          title: t('common.viewPendingAndReceive'),
          link: pageRoutes.receiveSubmission.viewPendingAndReceive,
          icon: <PendingSubmissionIcon />,
        },
        {
          title: t('common.scanEvidence'),
          link: pageRoutes.receiveSubmission.scanEvidence,
          icon: <ScanIcon />,
        },
      ],
    },
    {
      title: t('navbar.reports'),
      link: pageRoutes.reports,
      icon: <ReportFileIcon />,
    },
    {
      title: t('navbar.audit.root'),
      icon: <AuditIcon />,
      subItems: [
        {
          title: t('navbar.audit.groupPermissions'),
          link: pageRoutes.audit.groupPermissions,
          icon: <RestartIcon />,
        },
        {title: t('navbar.audit.startNew'), link: pageRoutes.audit.startNew, icon: <SessionBeginIcon />},
        {title: t('navbar.audit.viewExisting'), link: pageRoutes.audit.viewExisting, icon: <WatchlistIcon />},
      ],
    },
    {
      title: t('navbar.admin'),
      link: pageRoutes.admin,
      icon: <AdminIcon />,
    },
  ];
};
