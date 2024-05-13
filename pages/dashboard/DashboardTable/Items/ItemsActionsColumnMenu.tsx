import React, {useCallback, useRef, useState} from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useTranslation} from 'react-i18next';
import {Box, MenuItem, styled} from '@mui/material';
import {Menu} from '@cellebrite/design-system';

const MoreVertIconStyled = styled(MoreVertIcon)(({theme}) => ({
  color: theme.palette.text.secondary,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.ui.brandLightest,
    borderRadius: '50%',
  },
}));

const IconWrapper = styled(Box)(() => ({
  height: 24,
}));

function ItemsActionsColumnMenu(): JSX.Element {
  const ref = useRef(null);
  const {t} = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = useCallback((): void => {
    setAnchorEl(null);
  }, []);

  return (
    <>
      <IconWrapper ref={ref} onClick={handleClick}>
        <MoreVertIconStyled data-testid="menu-icon" />
      </IconWrapper>
      <Menu sx={{m: 1}} data-testid="actions-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>{t('common.move')}</MenuItem>
        <MenuItem onClick={handleClose}>{t('common.checkout')}</MenuItem>
        <MenuItem onClick={handleClose}>{t('dashboard.table.items.menu.chainOfCustody')}</MenuItem>
        <MenuItem onClick={handleClose}>{t('dashboard.table.items.menu.caseReport')}</MenuItem>
      </Menu>
    </>
  );
}

export default ItemsActionsColumnMenu;
