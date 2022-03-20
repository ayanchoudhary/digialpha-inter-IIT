import create from 'zustand';

const useStore = create((set) => ({
  company: {},
  searchCompanies: [],
  updateSearchCompanies: (searchCompanies) => set((state) => ({ searchCompanies })),
  updateCompany: (company) =>
    set((state) => ({
      company,
    })),
}));

export default useStore;
