import React, { useEffect } from "react";
import { useWizardStore } from "../../store/investigatorStore";
import { PulpInput } from "../ui/PulpInput";
import { useTranslation } from "react-i18next";

export function Step6Backstory() {
  const { t } = useTranslation();
  const { data, updateData, setIsValid } = useWizardStore();

  useEffect(() => {
    setIsValid(true);
  }, [setIsValid]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    updateData({ [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6">
      <h3 className="font-serif text-3xl text-[var(--color-weird-paper)] italic border-b-[3px] border-[var(--color-weird-black)] pb-2 font-bold">
        {t("step_backstory")}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="text-sm font-serif uppercase tracking-wider text-[var(--color-weird-black)] font-bold">
            {t("personal_description")}
          </label>
          <textarea
            name="personalDescription"
            value={data.personalDescription || ""}
            onChange={handleChange}
            className="w-full h-24 bg-[var(--color-weird-paper)] border-2 border-[var(--color-weird-black)] p-2 text-sm font-serif text-[var(--color-weird-black)] focus-visible:outline-none focus-visible:border-[var(--color-weird-red)] resize-none font-bold"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-serif uppercase tracking-wider text-[var(--color-weird-black)] font-bold">
            {t("ideology_beliefs")}
          </label>
          <textarea
            name="ideology"
            value={data.ideology || ""}
            onChange={handleChange}
            className="w-full h-24 bg-[var(--color-weird-paper)] border-2 border-[var(--color-weird-black)] p-2 text-sm font-serif text-[var(--color-weird-black)] focus-visible:outline-none focus-visible:border-[var(--color-weird-red)] resize-none font-bold"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-serif uppercase tracking-wider text-[var(--color-weird-black)] font-bold">
            {t("significant_people")}
          </label>
          <textarea
            name="significantPeople"
            value={data.significantPeople || ""}
            onChange={handleChange}
            className="w-full h-24 bg-[var(--color-weird-paper)] border-2 border-[var(--color-weird-black)] p-2 text-sm font-serif text-[var(--color-weird-black)] focus-visible:outline-none focus-visible:border-[var(--color-weird-red)] resize-none font-bold"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-serif uppercase tracking-wider text-[var(--color-weird-black)] font-bold">
            {t("meaningful_locations")}
          </label>
          <textarea
            name="meaningfulLocations"
            value={data.meaningfulLocations || ""}
            onChange={handleChange}
            className="w-full h-24 bg-[var(--color-weird-paper)] border-2 border-[var(--color-weird-black)] p-2 text-sm font-serif text-[var(--color-weird-black)] focus-visible:outline-none focus-visible:border-[var(--color-weird-red)] resize-none font-bold"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-serif uppercase tracking-wider text-[var(--color-weird-black)] font-bold">
            {t("treasured_possessions")}
          </label>
          <textarea
            name="treasuredPossessions"
            value={data.treasuredPossessions || ""}
            onChange={handleChange}
            className="w-full h-24 bg-[var(--color-weird-paper)] border-2 border-[var(--color-weird-black)] p-2 text-sm font-serif text-[var(--color-weird-black)] focus-visible:outline-none focus-visible:border-[var(--color-weird-red)] resize-none font-bold"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-serif uppercase tracking-wider text-[var(--color-weird-black)] font-bold">
            {t("traits")}
          </label>
          <textarea
            name="traits"
            value={data.traits || ""}
            onChange={handleChange}
            className="w-full h-24 bg-[var(--color-weird-paper)] border-2 border-[var(--color-weird-black)] p-2 text-sm font-serif text-[var(--color-weird-black)] focus-visible:outline-none focus-visible:border-[var(--color-weird-red)] resize-none font-bold"
          />
        </div>
      </div>
    </div>
  );
}
