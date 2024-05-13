import {ExportIcon, MenuButton, downloadFile} from '@cellebrite/design-system';
import {MenuItem} from '@mui/material';
import {useGenerateReport} from 'api/dashboard';
import {useEffect, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {REPORT_FORMAT_TYPES, ReportFormat, ReportType} from 'types/report';
import {AssignmentSearchRequest, ItemsSearchRequest} from 'types/search-request';

interface DashboardTableExportMenuButtonProps {
  reportParams: AssignmentSearchRequest & ItemsSearchRequest;
  reportType: ReportType;
}

const DashboardTableExportMenuButton = ({
  reportParams,
  reportType,
}: DashboardTableExportMenuButtonProps): JSX.Element => {
  const {mutate, data} = useGenerateReport(reportType);
  const menuRef = useRef<{handleClose: () => void}>();
  const onMenuItemClick = (reportFormat: ReportFormat): void => {
    mutate({params: {params: {...reportParams}, reportFormat}});
    menuRef.current?.handleClose();
  };
  const {t} = useTranslation();

  useEffect(() => {
    if (data?.url) {
      downloadFile(data.url);
    }
  }, [data?.url]);

  return (
    <MenuButton
      ref={menuRef}
      buttonProps={{startIcon: <ExportIcon />}}
      variant="outlined"
      buttonText={t('dashboard.table.export')}
    >
      {REPORT_FORMAT_TYPES.map((type) => (
        <MenuItem sx={{textTransform: 'uppercase'}} onClick={() => onMenuItemClick(type)} key={type} disableRipple>
          {t(type)}
        </MenuItem>
      ))}
    </MenuButton>
  );
};

export default DashboardTableExportMenuButton;
