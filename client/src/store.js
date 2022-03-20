import create from 'zustand';

const useStore = create((set) => ({
  company: {},
  showGlobalLoader: true,
  updateCompany: (company) =>
    set((state) => ({
      company,
    })),
  updateShowGlobalLoader: (showGlobalLoader) =>
    set((state) => ({
      showGlobalLoader,
    })),
}));

export default useStore;
