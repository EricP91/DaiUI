import {createContext, Dispatch, SetStateAction} from 'react';
import {ReceiveResponse} from 'types/receive';

export const ScanEvidenceDialogContext = createContext<{
  items: ReceiveResponse[];
  setItems?: Dispatch<SetStateAction<ReceiveResponse[]>>;
}>({items: [], setItems: undefined});
