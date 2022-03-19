import create from 'zustand';

const useStore = create((set) => ({
  company: {},
  updateCompany: (company) =>
    set((state) => ({
      company,
    })),
}));

export default useStore;
