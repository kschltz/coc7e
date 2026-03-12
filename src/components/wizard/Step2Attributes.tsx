import { useEffect, useState } from "react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useWizardStore } from "../../store/investigatorStore";
import { PulpInput } from "../ui/PulpInput";
import { PulpButton } from "../ui/PulpButton";
import { PulpValidationTooltip } from "../ui/PulpValidationTooltip";
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

  const [attributes, setAttributes] = useState<Record<AttributeKey, string>>({
    STR: String(data.STR?.value || 50),
    CON: String(data.CON?.value || 50),
    SIZ: String(data.SIZ?.value || 50),
    DEX: String(data.DEX?.value || 50),
    APP: String(data.APP?.value || 50),
    INT: String(data.INT?.value || 50),
    POW: String(data.POW?.value || 50),
    EDU: String(data.EDU?.value || 50),
  });

  const [luck, setLuck] = useState(String(data.luck || 50));

  const parsedAttributes = ATTRIBUTES.reduce(
    (acc, attr) => ({ ...acc, [attr]: Number(attributes[attr]) }),
    {} as Record<AttributeKey, number>,
  );
  const parsedLuck = Number(luck);

  const getAttributeError = (value: string) => {
    if (value.trim() === "") {
      return t("validation_required_number");
    }

    const parsed = Number(value);
    if (!Number.isFinite(parsed)) {
      return t("validation_required_number");
    }

    if (parsed < 15 || parsed > 99) {
      return t("validation_range", { min: 15, max: 99 });
    }

    return "";
  };

  useEffect(() => {
    const nextParsedAttributes = ATTRIBUTES.reduce(
      (acc, attr) => ({ ...acc, [attr]: Number(attributes[attr]) }),
      {} as Record<AttributeKey, number>,
    );
    const nextParsedLuck = Number(luck);

    const valid =
      Object.values(nextParsedAttributes).every(
        (v: number) => Number.isFinite(v) && v >= 15 && v <= 99,
      ) &&
      Number.isFinite(nextParsedLuck) &&
      nextParsedLuck >= 15 &&
      nextParsedLuck <= 99;
    setIsValid(valid);
    if (valid) {
      updateData({
        STR: {
          value: nextParsedAttributes.STR,
          half: Math.floor(nextParsedAttributes.STR / 2),
          fifth: Math.floor(nextParsedAttributes.STR / 5),
        },
        CON: {
          value: nextParsedAttributes.CON,
          half: Math.floor(nextParsedAttributes.CON / 2),
          fifth: Math.floor(nextParsedAttributes.CON / 5),
        },
        SIZ: {
          value: nextParsedAttributes.SIZ,
          half: Math.floor(nextParsedAttributes.SIZ / 2),
          fifth: Math.floor(nextParsedAttributes.SIZ / 5),
        },
        DEX: {
          value: nextParsedAttributes.DEX,
          half: Math.floor(nextParsedAttributes.DEX / 2),
          fifth: Math.floor(nextParsedAttributes.DEX / 5),
        },
        APP: {
          value: nextParsedAttributes.APP,
          half: Math.floor(nextParsedAttributes.APP / 2),
          fifth: Math.floor(nextParsedAttributes.APP / 5),
        },
        INT: {
          value: nextParsedAttributes.INT,
          half: Math.floor(nextParsedAttributes.INT / 2),
          fifth: Math.floor(nextParsedAttributes.INT / 5),
        },
        POW: {
          value: nextParsedAttributes.POW,
          half: Math.floor(nextParsedAttributes.POW / 2),
          fifth: Math.floor(nextParsedAttributes.POW / 5),
        },
        EDU: {
          value: nextParsedAttributes.EDU,
          half: Math.floor(nextParsedAttributes.EDU / 2),
          fifth: Math.floor(nextParsedAttributes.EDU / 5),
        },
        luck: nextParsedLuck,
        startingLuck: nextParsedLuck,
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
      STR: String(roll3D6x5()),
      CON: String(roll3D6x5()),
      DEX: String(roll3D6x5()),
      APP: String(roll3D6x5()),
      POW: String(roll3D6x5()),
      SIZ: String(roll2D6plus6x5()),
      INT: String(roll2D6plus6x5()),
      EDU: String(roll2D6plus6x5()),
    });
    setLuck(String(roll3D6x5()));
  };

  const luckError = getAttributeError(luck ?? "");
  const hasValidationErrors =
    ATTRIBUTES.some((attr) => getAttributeError(attributes[attr] ?? "")) ||
    !!luckError;

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
      {hasValidationErrors && (
        <p className="text-xs font-serif text-[var(--color-weird-red)] font-bold">
          {t("validation_fix_fields")}
        </p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {ATTRIBUTES.map((attr) => {
          const attrError = getAttributeError(attributes[attr] ?? "");

          return (
            <div
              key={attr}
              className="space-y-2 bg-[var(--color-weird-paper)] p-4 border-2 border-[var(--color-weird-black)] shadow-[4px_4px_0px_var(--color-weird-black)]"
            >
              <label className="text-sm font-serif uppercase tracking-wider text-[var(--color-weird-black)] block text-center font-bold">
                {t(attr.toLowerCase())}
              </label>
              <div className="relative">
                <PulpInput
                  type="number"
                  value={attributes[attr] ?? ""}
                  onChange={(e) =>
                    setAttributes({
                      ...attributes,
                      [attr]: e.target.value,
                    })
                  }
                  aria-invalid={!!attrError}
                  className={`text-center text-2xl font-['Courier_Prime'] font-bold border-b-2 bg-transparent h-12 ${
                    attrError
                      ? "border-b-[var(--color-weird-red)] border-[var(--color-weird-red)]"
                      : "border-b-[var(--color-weird-red)]"
                  }`}
                />
                <PulpValidationTooltip message={attrError} show={!!attrError} />
              </div>
              {attrError && (
                <p className="text-[10px] font-serif text-[var(--color-weird-red)] font-bold leading-tight min-h-4">
                  {attrError}
                </p>
              )}
              <div className="flex justify-between text-xs text-[var(--color-weird-black)]/70 font-['Courier_Prime'] px-2 font-bold">
                <span>{Math.floor((parsedAttributes[attr] || 0) / 2)}</span>
                <span>{Math.floor((parsedAttributes[attr] || 0) / 5)}</span>
              </div>
            </div>
          );
        })}

        <div className="space-y-2 bg-[var(--color-weird-paper)] p-4 border-2 border-[var(--color-weird-black)] shadow-[4px_4px_0px_var(--color-weird-black)]">
          <label className="text-sm font-serif uppercase tracking-wider text-[var(--color-weird-black)] block text-center font-bold">
            {t("luck")}
          </label>
          <div className="relative">
            <PulpInput
              type="number"
              value={luck ?? ""}
              onChange={(e) => setLuck(e.target.value)}
              aria-invalid={!!luckError}
              className={`text-center text-2xl font-['Courier_Prime'] font-bold border-b-2 bg-transparent h-12 ${
                luckError
                  ? "border-b-[var(--color-weird-red)] border-[var(--color-weird-red)]"
                  : "border-b-[var(--color-weird-red)]"
              }`}
            />
            <PulpValidationTooltip message={luckError} show={!!luckError} />
          </div>
          {luckError && (
            <p className="text-[10px] font-serif text-[var(--color-weird-red)] font-bold leading-tight min-h-4">
              {luckError}
            </p>
          )}
          <div className="flex justify-between text-xs text-[var(--color-weird-black)]/70 font-['Courier_Prime'] px-2 font-bold">
            <span>{Math.floor((parsedLuck || 0) / 2)}</span>
            <span>{Math.floor((parsedLuck || 0) / 5)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
