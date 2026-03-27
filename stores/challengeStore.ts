import { create } from 'zustand';

export interface ChallengeStep {
  id: string;
  type: 'run' | 'pushups' | 'pullups' | 'cycling' | 'swim' | 'other';
  targetValue: number;
  targetUnit: string;
}

interface ChallengeState {
  isCreating: boolean;
  draftSteps: ChallengeStep[];
  addStep: (step: Omit<ChallengeStep, 'id'>) => void;
  removeStep: (id: string) => void;
  reorderSteps: (from: number, to: number) => void;
  clearDraft: () => void;
  startCreating: () => void;
}

export const useChallengeStore = create<ChallengeState>((set) => ({
  isCreating: false,
  draftSteps: [],
  startCreating: () => set({ isCreating: true, draftSteps: [] }),
  addStep: (step) =>
    set((state) => ({
      draftSteps: [
        ...state.draftSteps,
        { ...step, id: Math.random().toString(36).substring(7) },
      ],
    })),
  removeStep: (id) =>
    set((state) => ({
      draftSteps: state.draftSteps.filter((step) => step.id !== id),
    })),
  reorderSteps: (from, to) =>
    set((state) => {
      const steps = [...state.draftSteps];
      const item = steps.splice(from, 1)[0];
      steps.splice(to, 0, item);
      return { draftSteps: steps };
    }),
  clearDraft: () => set({ draftSteps: [], isCreating: false }),
}));
