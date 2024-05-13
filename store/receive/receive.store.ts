import {SubmissionItem} from './../../types/receive';
import {create} from 'zustand';
import {devtools} from 'zustand/middleware';

export type ReceiveState = {
  submissionItems?: SubmissionItem[];
  setSubmissionItems: (PendingSubmissions?: SubmissionItem[]) => void;
  activeProcessStep: number;
  setActiveProcessStep: (step: number) => void;
};

export const useReceiveStore = create<ReceiveState>()(
  devtools((set) => ({
    submissionItems: [],
    setSubmissionItems: (submissionItems?: SubmissionItem[]) =>
      set((state: ReceiveState) => ({...state, submissionItems})),
    activeProcessStep: 0,
    setActiveProcessStep: (step: number) => set((state: ReceiveState) => ({...state, activeProcessStep: step})),
  })),
);
