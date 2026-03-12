import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useWizardStore } from "../../store/investigatorStore";
import { SKILL_CATALOGUE } from "../../domain/skills";
import { OCCUPATIONS } from "../../domain/occupations";
import { PulpInput } from "../ui/PulpInput";
import { PulpValidationTooltip } from "../ui/PulpValidationTooltip";

export function Step5Skills() {
  const { t } = useTranslation();
  const { data, updateData, setIsValid } = useWizardStore();

  const [skills, setSkills] = useState<
    Record<string, { value: number; input: string; isOccupation: boolean }>
  >({});
  const [occSpent, setOccSpent] = useState(0);
  const [persSpent, setPersSpent] = useState(0);

  const occupation = OCCUPATIONS.find((o) => o.key === data.occupation);
  const occSkills = occupation?.skills || [];
  const occPointsTotal = data.occupationPointsTotal || 0;
  const persPointsTotal = data.personalPointsTotal || 0;
  const skillRatios = occupation?.skillRatios || {};
  const hasRatios = Object.keys(skillRatios).length > 0;

  const getBaseValue = (key: string) => {
    const s = SKILL_CATALOGUE.find((sk) => sk.key === key);
    let base = s?.base || 0;
    if (key === "language_own") base = data.EDU?.value || 0;
    if (key === "dodge") base = Math.floor((data.DEX?.value || 0) / 2);
    return base;
  };

  const getSkillError = (base: number, input: string) => {
    if (input.trim() === "") {
      return t("validation_required_number");
    }

    const parsed = Number(input);
    if (!Number.isFinite(parsed)) {
      return t("validation_required_number");
    }

    if (parsed < base || parsed > 99) {
      return t("validation_range", { min: base, max: 99 });
    }

    return "";
  };

  const handleAutoDistribute = () => {
    if (!hasRatios || occPointsTotal === 0) return;

    const newSkills = { ...skills };

    const sortedRatios = Object.entries(skillRatios)
      .filter(([key]) => occSkills.includes(key))
      .sort((a, b) => b[1] - a[1]);

    let remainingPoints = occPointsTotal;
    const allocated: Record<string, number> = {};

    sortedRatios.forEach(([key, ratio], index) => {
      const base = getBaseValue(key);
      const isLast = index === sortedRatios.length - 1;
      let points: number;

      if (isLast) {
        points = remainingPoints;
      } else {
        points = Math.round(occPointsTotal * (ratio / 100));
        points = Math.min(points, remainingPoints - (sortedRatios.length - index - 1));
        points = Math.max(points, 0);
      }

      allocated[key] = points;
      remainingPoints -= points;
    });

    Object.entries(allocated).forEach(([key, points]) => {
      const base = getBaseValue(key);
      const nextValue = Math.min(base + points, 99);
      newSkills[key] = {
        ...newSkills[key],
        value: nextValue,
        input: String(nextValue),
        isOccupation: true,
      };
    });

    setSkills(newSkills);
  };

  const occSkillsStr = occSkills.join(",");

  useEffect(() => {
    // Initialize skills if not present
    if (Object.keys(skills).length === 0) {
      const initialSkills: Record<
        string,
        { value: number; input: string; isOccupation: boolean }
      > = {};
      SKILL_CATALOGUE.forEach((s) => {
        let base = s.base;
        if (s.key === "language_own") base = data.EDU?.value || 0;
        if (s.key === "dodge") base = Math.floor((data.DEX?.value || 0) / 2);

        initialSkills[s.key] = {
          value: data.skills?.[s.key]?.value || base,
          input: String(data.skills?.[s.key]?.value || base),
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

    const valuesValid = Object.keys(skills).every((key) => {
      const raw = skills[key].input;
      const parsed = Number(raw);
      if (!Number.isFinite(parsed)) {
        return false;
      }

      const s = SKILL_CATALOGUE.find((sk) => sk.key === key);
      let base = s?.base || 0;
      if (key === "language_own") base = data.EDU?.value || 0;
      if (key === "dodge") base = Math.floor((data.DEX?.value || 0) / 2);

      return parsed >= base && parsed <= 99;
    });

    const valid = valuesValid && oSpent <= occPointsTotal && pSpent <= persPointsTotal;
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
    setSkills((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        value: Number.isFinite(newValue) ? newValue : prev[key].value,
        input: Number.isFinite(newValue) ? String(newValue) : prev[key].input,
      },
    }));
  };

  const handleSkillInputChange = (key: string, newValue: string) => {
    setSkills((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        input: newValue,
        value: Number.isFinite(Number(newValue)) ? Number(newValue) : prev[key].value,
      },
    }));
  };

  const toggleOccupationSkill = (key: string) => {
    setSkills((prev) => ({
      ...prev,
      [key]: { ...prev[key], isOccupation: !prev[key].isOccupation },
    }));
  };

  const hasPointErrors = occSpent > occPointsTotal || persSpent > persPointsTotal;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-[3px] border-[var(--color-weird-black)] pb-2 gap-2">
        <h3 className="font-['IM_Fell_English'] text-3xl text-[var(--color-weird-red)] italic font-bold">
          {t("step_skills")}
        </h3>
        <div className="flex flex-wrap gap-2 text-sm font-serif uppercase tracking-wider text-[var(--color-weird-black)] font-bold">
          <div
            className={`p-2 border-2 border-[var(--color-weird-black)] shadow-[2px_2px_0px_var(--color-weird-black)] ${occSpent > occPointsTotal ? "bg-red-200 text-red-900" : "bg-[var(--color-weird-paper)]"}`}
            title={
              occSpent > occPointsTotal
                ? t("validation_occ_points_exceeded", {
                    count: occSpent - occPointsTotal,
                  })
                : undefined
            }
          >
            <span className="font-bold text-[var(--color-weird-red)]">{t("occ_points_label")}:</span> {occSpent} /{" "}
            {occPointsTotal}
          </div>
          <div
            className={`p-2 border-2 border-[var(--color-weird-black)] shadow-[2px_2px_0px_var(--color-weird-black)] ${persSpent > persPointsTotal ? "bg-red-200 text-red-900" : "bg-[var(--color-weird-paper)]"}`}
            title={
              persSpent > persPointsTotal
                ? t("validation_pers_points_exceeded", {
                    count: persSpent - persPointsTotal,
                  })
                : undefined
            }
          >
            <span className="font-bold text-[var(--color-weird-red)]">{t("pers_points_label")}:</span> {persSpent} /{" "}
            {persPointsTotal}
          </div>
          {hasRatios && (
            <button
              onClick={handleAutoDistribute}
              disabled={occSpent >= occPointsTotal}
              className="px-2 py-2 border-2 border-[var(--color-weird-black)] shadow-[2px_2px_0px_var(--color-weird-black)] bg-[var(--color-weird-paper)] hover:bg-[var(--color-weird-black-alpha-10)] disabled:opacity-50 disabled:cursor-not-allowed text-xs uppercase whitespace-nowrap"
              title={t("suggest_allocation_title")}
            >
              {t("suggest_allocation")}
            </button>
          )}
        </div>
      </div>
      {hasPointErrors && (
        <p className="text-xs font-serif text-[var(--color-weird-red)] font-bold">
          {t("validation_fix_fields")}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
        {SKILL_CATALOGUE.map((skill) => {
          let base = skill.base;
          if (skill.key === "language_own") base = data.EDU?.value || 0;
          if (skill.key === "dodge")
            base = Math.floor((data.DEX?.value || 0) / 2);

          const isOcc = !!skills[skill.key]?.isOccupation;
          const val = skills[skill.key]?.value || base;
          const input = skills[skill.key]?.input ?? String(val);
          const skillError = getSkillError(base, input);
          const ratio = isOcc && hasRatios ? skillRatios[skill.key] : null;

          return (
            <div
              key={skill.key}
              className={`flex items-center justify-between p-2 border-b-2 border-[var(--color-weird-black-alpha-20)] hover:bg-[var(--color-weird-black-alpha-10)] transition-colors ${isOcc ? "bg-[var(--color-weird-paper)] border-[var(--color-weird-black)] shadow-[2px_2px_0px_var(--color-weird-black)]" : ""}`}
            >
              <div className="flex items-center gap-1 sm:gap-2 flex-1 min-w-0">
                <input
                  type="checkbox"
                  checked={isOcc}
                  onChange={() => toggleOccupationSkill(skill.key)}
                  className="w-4 h-4 flex-shrink-0 accent-[var(--color-weird-red)] cursor-pointer border-2 border-[var(--color-weird-black)]"
                  title="Mark as Occupation Skill"
                />
                <div className="flex flex-col sm:flex-row sm:items-center gap-0 sm:gap-1 min-w-0">
                  <span
                    className="text-sm font-serif text-[var(--color-weird-black)] truncate font-bold"
                    title={t(`skills_${skill.key}`)}
                  >
                    {t(`skills_${skill.key}`)}
                  </span>
                  <span className="text-xs text-[var(--color-weird-black)]/50">({base})</span>
                  {ratio !== null && ratio > 0 && (
                    <span className="text-xs text-[var(--color-weird-red)] font-bold whitespace-nowrap">
                      {ratio}%
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end gap-0.5">
                <div className="relative">
                  <PulpInput
                    type="number"
                    value={input}
                    onChange={(e) =>
                      handleSkillInputChange(skill.key, e.target.value)
                    }
                    onBlur={() =>
                      handleSkillChange(skill.key, Number(skills[skill.key]?.input))
                    }
                    aria-invalid={!!skillError}
                    className={`w-16 text-center text-sm font-['Courier_Prime'] font-bold border-b-2 bg-transparent h-8 ${
                      skillError
                        ? "border-b-[var(--color-weird-red)] border-[var(--color-weird-red)]"
                        : "border-b-[var(--color-weird-red)]"
                    }`}
                  />
                  <PulpValidationTooltip message={skillError} show={!!skillError} />
                </div>
                {skillError && (
                  <span className="text-[10px] leading-tight font-serif text-[var(--color-weird-red)] font-bold text-right max-w-28">
                    {skillError}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
