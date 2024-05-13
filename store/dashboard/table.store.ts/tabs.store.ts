import {create} from 'zustand';
import {devtools, persist} from 'zustand/middleware';

export type TabsState = {
  primaryActiveTab: number;
  setPrimaryActiveTab: (tab: number) => void;
  assignmentsActiveTab: number;
  setAssignmentsActiveTab: (tab: number) => void;
  itemsActiveTab: number;
  setItemsActiveTab: (tab: number) => void;
};

export const useDashboardTabsStore = create<TabsState>()(
  devtools(
    persist(
      (set) => ({
        primaryActiveTab: 0,
        setPrimaryActiveTab: (tab: number) => set((state: TabsState) => ({...state, primaryActiveTab: tab})),
        assignmentsActiveTab: 0,
        setAssignmentsActiveTab: (tab: number) => set((state: TabsState) => ({...state, assignmentsActiveTab: tab})),
        itemsActiveTab: 0,
        setItemsActiveTab: (tab: number) => set((state: TabsState) => ({...state, itemsActiveTab: tab})),
      }),
      {name: 'dashboard-tabs-store'},
    ),
  ),
);
