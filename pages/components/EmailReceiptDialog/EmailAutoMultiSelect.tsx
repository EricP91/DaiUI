import AutoCompleteMultiSelect, {Option} from 'pages/components/AutoCompleteMultiSelect';

const EmailAutoMultiSelect = ({
  emails,
  onChange,
}: {
  emails: string[];
  onChange: (emails: string[]) => void;
}): JSX.Element => {
  return (
    <>
      <AutoCompleteMultiSelect
        options={emails.map((item) => ({title: item, value: item}))}
        placeholder=""
        label="Email address"
        onChange={(_: Event, value: Option[]) => onChange(value.map((val) => val.value))}
        list
      />
    </>
  );
};

export default EmailAutoMultiSelect;
