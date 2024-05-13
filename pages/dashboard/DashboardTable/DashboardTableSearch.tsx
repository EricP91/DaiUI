import {SearchIcon} from '@cellebrite/design-system';
import {TextField, InputAdornment} from '@mui/material';
import {useEffect, useState} from 'react';

import {useTranslation} from 'react-i18next';
import {useDebounce} from 'usehooks-ts';

export interface DashboardTableSearchProps {
  onSearch: (searchQuery: string) => void;
  searchQuery?: string;
}

const DashboardTableSearch = ({onSearch, searchQuery = ''}: DashboardTableSearchProps): JSX.Element => {
  const {t} = useTranslation();
  const [searchValue, setSearchValue] = useState(searchQuery);
  const debouncedValue = useDebounce(searchValue, 300);

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  const onChangeSearchQuery = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    const currentSearchQuery = evt.target.value;
    setSearchValue(currentSearchQuery);
  };

  return (
    <TextField
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      fullWidth
      type="search"
      label=""
      placeholder={t('dashboard.table.searchPlaceholder')}
      variant="outlined"
      size="small"
      margin="normal"
      value={searchValue}
      onChange={onChangeSearchQuery}
    />
  );
};

export default DashboardTableSearch;
