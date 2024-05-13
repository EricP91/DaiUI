import {MBreadcrums} from '@cellebrite/design-system';
import {Box} from '@mui/material';
import {useGetLayoutSidebarItems} from 'pages/layout/useGetLayoutSidebarItems';
import {ReactElement, ReactNode} from 'react';
import {useTranslation} from 'react-i18next';
import {useHistory} from 'react-router-dom';

const AssignmentBreadcrumbs = (): ReactNode => {
  const history = useHistory();
  const {t} = useTranslation();
  const navigatedFrom = history.location?.state?.from;
  const sidebarItems = useGetLayoutSidebarItems();
  const searchParams = new URLSearchParams(history.location.search);
  const assignmentId = searchParams.get('assignmentId');
  const link = navigatedFrom ? sidebarItems.find((item) => item.link === navigatedFrom) : undefined;
  const assignmentTitle = assignmentId ? t('evidenceManagement.assignment.title', {id: assignmentId ?? ''}) : undefined;
  return (
    assignmentTitle && (
      <Box
        data-testid="assignment-breadcrumbs"
        sx={{display: 'flex', width: '100%', alignItems: 'center', p: 2, '.MuiBox-root': {fontWeight: 500}}}
      >
        <MBreadcrums
          links={[
            ...(link ? [{name: link?.title, href: link?.link || '', icon: link?.icon as ReactElement}] : []),
            {name: assignmentTitle, href: ''},
          ]}
        />
      </Box>
    )
  );
};

export default AssignmentBreadcrumbs;
