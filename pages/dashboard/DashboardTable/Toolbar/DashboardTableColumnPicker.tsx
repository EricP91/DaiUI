import {ColumnIcon, CustomizationMenu} from '@cellebrite/design-system';
import {GridColumns} from '@mui/x-data-grid-pro';
import capitalize from 'lodash-es/capitalize';
import {useTranslation} from 'react-i18next';

export interface DashboardTableColumnSelectorProps {
  columns: GridColumns;
  onItemChange: (items: Record<string, boolean>) => void;
  initialSelection?: Record<string, boolean>;
}

const DashboardTableColumnPicker = ({
  columns,
  onItemChange,
  initialSelection,
}: DashboardTableColumnSelectorProps): JSX.Element => {
  const {t} = useTranslation();

  const items = columns
    .filter((x) => x.field !== 'actions')
    .map((column) => ({
      id: column.field || '',
      value: column.headerName?.replace(/(?:\\b|_)([a-z])/, capitalize) || '',
    }));

  return (
    <CustomizationMenu
      variant="outlined"
      items={items}
      initialSelection={initialSelection}
      onSelectionChange={onItemChange}
      buttonText={t('dashboard.table.columns')}
      buttonProps={{startIcon: <ColumnIcon />}}
    />
  );
};

export default DashboardTableColumnPicker;
