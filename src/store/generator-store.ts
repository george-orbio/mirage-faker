import { create } from 'zustand';
import { faker } from '@faker-js/faker';
import { DATA_DEFINITIONS, DataCategory, FieldDefinition } from '@/lib/data-definitions';
export type GeneratedData = Record<string, any>;
interface GeneratorState {
  // User Selections
  category: DataCategory | null;
  selectedFields: Record<string, boolean>;
  quantity: number;
  // Generation Results
  results: GeneratedData[];
  isLoading: boolean;
  generationTime: number | null;
  // Actions
  setCategory: (category: DataCategory | null) => void;
  toggleField: (fieldKey: string) => void;
  setQuantity: (quantity: number) => void;
  generateData: () => void;
}
export const useGeneratorStore = create<GeneratorState>((set, get) => ({
  category: null,
  selectedFields: {},
  quantity: 10,
  results: [],
  isLoading: false,
  generationTime: null,
  setCategory: (category) => {
    set({ category, selectedFields: {}, results: [] }); // Reset fields and results on category change
  },
  toggleField: (fieldKey) => {
    set((state) => ({
      selectedFields: {
        ...state.selectedFields,
        [fieldKey]: !state.selectedFields[fieldKey],
      },
    }));
  },
  setQuantity: (quantity) => {
    const safeQuantity = Math.max(1, Math.min(10000, quantity)); // Clamp quantity between 1 and 10,000
    set({ quantity: safeQuantity });
  },
  generateData: () => {
    const { category, selectedFields, quantity } = get();
    if (!category) return;
    const categoryDefinition = DATA_DEFINITIONS.find(def => def.id === category);
    if (!categoryDefinition) return;
    const activeFields = categoryDefinition.fields.filter(field => selectedFields[field.id]);
    if (activeFields.length === 0) return;
    set({ isLoading: true, results: [], generationTime: null });
    // Use a timeout to allow the UI to update to the loading state
    setTimeout(() => {
      const startTime = performance.now();
      const generatedResults: GeneratedData[] = [];
      for (let i = 0; i < quantity; i++) {
        const record: GeneratedData = {};
        activeFields.forEach((field: FieldDefinition) => {
          record[field.label] = field.generator();
        });
        generatedResults.push(record);
      }
      const endTime = performance.now();
      set({
        results: generatedResults,
        isLoading: false,
        generationTime: endTime - startTime,
      });
    }, 50); // A small delay to ensure UI update
  },
}));