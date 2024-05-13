import {ContactAvatar, EditIcon} from '@cellebrite/design-system';
import {Box, Stack, Typography, styled, useTheme} from '@mui/material';
import {AssignmentStatus} from 'pages/components/AssignmentStatus';
import {ChipStyled} from 'pages/components/ChipStyled';
import {useTranslation} from 'react-i18next';
import {useHistory} from 'react-router-dom';
import {Assignment} from 'types/assignment';
import {formatISO} from 'utils/format-date';

const AssignmentDetailsListStyled = styled(Box)(({theme}) => ({
  flexDirection: 'row',
  display: 'flex',

  '& > div': {
    borderRight: `2px solid ${theme.palette.ui.mutedDoubleHover}`,
    padding: theme.spacing(0, 3, 0, 3),
    '&:last-of-type': {
      borderRight: 'none',
    },
    '&:first-of-type': {
      paddingLeft: 0,
    },
  },
}));

const AssignmentDetails = (): JSX.Element => {
  const history = useHistory();
  const theme = useTheme();
  const {t} = useTranslation();
  const assignment: Assignment = history?.location?.state?.assignment ?? {};

  return (
    <Box sx={{p: 3, backgroundColor: theme.palette.ui.mutedSoft, borderBottom: `1px solid ${theme.palette.ui.mutedDark}`}}>
      <Typography component="p" variant="xLargeBold" sx={{mb: 2}}>
        {t('evidenceManagement.assignment.title', {id: assignment.id ?? ''})}
      </Typography>
      <AssignmentDetailsListStyled>
        <Stack>
          <Typography color={theme.palette.ui.mutedDark} variant="smallMedium">
            {t('evidenceManagement.assignment.status')}
          </Typography>
          <AssignmentStatus size="narrow" status={assignment.status} />
        </Stack>
        <Stack>
          <Typography color={theme.palette.ui.mutedDark} variant="smallMedium">
            {t('evidenceManagement.assignment.type')}
          </Typography>
          <Box sx={{display: 'flex', gap: 1}}>
            <ChipStyled label={assignment.type} size="small" />
            <EditIcon />
          </Box>
        </Stack>
        <Stack>
          <Typography color={theme.palette.ui.mutedDark} variant="smallMedium">
            {t('evidenceManagement.assignment.date')}
          </Typography>
          <Typography variant="text">{formatISO(new Date(assignment.createdAt))}</Typography>
        </Stack>
        <Stack>
          <Typography color={theme.palette.ui.mutedDark} variant="smallMedium">
            {t('evidenceManagement.assignment.createdBy')}
          </Typography>
          <Box sx={{display: 'flex'}}>
            <ContactAvatar size="smaller" identifier={assignment.createdBy} />
            <Typography variant="text" sx={{ml: 1}}>
              {assignment.createdBy}
            </Typography>
          </Box>
        </Stack>
        <Stack>
          <Typography color={theme.palette.ui.mutedDark} variant="smallMedium">
            {t('evidenceManagement.assignment.updatedBy')}
          </Typography>
          <Box sx={{display: 'flex'}}>
            <ContactAvatar size="smaller" identifier={assignment.modifiedBy} />
            <Typography variant="text" sx={{ml: 1}}>
              {assignment.modifiedBy}
            </Typography>
          </Box>
        </Stack>
      </AssignmentDetailsListStyled>
    </Box>
  );
};

export default AssignmentDetails;
