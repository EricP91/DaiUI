import {Autocomplete} from '@mui/material';
import {MCheckbox, MInput} from '@cellebrite/design-system';
import {ChipStyled} from 'pages/components/ChipStyled';

export interface Option {
  title: string;
  value: string;
}

export interface AutoCompleteProps {
  options: Option[];
  label?: string;
  placeholder?: string;
  list?: boolean;
  [key: string]: unknown;
  value?: Option[];
}

export default function AutoCompleteMultiSelect(props: AutoCompleteProps): JSX.Element {
  const {value, options, list, label = 'AutoComplete', placeholder = 'Selection', ...otherProps} = props;

  return (
    <Autocomplete<Option, true, false, true>
      multiple
      options={options}
      size="small"
      disableCloseOnSelect
      value={value}
      isOptionEqualToValue={(option, selected) => option.value === selected.value}
      getOptionLabel={(option) => option.title}
      renderOption={(renderOptionProps, option, {selected}) => (
        <li {...renderOptionProps}>
          {!list && <MCheckbox style={{marginRight: 8}} checked={selected} key={option.title + option.value} />}
          {option.title}
        </li>
      )}
      renderInput={(params) => <MInput {...params} label={label} placeholder={placeholder} />}
      renderTags={(tagValue, getTagProps) => {
        return tagValue.map((option, index) => (
          <ChipStyled {...getTagProps({index})} label={option.title} color="primary" variant="filled" size="small" />
        ));
      }}
      {...otherProps}
    />
  );
}
