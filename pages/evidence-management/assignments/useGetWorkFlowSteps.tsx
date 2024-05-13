import React from 'react';
import { MenuItem } from '@mui/material';
import { MenuButton, StepType } from '@cellebrite/design-system';
import { useTranslation } from 'react-i18next';

export const useGetWorkFlowSteps = (): StepType[] => {
  const { t } = useTranslation();
  return [
    {
      title: 'Analyst',
      subtitle: (
      <MenuButton
        ref={{
          current: '[Circular]'
        }}
        buttonText="Menu"
        variant="contained"
      >
        <React.Fragment key=".0">
          <MenuItem
            disableRipple
            onClick={function noRefCheck() { }}
          >
            Menu Item 1
          </MenuItem>
          <MenuItem
            disableRipple
            onClick={function noRefCheck() { }}
          >
            Menu Item 2
          </MenuItem>
        </React.Fragment>
      </MenuButton>
      ),
      icon: <></>,
    },
    {
      title: 'Technical Reviewer',
      subtitle: (
      <MenuButton
        ref={{
          current: '[Circular]'
        }}
        buttonText="Menu"
        variant="contained"
      >
        <React.Fragment key=".0">
          <MenuItem
            disableRipple
            onClick={function noRefCheck() { }}
          >
            Menu Item 1
          </MenuItem>
          <MenuItem
            disableRipple
            onClick={function noRefCheck() { }}
          >
            Menu Item 2
          </MenuItem>
        </React.Fragment>
      </MenuButton>
      ),
      icon: <></>,
    }
  ];
};
