import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useWizardStore } from "../../store/investigatorStore";
import { SKILL_CATALOGUE } from "../../domain/skills";
import { OCCUPATIONS } from "../../domain/occupations";
import { PulpInput } from "../ui/PulpInput";

export function Step5Skills() {
  const { t } = useTranslation();
  const { data, updateData, setIsValid } = useWizardStore();

  const [skills, setSkills] = useState<
    Record<string, { value: number; isOccupation: boolean }>
  >({});
  const [occSpent, setOccSpent] = useState(0);
  const [persSpent, setPersSpent] = useState(0);

  const occupation = OCCUPATIONS.find((o) => o.key === data.occupation);
  const occSkills = occupation?.skills || [];
  const occPointsTotal = data.occupationPointsTotal || 0;
  const persPointsTotal = data.personalPointsTotal || 0;

  const occSkillsStr = occSkills.join(',');

  useEffect(() => {
    // Initialize skills if not present
    if (Object.keys(skills).length === 0) {
      const initialSkills: Record<
        string,
        { value: number; isOccupation: boolean }
      > = {};
      SKILL_CATALOGUE.forEach((s) => {
        let base = s.base;
        if (s.key === "language_own") base = data.EDU?.value || 0;
        if (s.key === "dodge") base = Math.floor((data.DEX?.value || 0) / 2);

        initialSkills[s.key] = {
          value: data.skills?.[s.key]?.value || base,
          isOccupation: occSkills.includes(s.key) || s.key === "credit_rating",
        };
      });
      setSkills(initialSkills);
    }
  }, [data.skills, data.EDU?.value, data.DEX?.value, occSkillsStr, skills]);

  useEffect(() => {
    if (Object.keys(skills).length === 0) return;

    let oSpent = 0;
    let pSpent = 0;

    Object.keys(skills).forEach((key) => {
      const s = SKILL_CATALOGUE.find((sk) => sk.key === key);
      let base = s?.base || 0;
      if (key === "language_own") base = data.EDU?.value || 0;
      if (key === "dodge") base = Math.floor((data.DEX?.value || 0) / 2);

      const diff = skills[key].value - base;
      if (diff > 0) {
        if (skills[key].isOccupation) {
          oSpent += diff;
        } else {
          pSpent += diff;
        }
      }
    });

    setOccSpent(oSpent);
    setPersSpent(pSpent);

    const valid = oSpent <= occPointsTotal && pSpent <= persPointsTotal;
    setIsValid(valid);

    if (valid) {
      updateData({
        skills: Object.keys(skills).reduce(
          (acc, key) => ({
            ...acc,
            [key]: {
              base: SKILL_CATALOGUE.find((sk) => sk.key === key)?.base || 0,
              value: skills[key].value,
              checked: false,
              isOccupation: skills[key].isOccupation,
            },
          }),
          {},
        ),
        occupationPointsSpent: oSpent,
        personalPointsSpent: pSpent,
      });
    }
  }, [
    skills,
    occPointsTotal,
    persPointsTotal,
    data.EDU?.value,
    data.DEX?.value,
    setIsValid,
    updateData,
  ]);

  const handleSkillChange = (key: string, newValue: number) => {
    const s = SKILL_CATALOGUE.find((sk) => sk.key === key);
    let base = s?.base || 0;
    if (key === "language_own") base = data.EDU?.value || 0;
    if (key === "dodge") base = Math.floor((data.DEX?.value || 0) / 2);

    const val = Math.max(base, Math.min(99, newValue));
    setSkills((prev) => ({ ...prev, [key]: { ...prev[key], value: val } }));
  };

  const toggleOccupationSkill = (key: string) => {
    setSkills((prev) => ({
      ...prev,
      [key]: { ...prev[key], isOccupation: !prev[key].isOccupation },
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b-[3px] border-[var(--color-weird-black)] pb-2">
        <h3 className="font-['IM_Fell_English'] text-3xl text-[var(--color-weird-red)] italic font-bold">
          {t("step_skills")}
        </h3>
        <div className="flex gap-4 text-sm font-serif uppercase tracking-wider text-[var(--color-weird-black)] font-bold">
          <div
            className={`p-2 border-2 border-[var(--color-weird-black)] shadow-[2px_2px_0px_var(--color-weird-black)] ${occSpent > occPointsTotal ? "bg-red-200 text-red-900" : "bg-[var(--color-weird-paper)]"}`}
          >
            <span className="font-bold text-[var(--color-weird-red)]">{t("occ_points_label")}:</span> {occSpent} /{" "}
            {occPointsTotal}
          </div>
          <div
            className={`p-2 border-2 border-[var(--color-weird-black)] shadow-[2px_2px_0px_var(--color-weird-black)] ${persSpent > persPointsTotal ? "bg-red-200 text-red-900" : "bg-[var(--color-weird-paper)]"}`}
          >
            <span className="font-bold text-[var(--color-weird-red)]">{t("pers_points_label")}:</span> {persSpent} /{" "}
            {persPointsTotal}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
        {SKILL_CATALOGUE.map((skill) => {
          let base = skill.base;
          if (skill.key === "language_own") base = data.EDU?.value || 0;
          if (skill.key === "dodge")
            base = Math.floor((data.DEX?.value || 0) / 2);

          const isOcc = !!skills[skill.key]?.isOccupation;
          const val = skills[skill.key]?.value || base;

          return (
            <div
              key={skill.key}
              className={`flex items-center justify-between p-2 border-b-2 border-[var(--color-weird-black-alpha-20)] hover:bg-[var(--color-weird-black-alpha-10)] transition-colors ${isOcc ? "bg-[var(--color-weird-paper)] border-[var(--color-weird-black)] shadow-[2px_2px_0px_var(--color-weird-black)]" : ""}`}
            >
              <div className="flex items-center gap-2 flex-1">
                <input
                  type="checkbox"
                  checked={isOcc}
                  onChange={() => toggleOccupationSkill(skill.key)}
                  className="w-4 h-4 accent-[var(--color-weird-red)] cursor-pointer border-2 border-[var(--color-weird-black)]"
                  title="Mark as Occupation Skill"
                />
                <span
                  className="text-sm font-serif text-[var(--color-weird-black)] truncate font-bold"
                  title={t(`skills_${skill.key}`)}
                >
                  {t(`skills_${skill.key}`)}{" "}
                  <span className="text-xs text-[var(--color-weird-black)]/50">({base})</span>
                </span>
              </div>
              <PulpInput
                type="number"
                min={base}
                max="99"
                value={val}
                onChange={(e) =>
                  handleSkillChange(skill.key, parseInt(e.target.value) || base)
                }
                className="w-16 text-center text-sm font-['Courier_Prime'] font-bold border-b-2 border-[var(--color-weird-red)] bg-transparent h-8"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
