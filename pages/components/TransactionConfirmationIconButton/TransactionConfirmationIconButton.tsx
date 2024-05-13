import {MButton, CheckedIcon} from '@cellebrite/design-system';

const TransactionConfirmationIconButton = ({
  showIcon,
  text,
  onClick,
}: {
  showIcon: boolean;
  text: string;
  onClick: () => void;
}): JSX.Element => {
  return (
    <MButton variant="outlined" onClick={onClick}>
      {showIcon && <CheckedIcon sx={{marginRight: '4px'}} />} {text}
    </MButton>
  );
};

export default TransactionConfirmationIconButton;
