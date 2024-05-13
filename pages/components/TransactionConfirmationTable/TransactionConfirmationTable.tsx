import {Box, styled} from '@mui/system';
import {MDataGridPro} from '@cellebrite/design-system';
import {useUserStore} from 'store/userInfo/userInfo.store';
import useGetColumns from './useGetColumns';
import {SubmissionItem} from 'types/receive';

export const MDataGridProContainerStyled = styled(Box)(({theme}) => {
  return {
    '& .MuiDataGrid-columnHeader': {
      color: theme.palette.ui.mutedDark,
      fontSize: '12px',
      fontWeight: '500',
    },
    '& .MuiDataGrid-columnHeader .MuiDataGrid-columnSeparator': {
      visibility: 'visible !important',
      opacity: '100 !important',
    },
    '& .MuiDataGrid-columnHeader:focus': {
      outline: 0,
    },
    '&, [class^=MuiDataGrid]': {borderTop: 'none', borderLeft: 'none', borderRight: 'none'},
    '& .MuiDataGrid-columnHeaderTitle': {
      color: theme.palette.ui.mutedDark,
      textTransform: 'uppercase',
      fontSize: '12px',
    },
    '& .MuiDataGrid-cell': {
      paddingX: theme.spacing(3),
    },
    '& .MuiDataGrid-cell:focus': {
      outline: 0,
    },
    '& .MuiDataGrid-main': {
      overflowY: 'auto',
      maxHeight: '160px',
    },
  };
});

const TransactionConfirmationTable = ({items}: {items: SubmissionItem[] | undefined}): JSX.Element => {
  const columns = useGetColumns();
  const {loggedUser} = useUserStore();
  const rows =
    items?.map((item) => {
      return {
        id: item.id,
        itemId: item.id,
        date: new Date(),
        user: `${loggedUser?.firstName} ${loggedUser?.lastName}`,
        sourceLocation: 'Agency submission',
        location: "Analyst's custody",
      };
    }) || [];

  return (
    <MDataGridProContainerStyled sx={{padding: 0.5, width: '100%'}}>
      <MDataGridPro
        columns={columns}
        rows={rows}
        showColumnRightBorder
        rowHeight={40}
        headerHeight={40}
        hideFooter
        autoHeight
        showCellRightBorder
      />
    </MDataGridProContainerStyled>
  );
};

export default TransactionConfirmationTable;
