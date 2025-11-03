import { create } from "zustand";

interface IContextMenuState {
  contextMenuVisible: boolean;
  contextMenuPosition: { x: number; y: number };
  setContextMenuVisible: (visible: boolean) => void;
  setContextMenuPosition: (position: { x: number; y: number }) => void;
  toggleContextMenu: () => void;
}

export const useContextMenuStore = create<IContextMenuState>((set) => ({
  contextMenuVisible: false,
  contextMenuPosition: { x: 0, y: 0 },
  
  setContextMenuVisible: (visible) => set({ contextMenuVisible: visible }),
  
  setContextMenuPosition: (position) => set({ contextMenuPosition: position }),
  
  toggleContextMenu: () =>
    set((state) => ({ contextMenuVisible: !state.contextMenuVisible })),
}));
