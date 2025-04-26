import { create } from 'zustand';

const useMismatchStore = create((set) => ({
  mismatchButtonState: false,
  setMismatchButtonState: (state) => set({ mismatchButtonState: state }),
}));

export default useMismatchStore;