import { useEffect, useState } from "react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useWizardStore } from "../../store/investigatorStore";
import { PulpInput } from "../ui/PulpInput";
import { PulpButton } from "../ui/PulpButton";
import { AttributeKey } from "../../domain/schema";

const ATTRIBUTES: AttributeKey[] = [
  "STR",
  "CON",
  "SIZ",
  "DEX",
  "APP",
  "INT",
  "POW",
  "EDU",
];

export function Step2Attributes() {
  const { t } = useTranslation();
  const { data, updateData, setIsValid } = useWizardStore();

  const [attributes, setAttributes] = useState<Record<AttributeKey, number>>({
    STR: data.STR?.value || 50,
    CON: data.CON?.value || 50,
    SIZ: data.SIZ?.value || 50,
    DEX: data.DEX?.value || 50,
    APP: data.APP?.value || 50,
    INT: data.INT?.value || 50,
    POW: data.POW?.value || 50,
    EDU: data.EDU?.value || 50,
  });

  const [luck, setLuck] = useState(data.luck || 50);

  useEffect(() => {
    const valid =
      Object.values(attributes).every((v: any) => v >= 15 && v <= 99) &&
      luck >= 15 &&
      luck <= 99;
    setIsValid(valid);
    if (valid) {
      updateData({
        STR: {
          value: attributes.STR,
          half: Math.floor(attributes.STR / 2),
          fifth: Math.floor(attributes.STR / 5),
        },
        CON: {
          value: attributes.CON,
          half: Math.floor(attributes.CON / 2),
          fifth: Math.floor(attributes.CON / 5),
        },
        SIZ: {
          value: attributes.SIZ,
          half: Math.floor(attributes.SIZ / 2),
          fifth: Math.floor(attributes.SIZ / 5),
        },
        DEX: {
          value: attributes.DEX,
          half: Math.floor(attributes.DEX / 2),
          fifth: Math.floor(attributes.DEX / 5),
        },
        APP: {
          value: attributes.APP,
          half: Math.floor(attributes.APP / 2),
          fifth: Math.floor(attributes.APP / 5),
        },
        INT: {
          value: attributes.INT,
          half: Math.floor(attributes.INT / 2),
          fifth: Math.floor(attributes.INT / 5),
        },
        POW: {
          value: attributes.POW,
          half: Math.floor(attributes.POW / 2),
          fifth: Math.floor(attributes.POW / 5),
        },
        EDU: {
          value: attributes.EDU,
          half: Math.floor(attributes.EDU / 2),
          fifth: Math.floor(attributes.EDU / 5),
        },
        luck,
        startingLuck: luck,
      });
    }
  }, [attributes, luck, setIsValid, updateData]);

  const roll3D6x5 = () => {
    let total = 0;
    for (let i = 0; i < 3; i++) total += Math.floor(Math.random() * 6) + 1;
    return total * 5;
  };

  const roll2D6plus6x5 = () => {
    let total = 6;
    for (let i = 0; i < 2; i++) total += Math.floor(Math.random() * 6) + 1;
    return total * 5;
  };

  const handleRollAll = () => {
    setAttributes({
      STR: roll3D6x5(),
      CON: roll3D6x5(),
      DEX: roll3D6x5(),
      APP: roll3D6x5(),
      POW: roll3D6x5(),
      SIZ: roll2D6plus6x5(),
      INT: roll2D6plus6x5(),
      EDU: roll2D6plus6x5(),
    });
    setLuck(roll3D6x5());
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b-[3px] border-[var(--color-weird-black)] pb-2">
        <h3 className="font-['IM_Fell_English'] text-3xl text-[var(--color-weird-red)] italic font-bold">
          {t("step_attributes")}
        </h3>
        <PulpButton
          variant="outline"
          onClick={handleRollAll}
          className="text-xs py-1 px-3"
        >
          {t("roll_attributes")}
        </PulpButton>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {ATTRIBUTES.map((attr) => (
          <div
            key={attr}
            className="space-y-2 bg-[var(--color-weird-paper)] p-4 border-2 border-[var(--color-weird-black)] shadow-[4px_4px_0px_var(--color-weird-black)]"
          >
            <label className="text-sm font-serif uppercase tracking-wider text-[var(--color-weird-black)] block text-center font-bold">
              {t(attr.toLowerCase())}
            </label>
            <PulpInput
              type="number"
              min="15"
              max="99"
              value={attributes[attr] ?? 0}
              onChange={(e) =>
                setAttributes({
                  ...attributes,
                  [attr]: parseInt(e.target.value) || 0,
                })
              }
              className="text-center text-2xl font-['Courier_Prime'] font-bold border-b-2 border-[var(--color-weird-red)] bg-transparent h-12"
            />
            <div className="flex justify-between text-xs text-[var(--color-weird-black)]/70 font-['Courier_Prime'] px-2 font-bold">
              <span>{Math.floor(attributes[attr] / 2)}</span>
              <span>{Math.floor(attributes[attr] / 5)}</span>
            </div>
          </div>
        ))}

        <div className="space-y-2 bg-[var(--color-weird-paper)] p-4 border-2 border-[var(--color-weird-black)] shadow-[4px_4px_0px_var(--color-weird-black)]">
          <label className="text-sm font-serif uppercase tracking-wider text-[var(--color-weird-black)] block text-center font-bold">
            {t("luck")}
          </label>
          <PulpInput
            type="number"
            min="15"
            max="99"
            value={luck ?? 0}
            onChange={(e) => setLuck(parseInt(e.target.value) || 0)}
            className="text-center text-2xl font-['Courier_Prime'] font-bold border-b-2 border-[var(--color-weird-red)] bg-transparent h-12"
          />
          <div className="flex justify-between text-xs text-[var(--color-weird-black)]/70 font-['Courier_Prime'] px-2 font-bold">
            <span>{Math.floor(luck / 2)}</span>
            <span>{Math.floor(luck / 5)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
