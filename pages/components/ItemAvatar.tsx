import {ItemIcon} from '@cellebrite/design-system';
import {Avatar, ListItemAvatar} from '@mui/material';
import {styled, useTheme} from '@mui/system';

const AvatarStyled = styled(Avatar)(({theme}) => ({
  backgroundColor: theme.palette.ui.brandLight,
}));

export const ItemAvatar = (): JSX.Element => {
  const theme = useTheme();
  return (
    <ListItemAvatar>
      <AvatarStyled>
        <ItemIcon fill={theme.palette.ui.brand} />
      </AvatarStyled>
    </ListItemAvatar>
  );
};
