import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useWizardStore } from "../../store/investigatorStore";
import {
  calculateMaxHP,
  calculateMaxMP,
  calculateStartingSAN,
  calculateMOV,
  calculateBuildAndDamageBonus,
} from "../../domain/derivedStats";

export function Step7Review() {
  const { t } = useTranslation();
  const { data, setIsValid } = useWizardStore();

  useEffect(() => {
    setIsValid(true);
  }, [setIsValid]);

  const hpMax = calculateMaxHP(data.CON?.value || 50, data.SIZ?.value || 50);
  const mpMax = calculateMaxMP(data.POW?.value || 50);
  const sanStarting = calculateStartingSAN(data.POW?.value || 50);
  const mov = calculateMOV(
    data.DEX?.value || 50,
    data.STR?.value || 50,
    data.SIZ?.value || 50,
    data.age || 20,
  );
  const { build, damageBonus } = calculateBuildAndDamageBonus(
    data.STR?.value || 50,
    data.SIZ?.value || 50,
  );

  return (
    <div className="space-y-8">
      <h3 className="font-['IM_Fell_English'] text-3xl text-[var(--color-weird-red)] italic border-b-[3px] border-[var(--color-weird-black)] pb-2 font-bold">
        {t("step_review")}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4 bg-[var(--color-weird-paper)] p-6 border-[3px] border-[var(--color-weird-black)] shadow-[6px_6px_0px_var(--color-weird-black)]">
          <h4 className="font-serif uppercase tracking-wider text-[var(--color-weird-red)] text-xl font-bold border-b-2 border-[var(--color-weird-black)] pb-2">
            {t("biography")}
          </h4>
          <div className="grid grid-cols-2 gap-2 text-sm font-serif font-bold text-[var(--color-weird-black)]">
            <span className="text-[var(--color-weird-red)]">{t("name")}:</span>{" "}
            <span>{data.name}</span>
            <span className="text-[var(--color-weird-red)]">{t("player")}:</span>{" "}
            <span>{data.player || "-"}</span>
            <span className="text-[var(--color-weird-red)]">{t("occupation")}:</span>{" "}
            <span>{t(`occ_${data.occupation}`)}</span>
            <span className="text-[var(--color-weird-red)]">{t("age")}:</span>{" "}
            <span>{data.age}</span>
            <span className="text-[var(--color-weird-red)]">{t("sex")}:</span>{" "}
            <span>{data.sex || "-"}</span>
            <span className="text-[var(--color-weird-red)]">{t("residence")}:</span>{" "}
            <span>{data.residence || "-"}</span>
            <span className="text-[var(--color-weird-red)]">{t("birthplace")}:</span>{" "}
            <span>{data.birthplace || "-"}</span>
          </div>
        </div>

        <div className="space-y-4 bg-[var(--color-weird-paper)] p-6 border-[3px] border-[var(--color-weird-black)] shadow-[6px_6px_0px_var(--color-weird-black)]">
          <h4 className="font-serif uppercase tracking-wider text-[var(--color-weird-red)] text-xl font-bold border-b-2 border-[var(--color-weird-black)] pb-2">
            {t("attributes")}
          </h4>
          <div className="grid grid-cols-4 gap-2 text-sm font-['Courier_Prime']">
            {["STR", "CON", "SIZ", "DEX", "APP", "INT", "POW", "EDU"].map(
              (attr) => (
                <div
                  key={attr}
                  className="flex flex-col items-center bg-[var(--color-weird-paper)] p-2 border-2 border-[var(--color-weird-black)] shadow-[2px_2px_0px_var(--color-weird-black)]"
                >
                  <span className="font-serif font-bold text-[var(--color-weird-red)] text-xs">
                    {t(attr.toLowerCase())}
                  </span>
                  <span className="text-xl font-bold text-[var(--color-weird-black)]">
                    {(data as any)[attr]?.value || 50}
                  </span>
                </div>
              ),
            )}
            <div className="flex flex-col items-center bg-[var(--color-weird-paper)] p-2 border-2 border-[var(--color-weird-black)] shadow-[2px_2px_0px_var(--color-weird-black)]">
              <span className="font-serif font-bold text-[var(--color-weird-red)] text-xs">
                {t("luck")}
              </span>
              <span className="text-xl font-bold text-[var(--color-weird-black)]">{data.luck || 50}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 bg-[var(--color-weird-paper)] p-6 border-[3px] border-[var(--color-weird-black)] shadow-[6px_6px_0px_var(--color-weird-black)]">
          <h4 className="font-serif uppercase tracking-wider text-[var(--color-weird-red)] text-xl font-bold border-b-2 border-[var(--color-weird-black)] pb-2">
            {t("derived_stats")}
          </h4>
          <div className="grid grid-cols-3 gap-4 text-sm font-['Courier_Prime']">
            <div className="flex flex-col items-center">
              <span className="font-serif font-bold text-[var(--color-weird-red)] text-xs">
                {t("hp")}
              </span>
              <span className="text-2xl font-bold text-[var(--color-weird-black)]">{hpMax}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-serif font-bold text-[var(--color-weird-red)] text-xs">
                {t("mp")}
              </span>
              <span className="text-2xl font-bold text-[var(--color-weird-black)]">{mpMax}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-serif font-bold text-[var(--color-weird-red)] text-xs">
                {t("san")}
              </span>
              <span className="text-2xl font-bold text-[var(--color-weird-black)]">{sanStarting}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-serif font-bold text-[var(--color-weird-red)] text-xs">
                {t("mov")}
              </span>
              <span className="text-2xl font-bold text-[var(--color-weird-black)]">{mov}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-serif font-bold text-[var(--color-weird-red)] text-xs">
                {t("build")}
              </span>
              <span className="text-2xl font-bold text-[var(--color-weird-black)]">{build}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-serif font-bold text-[var(--color-weird-red)] text-xs">
                {t("damage_bonus")}
              </span>
              <span className="text-2xl font-bold text-[var(--color-weird-black)]">{damageBonus}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 bg-[var(--color-weird-paper)] p-6 border-[3px] border-[var(--color-weird-black)] shadow-[6px_6px_0px_var(--color-weird-black)]">
          <h4 className="font-serif uppercase tracking-wider text-[var(--color-weird-red)] text-xl font-bold border-b-2 border-[var(--color-weird-black)] pb-2">
            {t("top_skills")}
          </h4>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm font-serif font-bold text-[var(--color-weird-black)]">
            {Object.entries(data.skills || {})
              .filter(([_, s]) => s.value > s.base)
              .sort((a, b) => b[1].value - a[1].value)
              .slice(0, 10)
              .map(([key, s]) => (
                <div
                  key={key}
                  className="flex justify-between border-b-2 border-[var(--color-weird-black)]/20 py-1"
                >
                  <span className="truncate pr-2" title={t(`skills_${key}`)}>
                    {t(`skills_${key}`)}
                  </span>
                  <span className="font-['Courier_Prime'] font-bold text-[var(--color-weird-red)] text-lg">
                    {s.value}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="text-center mt-8 text-[var(--color-weird-black)] font-serif italic font-bold text-lg">
        {t("finalize_note")}
      </div>
    </div>
  );
}
