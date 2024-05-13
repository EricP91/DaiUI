import {SearchIcon} from '@cellebrite/design-system';
import {InputAdornment} from '@mui/material';
import {GridToolbarContainer, GridToolbarQuickFilter} from '@mui/x-data-grid-pro';

interface PendingReceiveTableToolbarProps {
  onSearch: (searchQuery: string) => void;
  searchQuery?: string;
  placeholder: string;
}

export const PendingReceiveTableToolbar = ({placeholder}: PendingReceiveTableToolbarProps): JSX.Element => (
  <GridToolbarContainer sx={{flexFlow: 'row', padding: 2, '& .MuiTextField-root': {m: 0, width: 300}, gap: 1}}>
    <GridToolbarQuickFilter
      placeholder={placeholder}
      variant="outlined"
      size="small"
      fullWidth
      margin="normal"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      type="search"
    />
  </GridToolbarContainer>
);
