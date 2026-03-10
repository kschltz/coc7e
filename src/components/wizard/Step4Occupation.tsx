import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useWizardStore } from "../../store/investigatorStore";
import { OCCUPATIONS } from "../../domain/occupations";

export function Step4Occupation() {
  const { t } = useTranslation();
  const { data, updateData, setIsValid } = useWizardStore();

  const [occupationPoints, setOccupationPoints] = useState(0);
  const [personalPoints, setPersonalPoints] = useState(0);

  const occupation = OCCUPATIONS.find((o) => o.key === data.occupation);

  useEffect(() => {
    let newPersonalPoints = 0;
    if (data.INT?.value) {
      newPersonalPoints = data.INT.value * 2;
      setPersonalPoints(newPersonalPoints);
    }

    let newOccupationPoints = 0;
    if (occupation && data.EDU?.value) {
      if (occupation.pointFormula === "EDU*4") {
        newOccupationPoints = data.EDU.value * 4;
      } else if (occupation.pointFormula === "EDU*2+DEX*2" && data.DEX?.value) {
        newOccupationPoints = data.EDU.value * 2 + data.DEX.value * 2;
      } else if (occupation.pointFormula === "EDU*2+POW*2" && data.POW?.value) {
        newOccupationPoints = data.EDU.value * 2 + data.POW.value * 2;
      }
      setOccupationPoints(newOccupationPoints);
    }

    setIsValid(true);
    updateData({
      occupationPointsTotal: newOccupationPoints,
      personalPointsTotal: newPersonalPoints,
    });
  }, [
    data.INT?.value,
    data.EDU?.value,
    data.DEX?.value,
    data.POW?.value,
    occupation?.key,
    setIsValid,
    updateData,
  ]);

  if (!occupation) {
    return (
      <div className="text-center py-12 text-[#8B1A1A] font-serif italic">
        {t("select_occupation_step1")}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="font-['IM_Fell_English'] text-3xl text-[var(--color-weird-red)] italic border-b-[3px] border-[var(--color-weird-black)] pb-2 font-bold">
        {t("step_occupation")}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h4 className="font-serif uppercase tracking-wider text-[var(--color-weird-red)] text-xl font-bold">
            {t(`occ_${occupation.key}`)}
          </h4>

          <div className="bg-[var(--color-weird-paper)] p-6 border-[3px] border-[var(--color-weird-black)] shadow-[6px_6px_0px_var(--color-weird-black)] space-y-4">
            <div>
              <span className="font-bold text-[var(--color-weird-black)] uppercase text-xs tracking-wider">
                {t("point_formula")}:
              </span>
              <p className="font-['Courier_Prime'] text-xl font-bold">
                {occupation.pointFormula}
              </p>
            </div>

            <div>
              <span className="font-bold text-[var(--color-weird-black)] uppercase text-xs tracking-wider">
                {t("credit_rating")}:
              </span>
              <p className="font-['Courier_Prime'] text-xl font-bold">
                {occupation.creditRating[0]} - {occupation.creditRating[1]}
              </p>
            </div>

            <div>
              <span className="font-bold text-[var(--color-weird-black)] uppercase text-xs tracking-wider">
                {t("occupation_skills")}:
              </span>
              <ul className="list-disc list-inside mt-2 space-y-1 font-serif text-[var(--color-weird-black)] font-bold">
                {occupation.skills.map((skill) => (
                  <li key={skill}>{t(`skills_${skill}`)}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-serif uppercase tracking-wider text-[var(--color-weird-red)] text-xl font-bold">
            {t("skill_points_available")}
          </h4>

          <div className="grid grid-cols-1 gap-6">
            <div className="bg-[var(--color-weird-black)] text-[var(--color-weird-paper)] p-6 border-[3px] border-[var(--color-weird-red)] shadow-[6px_6px_0px_var(--color-weird-red)] flex justify-between items-center">
              <span className="font-serif uppercase tracking-wider text-sm font-bold">
                {t("occupation_points")}
              </span>
              <span className="font-['Courier_Prime'] text-4xl font-bold text-[var(--color-weird-red)]">
                {occupationPoints}
              </span>
            </div>

            <div className="bg-[var(--color-weird-red)] text-[var(--color-weird-paper)] p-6 border-[3px] border-[var(--color-weird-black)] shadow-[6px_6px_0px_var(--color-weird-black)] flex justify-between items-center">
              <span className="font-serif uppercase tracking-wider text-sm font-bold">
                {t("personal_interest_points")}
              </span>
              <span className="font-['Courier_Prime'] text-4xl font-bold text-[var(--color-weird-black)]">
                {personalPoints}
              </span>
            </div>
          </div>

          <p className="text-sm italic text-[var(--color-weird-black)]/80 font-serif leading-relaxed mt-6 font-bold">
            {t("skill_distribution_note")}
          </p>
        </div>
      </div>
    </div>
  );
}
