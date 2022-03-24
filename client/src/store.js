import create from 'zustand';
import { CURRENT_TIME } from '@layouts/companyDashboard/TimeFilter';

const useStore = create((set) => ({
  company: {},
  company1: {},
  company2: {},
  showGlobalLoader: true,
  searchCompanies: [],
  timeFilter: {
    startDate: 'Q1-2017',
    endDate: `${CURRENT_TIME.qtr}-${CURRENT_TIME.year}`,
  },
  updateSearchCompanies: (searchCompanies) => set(() => ({ searchCompanies })),
  updateCompany: (company) =>
    set(() => ({
      company,
    })),
  updateShowGlobalLoader: (showGlobalLoader) =>
    set(() => ({
      showGlobalLoader,
    })),
  updateStartDate: (startDate) =>
    set((state) => ({
      timeFilter: {
        startDate,
        endDate: state.timeFilter.endDate,
      },
    })),
  updateEndDate: (endDate) =>
    set((state) => ({
      timeFilter: {
        startDate: state.timeFilter.startDate,
        endDate,
      },
    })),
}));

export default useStore;
