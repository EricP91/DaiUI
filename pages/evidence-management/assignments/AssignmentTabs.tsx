import { Box, Autocomplete, Link, IconButton, styled, useTheme } from '@mui/material';
import { MTabs, MInput, CaseIcon, ReportFileIcon } from "@cellebrite/design-system";
import { MoneyIcon } from "assets/MoneyIcon";
import { Assignment as AssignmentIcon, Add as AddIcon } from "@mui/icons-material";
import { useTranslation, Trans } from 'react-i18next';

const ItemAutoSingleSelect = styled(Autocomplete)(({ theme }) => ({
  maxHeight: '224px',
  '& .MuiInputBase-root': {
    height: '40px',
    fontSize: '16px',
    lineHeight: '24px',
    '& input': {
      height: '24px',
    },
  },
  '& .MuiInputLabel-root': {
    top: '-8px',
  },
  '& .MuiAutocomplete-listbox': {
    maxHeight: '224px', // Adjust the max height of the dropdown list if needed
    overflowY: 'auto',
    height: '224x',
    backgroundColor: 'red',
  },
  '& .MuiAutocomplete-popperDisablePortal': {
    maxHeight: '224px', // Adjust the max height of the dropdown list if needed
    overflowY: 'auto',
    height: '224x',
    backgroundColor: 'red',
  },
  '& .MuiOutlinedInput-root': {
    padding: theme.spacing(0, 1),
  },
}));

const AssignmentTabsContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.ui.light,
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0px 0px 4px 0px rgba(145, 158, 171, 0.24), 0px 24px 48px 0px rgba(145, 158, 171, 0.24)',
  justifyContent: 'center',
  alignItems: 'center',
  margin: theme.spacing(2),
  marginBottom: '34px',
  padding: theme.spacing(3),
  width: 1024,
}));

const TabContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

const AssignmentItemsTab = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <TabContainer gap={2}>
      <Box display='flex' flexDirection='row' alignItems='center' gap={1}>
        <Box sx={{ marginTop: 2, display: 'flex', gap: 1 }}>
          <Trans
            values={{
              lookup: t('evidence.receive.step4.lookupLink'),
            }}
            i18nKey="evidence.receive.step4.additionalItem"
            components={{
              Link: (
                <Link
                  href="#"
                  color={theme.palette.ui.brand}
                  variant="text"
                  underline="none"
                ></Link>
              ),
            }}
          />
        </Box>
        <Box sx={{ marginTop: 2, display: 'flex', gap: 1 }}>
          <ItemAutoSingleSelect
            disablePortal
            sx={{ width: '240px' }}
            options={[]}
            data-testid="item-id-selector"
            renderInput={(params) => <MInput {...params} label={'Type Item ID...'} placeholder={'Type Item ID...'} />}
          />
          <IconButton
            aria-label="add-item"
          >
            <AddIcon />
          </IconButton>
        </Box>
      </Box>
    </TabContainer>
  )
}

const AssignmentTabs = (): JSX.Element => {
  return (
    <AssignmentTabsContainer>
      <MTabs
        size="medium"
        tabs={[
          {
            title: 'Assignment Items (3)',
            content: <AssignmentItemsTab />,
            icon: <AssignmentIcon />,
          },
          {
            title: "Attachments/Deliverables (5)",
            content: <></>,
            icon: <CaseIcon />,
          },
          {
            title: "Lab Report",
            content: <></>,
            icon: <ReportFileIcon />,
          },
          {
            title: "Lab Fees",
            content: <></>,
            icon: <MoneyIcon />,
          },
        ]}
      ></MTabs>
    </AssignmentTabsContainer>
  )
}

export default AssignmentTabs;