import {DashboardTileType} from 'types/dashboard/tiles';
import {create} from 'zustand';
import {devtools, persist} from 'zustand/middleware';

export type DashboardTileState = {
  activeTile?: DashboardTileType;
  setActiveTile: (tile?: DashboardTileType) => void;
};

export const useDashboardTileStore = create<DashboardTileState>()(
  devtools(
    persist(
      (set) => ({
        activeTile: undefined,
        setActiveTile: (tile?: DashboardTileType) => set((state: DashboardTileState) => ({...state, activeTile: tile})),
      }),
      {name: 'dashboard-tiles-store'},
    ),
  ),
);
