import {useRef} from 'react';
import {MInput, MButton, MenuButton} from '@cellebrite/design-system';
import {Typography, MenuItem} from '@mui/material';
import {Box} from '@mui/system';
import {servicesOptions} from 'mocks/handlers/receive';
import {ItemAvatar} from 'pages/components/ItemAvatar';
import {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {SubmissionItem} from 'types/receive';
import AutoCompleteMultiSelect, {Option} from 'pages/components/AutoCompleteMultiSelect';

const subDivideMenuItems = (onChange: (itemCount: number) => void): JSX.Element[] =>
  new Array(8).fill(1).map((_, index) => {
    return <MenuItem onClick={() => onChange(index + 1)}>{index + 1} Items</MenuItem>;
  });

interface SubmissionItemEditCardProps {
  submissionItem: SubmissionItem;
  onChange?: (newItem: SubmissionItem) => void;
  onSubDivide?: (itemCount: number) => void;
  onReject?: () => void;
}

const SubmissionItemEditCard = (props: SubmissionItemEditCardProps): JSX.Element => {
  const {submissionItem, onChange, onSubDivide, onReject} = props;
  const {t} = useTranslation();
  const [currentItem, setCurrentItem] = useState<SubmissionItem>(submissionItem);
  const menuRef = useRef<{handleClose: () => void}>();

  const handleSelectService = (_event: Event, value: Option[]): void => {
    setCurrentItem({...currentItem, servicesRequested: value.map((_) => ({id: _.value, name: _.title}))});
  };

  const handleSubdivideClick = (itemCount: number): void => {
    if (onSubDivide) onSubDivide(itemCount);
    menuRef.current?.handleClose();
  };

  const handleDescriptionChange = (value: string): void => {
    setCurrentItem({...currentItem, description: value});
  };

  const handleReject = (): void => {
    if (onReject) {
      onReject();
    }
  };

  useEffect(() => {
    if (onChange) onChange(currentItem);
  }, [currentItem, onChange]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'rows',
        width: 876,
        padding: 2,
        boxShadow: '0px 16px 32px -4px rgba(145, 158, 171, 0.24), 0px 0px 2px 0px rgba(145, 158, 171, 0.24);',
        borderRadius: 2,
        ml: 3,
        mr: 2,
        backgroundColor: 'white',
      }}
    >
      <ItemAvatar />
      <Box sx={{display: 'flex', flexDirection: 'column', flexGrow: 1}}>
        <Box sx={{display: 'flex', gap: 1, flexGrow: 1}}>
          <Box sx={{display: 'flex', alignItems: 'center', height: 40, flexGrow: 1, mb: 1}}>
            <Typography>
              {t('common.itemId')} <Typography variant="largeBold">{currentItem.id}</Typography> from{' '}
              <Typography variant="largeBold">{currentItem.submittingAgency}</Typography>
            </Typography>
          </Box>
        </Box>
        <Box sx={{display: 'flex', flexGrow: 1, gap: 3}}>
          <Box sx={{display: 'flex', flexDirection: 'column', gap: 4, flexGrow: 1}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', flexGrow: 1}}>
              <MInput
                label="Item Description"
                value={currentItem.description}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                size="small"
                fullWidth
              />
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'space-between', flexGrow: 1}}>
              <Box sx={{flexGrow: 1}}>
                <AutoCompleteMultiSelect
                  label="Service Requested"
                  placeholder=""
                  value={currentItem?.servicesRequested?.map((_) => ({title: _.name, value: _.id}))}
                  options={servicesOptions}
                  onChange={handleSelectService}
                />
              </Box>
            </Box>
          </Box>
          <Box sx={{display: 'flex', gap: 2}}>
            <Box>
              <MButton variant="outlined" onClick={handleReject}>
                Reject
              </MButton>
            </Box>
            <Box>
              <MenuButton
                variant="outlined"
                buttonText="Subdivide"
                children={subDivideMenuItems(handleSubdivideClick)}
                isOpen={false}
                ref={menuRef}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SubmissionItemEditCard;
