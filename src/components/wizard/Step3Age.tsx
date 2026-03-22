import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useWizardStore } from "../../store/investigatorStore";
import { PulpInput } from "../ui/PulpInput";
import { getAgeModifiers } from "../../domain/age";

export function Step3Age() {
  const { t } = useTranslation();
  const { data, updateData, setIsValid } = useWizardStore();

  const [age, setAge] = useState<number>(data.age || 20);

  useEffect(() => {
    const valid = age >= 15 && age <= 90;
    setIsValid(valid);
    if (valid) {
      updateData({ age });
    }
  }, [age, setIsValid, updateData]);

  const modifiers = getAgeModifiers(age);

  return (
    <div className="space-y-6">
      <h3 className="font-serif text-3xl text-[var(--color-weird-paper)] italic border-b-[3px] border-[var(--color-weird-black)] pb-2 font-bold">
        {t("step_age")}
      </h3>

      <div className="max-w-md mx-auto space-y-8">
        <div className="space-y-2">
          <label className="text-sm font-serif uppercase tracking-wider text-[var(--color-weird-black)] block text-center font-bold">
            {t("age")} (15-90)
          </label>
          <PulpInput
            type="number"
            min="15"
            max="90"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value) || 15)}
            className="text-center text-4xl font-['Courier_Prime'] font-bold h-20 border-b-[3px] border-[var(--color-weird-red)] bg-transparent"
          />
        </div>

        <div className="bg-[var(--color-weird-paper)] p-6 border-[3px] border-[var(--color-weird-black)]">
          <h4 className="font-serif uppercase tracking-wider text-[var(--color-weird-red)] text-lg font-bold mb-4 border-b-2 border-[var(--color-weird-black)] pb-2">
            {t("age_modifiers")}
          </h4>
          <ul className="space-y-3 text-sm font-serif text-[var(--color-weird-black)] font-bold">
            {modifiers.eduPenalty > 0 && (
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[var(--color-weird-red)] rotate-45 border-2 border-[var(--color-weird-black)]"></span>
                {t("edu_penalty", { count: modifiers.eduPenalty })}
              </li>
            )}
            {modifiers.strSizPenalty > 0 && (
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[var(--color-weird-red)] rotate-45 border-2 border-[var(--color-weird-black)]"></span>
                {t("str_siz_penalty", { count: modifiers.strSizPenalty })}
              </li>
            )}
            {modifiers.strConDexPenalty > 0 && (
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[var(--color-weird-red)] rotate-45 border-2 border-[var(--color-weird-black)]"></span>
                {t("str_con_dex_penalty", { count: modifiers.strConDexPenalty })}
              </li>
            )}
            {modifiers.appPenalty > 0 && (
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[var(--color-weird-red)] rotate-45 border-2 border-[var(--color-weird-black)]"></span>
                {t("app_penalty", { count: modifiers.appPenalty })}
              </li>
            )}
            {modifiers.eduImprovementChecks > 0 && (
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[var(--color-weird-red)] rotate-45 border-2 border-[var(--color-weird-black)]"></span>
                {t("edu_improvement_checks", { count: modifiers.eduImprovementChecks })}
              </li>
            )}
            {modifiers.luckRolls > 1 && (
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[var(--color-weird-red)] rotate-45 border-2 border-[var(--color-weird-black)]"></span>
                {t("luck_rolls", { count: modifiers.luckRolls })}
              </li>
            )}
            {Object.values(modifiers).every(
              (v) => v === 0 || (v === 1 && modifiers.luckRolls === 1),
            ) && (
              <li className="italic opacity-70">
                {t("no_modifiers")}
              </li>
            )}
          </ul>
          <p className="mt-6 text-xs italic text-[var(--color-weird-black)]/70 font-bold border-t border-[var(--color-weird-black)]/20 pt-2">
            {t("age_note")}
          </p>
        </div>
      </div>
    </div>
  );
}
