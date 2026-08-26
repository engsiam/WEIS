import { create } from "zustand";

interface AppState {
  mobileNavOpen: boolean;
  activeSection: string;
  leadModalOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;
  toggleMobileNav: () => void;
  setActiveSection: (id: string) => void;
  openLeadModal: () => void;
  closeLeadModal: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  mobileNavOpen: false,
  activeSection: "",
  leadModalOpen: false,
  setMobileNavOpen: (open) => set({ mobileNavOpen: open }),
  toggleMobileNav: () =>
    set((state) => ({ mobileNavOpen: !state.mobileNavOpen })),
  setActiveSection: (id) => set({ activeSection: id }),
  // Opening the wizard also dismisses the mobile nav so the CTA works from it.
  openLeadModal: () => set({ leadModalOpen: true, mobileNavOpen: false }),
  closeLeadModal: () => set({ leadModalOpen: false }),
}));
