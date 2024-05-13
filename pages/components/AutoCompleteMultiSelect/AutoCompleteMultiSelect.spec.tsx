import {render, screen} from 'test-utils';
import userEvent from '@testing-library/user-event';
import AutoCompleteMultiSelect, {Option} from './AutoCompleteMultiSelect';

const options: Option[] = [
  {title: 'Option 1', value: 'option1'},
  {title: 'Option 2', value: 'option2'},
  {title: 'Option 3', value: 'option3'},
];

describe('AutoCompleteMultiSelect', () => {
  it('should renders without errors', () => {
    render(<AutoCompleteMultiSelect options={options} />);
    expect(screen.getByLabelText('AutoComplete')).toBeInTheDocument();
  });

  it('should displays options correctly', async () => {
    render(<AutoCompleteMultiSelect options={options} />);
    await userEvent.click(screen.getByLabelText('AutoComplete'));
    options.forEach((option) => {
      expect(screen.getByText(option.title)).toBeInTheDocument();
    });
  });
});
