import { create } from "zustand";

interface GameState {
  score: number;
  currentIndex: number;
  setScore: (score: number) => void;
  setCurrentIndex: (index: number) => void;
}

export const useGameStore = create<GameState>((set) => ({
  score: 0,
  currentIndex: 0,
  setScore: (score) => set({ score }),
  setCurrentIndex: (index) => set({ currentIndex: index }),
}));
