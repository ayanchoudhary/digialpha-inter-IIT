import create from 'zustand';

const useStore = create((set) => ({
  company: {},
  showGlobalLoader: true,
  searchCompanies: [],
  updateSearchCompanies: (searchCompanies) => set((state) => ({ searchCompanies })),
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
