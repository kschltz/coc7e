import { create } from "zustand";
import { InvestigatorSheet, AttributeKey } from "../domain/schema";
import { createAttribute } from "../domain/attributes";
import {
  calculateMaxHP,
  calculateMaxMP,
  calculateStartingSAN,
  calculateMaxSAN,
  calculateMOV,
  calculateBuildAndDamageBonus,
} from "../domain/derivedStats";

interface InvestigatorState {
  sheet: InvestigatorSheet | null;
  isDirty: boolean;
  editMode: boolean;

  loadSheet: (s: InvestigatorSheet) => void;
  updateField: <K extends keyof InvestigatorSheet>(
    key: K,
    value: InvestigatorSheet[K],
  ) => void;
  updateAttribute: (attr: AttributeKey, value: number) => void;
  updateSkill: (skillKey: string, value: number) => void;
  tickSkillCheck: (skillKey: string) => void;
  updateHP: (current: number) => void;
  updateMP: (current: number) => void;
  updateSAN: (current: number) => void;
  updateLuck: (value: number) => void;
  clearSheet: () => void;
  setEditMode: (on: boolean) => void;
}

export const useInvestigatorStore = create<InvestigatorState>((set) => ({
  sheet: null,
  isDirty: false,
  editMode: false,

  loadSheet: (sheet) => set({ sheet, isDirty: false, editMode: false }),

  updateField: (key, value) =>
    set((state) => {
      if (!state.sheet) return state;
      return {
        sheet: {
          ...state.sheet,
          [key]: value,
          updatedAt: new Date().toISOString(),
        },
        isDirty: true,
      };
    }),

  updateAttribute: (attr, value) =>
    set((state) => {
      if (!state.sheet) return state;
      const newSheet = {
        ...state.sheet,
        [attr]: createAttribute(value),
        updatedAt: new Date().toISOString(),
      };

      // Recalculate derived stats
      newSheet.hp.max = calculateMaxHP(newSheet.CON.value, newSheet.SIZ.value);
      newSheet.mp.max = calculateMaxMP(newSheet.POW.value);
      newSheet.san.starting = calculateStartingSAN(newSheet.POW.value);
      newSheet.mov = calculateMOV(
        newSheet.DEX.value,
        newSheet.STR.value,
        newSheet.SIZ.value,
        newSheet.age,
      );
      const { build, damageBonus } = calculateBuildAndDamageBonus(
        newSheet.STR.value,
        newSheet.SIZ.value,
      );
      newSheet.build = build;
      newSheet.damageBonus = damageBonus;

      return { sheet: newSheet, isDirty: true };
    }),

  updateSkill: (skillKey, value) =>
    set((state) => {
      if (!state.sheet) return state;
      const skills = { ...state.sheet.skills };
      if (skills[skillKey]) {
        skills[skillKey] = { ...skills[skillKey], value };
      }

      const newSheet = {
        ...state.sheet,
        skills,
        updatedAt: new Date().toISOString(),
      };

      if (skillKey === "cthulhu_mythos") {
        newSheet.san.max = calculateMaxSAN(value);
        if (newSheet.san.current > newSheet.san.max) {
          newSheet.san.current = newSheet.san.max;
        }
      }

      return { sheet: newSheet, isDirty: true };
    }),

  tickSkillCheck: (skillKey) =>
    set((state) => {
      if (!state.sheet) return state;
      const skills = { ...state.sheet.skills };
      if (skills[skillKey]) {
        skills[skillKey] = {
          ...skills[skillKey],
          checked: !skills[skillKey].checked,
        };
      }
      return {
        sheet: { ...state.sheet, skills, updatedAt: new Date().toISOString() },
        isDirty: true,
      };
    }),

  updateHP: (current) =>
    set((state) => {
      if (!state.sheet) return state;
      return {
        sheet: {
          ...state.sheet,
          hp: { ...state.sheet.hp, current },
          updatedAt: new Date().toISOString(),
        },
        isDirty: true,
      };
    }),

  updateMP: (current) =>
    set((state) => {
      if (!state.sheet) return state;
      return {
        sheet: {
          ...state.sheet,
          mp: { ...state.sheet.mp, current },
          updatedAt: new Date().toISOString(),
        },
        isDirty: true,
      };
    }),

  updateSAN: (current) =>
    set((state) => {
      if (!state.sheet) return state;
      return {
        sheet: {
          ...state.sheet,
          san: { ...state.sheet.san, current },
          updatedAt: new Date().toISOString(),
        },
        isDirty: true,
      };
    }),

  updateLuck: (value) =>
    set((state) => {
      if (!state.sheet) return state;
      return {
        sheet: {
          ...state.sheet,
          luck: value,
          updatedAt: new Date().toISOString(),
        },
        isDirty: true,
      };
    }),

  clearSheet: () => set({ sheet: null, isDirty: false, editMode: false }),
  setEditMode: (on) => set({ editMode: on }),
}));

interface WizardState {
  currentStep: number;
  data: Partial<InvestigatorSheet>;
  isValid: boolean;

  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateData: (partial: Partial<InvestigatorSheet>) => void;
  resetWizard: () => void;
  setIsValid: (valid: boolean) => void;
}

export const useWizardStore = create<WizardState>((set) => ({
  currentStep: 1,
  data: {},
  isValid: false,

  setStep: (step) => set({ currentStep: step }),
  nextStep: () =>
    set((state) => ({ currentStep: Math.min(7, state.currentStep + 1) })),
  prevStep: () =>
    set((state) => ({ currentStep: Math.max(1, state.currentStep - 1) })),
  updateData: (partial) =>
    set((state) => ({ data: { ...state.data, ...partial } })),
  resetWizard: () => set({ currentStep: 1, data: {}, isValid: false }),
  setIsValid: (valid) => set({ isValid: valid }),
}));
