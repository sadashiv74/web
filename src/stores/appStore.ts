import { create } from 'zustand';

interface AppState {
  darkMode: boolean;
  toggleDarkMode: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedBranch: string;
  setSelectedBranch: (branch: string) => void;
  selectedSemester: number | null;
  setSelectedSemester: (semester: number | null) => void;
  selectedYear: number | null;
  setSelectedYear: (year: number | null) => void;
  selectedExamType: string;
  setSelectedExamType: (type: string) => void;
  showSolutionsOnly: boolean;
  setShowSolutionsOnly: (show: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  selectedBranch: 'ALL',
  setSelectedBranch: (branch) => set({ selectedBranch: branch }),
  selectedSemester: null,
  setSelectedSemester: (semester) => set({ selectedSemester: semester }),
  selectedYear: null,
  setSelectedYear: (year) => set({ selectedYear: year }),
  selectedExamType: 'ALL',
  setSelectedExamType: (type) => set({ selectedExamType: type }),
  showSolutionsOnly: false,
  setShowSolutionsOnly: (show) => set({ showSolutionsOnly: show }),
}));