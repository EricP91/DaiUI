import {Signature} from 'types/receive';
import {create} from 'zustand';
import {devtools} from 'zustand/middleware';

type TransactionState = {
  note: string;
  setNote: (note: string) => void;
  labSignature?: Signature;
  setLabSignature: (signature?: Signature) => void;
  submitterSignature?: Signature;
  setSubmitterSignature: (signature?: Signature) => void;
};

export const useTransactionStore = create<TransactionState>()(
  devtools((set) => ({
    note: '',
    setNote: (note: string) => set((state: TransactionState) => ({...state, note})),
    labSignature: {name: '', dataUrl: undefined, isApproved: false},
    setLabSignature: (signature?: Signature) => set((state: TransactionState) => ({...state, labSignature: signature})),
    submitterSignature: {name: '', dataUrl: undefined, isApproved: false},
    setSubmitterSignature: (signature?: Signature) =>
      set((state: TransactionState) => ({...state, submitterSignature: signature})),
  })),
);
