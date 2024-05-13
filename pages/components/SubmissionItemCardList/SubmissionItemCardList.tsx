import {Box} from '@mui/system';
import {useCallback} from 'react';
import {useReceiveStore} from 'store/receive/receive.store';
import {SubmissionItem} from 'types/receive';
import SubmissionItemEditCard from '../SubmissionItemEditCard/';
import SubmissionIdentifier from '../SubmissionIdentifier/SubmissionIdentifier';

const SubmissionItemCardList = ({
  items,
  allItems,
  submissionId,
}: {
  items: SubmissionItem[];
  allItems: SubmissionItem[];
  submissionId: string;
}): JSX.Element => {
  const setSubmissionItems = useReceiveStore((state) => state.setSubmissionItems);
  const handleItemChange = useCallback(
    () =>
      (newItem: SubmissionItem): void => {
        const newItems = items.map((_) => {
          if (_.id === newItem.id) {
            return newItem;
          }
          return _;
        });
        setSubmissionItems(newItems);
      },
    [items, setSubmissionItems],
  );
  const handleSubDivide = (itemCount: number, item: SubmissionItem): void => {
    const hasSameOrigin = (item1: SubmissionItem, item2: SubmissionItem): boolean => {
      const length = Math.min(item1.id.length, item2.id.length);
      if (
        item1.id.slice(0, length) !== item2.id.slice(0, length) ||
        (item1.id.length > length && item1.id[length] !== '.') ||
        (item2.id.length > length && item2.id[length] !== '.')
      ) {
        return false;
      }
      return true;
    };
    const subdividedItems = items.reduce((acc: SubmissionItem[], cur, index) => {
      acc.push(cur);
      if (hasSameOrigin(cur, item) && (index === items.length - 1 || !hasSameOrigin(items[index + 1], item))) {
        const baseId = +(cur.id.split('.')[item.id.split('.').length] ?? 0);
        new Array(itemCount).fill(1).forEach((_, _index) => {
          acc.push({...cur, id: `${item.id}.${baseId + _index + 1}`});
        });
      }
      return acc;
    }, []);
    if (!allItems) {
      return;
    }
    const result = allItems.reduce((acc: SubmissionItem[], cur) => {
      if (cur.id !== item.id) {
        acc.push(cur);
      } else {
        subdividedItems.forEach((subItem) => acc.push(subItem));
      }
      return acc;
    }, []);
    setSubmissionItems(result);
  };
  const handleReject = (item: SubmissionItem): void => {
    if (!allItems) {
      return;
    }
    const newItems = allItems.filter((_) => _.id !== item.id);
    setSubmissionItems(newItems);
  };
  return (
    <>
      <Box sx={{ml: 3}}>
        <SubmissionIdentifier submissionId={submissionId} />
      </Box>
      <Box sx={{display: 'flex', gap: 2, flexDirection: 'column'}}>
        {items.map((item) => (
          <SubmissionItemEditCard
            submissionItem={item}
            key={item.id}
            onChange={handleItemChange}
            onSubDivide={(itemCount) => {
              handleSubDivide(itemCount, item);
            }}
            onReject={() => handleReject(item)}
          />
        ))}
      </Box>
    </>
  );
};

export default SubmissionItemCardList;
