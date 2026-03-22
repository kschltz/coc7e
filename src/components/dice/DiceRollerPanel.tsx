import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import DiceBox from "@3d-dice/dice-box";
import { AlertTriangle, CircleCheck, Flame, Skull, Sparkles, Target } from "lucide-react";
import { InvestigatorSheet, AttributeKey } from "../../domain/schema";
import { SKILL_CATALOGUE } from "../../domain/skills";
import { PulpButton } from "../ui/PulpButton";
import { PulpSelect } from "../ui/PulpSelect";
import { cn } from "../../lib/utils";

const ATTRIBUTE_KEYS: AttributeKey[] = ["STR", "CON", "SIZ", "DEX", "APP", "INT", "POW", "EDU"];

type OutcomeTier = "critical" | "extreme" | "hard" | "regular" | "failure" | "fumble";
type TargetSource = "attribute" | "skill";

interface DiceRollerPanelProps {
  sheet: InvestigatorSheet;
}

interface OutcomeData {
  tier: OutcomeTier;
  success: boolean;
}

function normalizePercentileValue(rawValue: number): number {
  if (rawValue <= 0) {
    return 100;
  }

  if (rawValue > 100) {
    return ((rawValue - 1) % 100) + 1;
  }

  return Math.round(rawValue);
}

function extractRollValue(results: unknown): number | null {
  if (!Array.isArray(results) || results.length === 0) {
    return null;
  }

  const firstGroup = results[0];
  if (!firstGroup || typeof firstGroup !== "object") {
    return null;
  }

  const groupValue = (firstGroup as { value?: unknown }).value;
  if (typeof groupValue === "number" && Number.isFinite(groupValue)) {
    return normalizePercentileValue(groupValue);
  }

  const rolls = (firstGroup as { rolls?: Array<{ value?: unknown }> }).rolls;
  if (!Array.isArray(rolls) || rolls.length === 0) {
    return null;
  }

  const firstDie = rolls[0];
  const dieValue = firstDie?.value;
  if (typeof dieValue !== "number" || !Number.isFinite(dieValue)) {
    return null;
  }

  return normalizePercentileValue(dieValue);
}

function evaluateCocTier(roll: number, targetValue: number): OutcomeData {
  const hardThreshold = Math.floor(targetValue / 2);
  const extremeThreshold = Math.floor(targetValue / 5);
  const isFumble = roll === 100 || (targetValue < 50 && roll >= 96);

  if (roll === 1) {
    return { tier: "critical", success: true };
  }

  if (isFumble) {
    return { tier: "fumble", success: false };
  }

  if (roll <= extremeThreshold) {
    return { tier: "extreme", success: true };
  }

  if (roll <= hardThreshold) {
    return { tier: "hard", success: true };
  }

  if (roll <= targetValue) {
    return { tier: "regular", success: true };
  }

  return { tier: "failure", success: false };
}

function randomRoll(): number {
  return Math.floor(Math.random() * 100) + 1;
}

export function DiceRollerPanel({ sheet }: DiceRollerPanelProps) {
  const { t } = useTranslation();
  const diceRef = useRef<DiceBox | null>(null);

  const [isReady, setIsReady] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const [engineFallback, setEngineFallback] = useState(false);
  const [source, setSource] = useState<TargetSource>("attribute");
  const [targetKey, setTargetKey] = useState<string>(ATTRIBUTE_KEYS[0]);
  const [lastRoll, setLastRoll] = useState<number | null>(null);
  const [outcome, setOutcome] = useState<OutcomeData | null>(null);

  const skillOptions = useMemo(() => {
    return SKILL_CATALOGUE.filter((skill) => Boolean(sheet.skills[skill.key])).map((skill) => ({
      key: skill.key,
      label: t(`skills_${skill.key}`),
      value: sheet.skills[skill.key].value,
    }));
  }, [sheet.skills, t]);

  const attributeOptions = useMemo(() => {
    return ATTRIBUTE_KEYS.map((key) => ({
      key,
      label: t(key.toLowerCase()),
      value: sheet[key].value,
      half: sheet[key].half,
      fifth: sheet[key].fifth,
    }));
  }, [sheet, t]);

  const targetOptions = source === "attribute" ? attributeOptions : skillOptions;
  const selectedTarget = targetOptions.find((option) => option.key === targetKey) ?? targetOptions[0] ?? null;
  const selectedValue = selectedTarget?.value ?? 0;
  const selectedHalf = source === "attribute"
    ? (selectedTarget as { half: number }).half
    : Math.floor(selectedValue / 2);
  const selectedFifth = source === "attribute"
    ? (selectedTarget as { fifth: number }).fifth
    : Math.floor(selectedValue / 5);

  useEffect(() => {
    if (!targetOptions.length) {
      setTargetKey("");
      return;
    }

    const isStillValid = targetOptions.some((option) => option.key === targetKey);
    if (!isStillValid) {
      setTargetKey(targetOptions[0].key);
    }
  }, [targetKey, targetOptions]);

  useEffect(() => {
    let isCancelled = false;
    const dice = new DiceBox("#coc-dice-box", {
      assetPath: "/assets/",
      scale: 23,
    });

    dice
      .init()
      .then(() => {
        if (isCancelled) {
          return;
        }

        diceRef.current = dice;
        setIsReady(true);
        setEngineFallback(false);
      })
      .catch((error: unknown) => {
        console.error(error);
        if (!isCancelled) {
          setEngineFallback(true);
          setIsReady(false);
        }
      });

    return () => {
      isCancelled = true;
      if (diceRef.current) {
        diceRef.current.clear();
        diceRef.current.destroy?.();
        diceRef.current = null;
      }
    };
  }, []);

  const handleRoll = async () => {
    if (!selectedTarget) {
      return;
    }

    setIsRolling(true);

    let rolledValue: number | null = null;

    try {
      if (diceRef.current && isReady) {
        const results = await diceRef.current.roll("1d100", { newStartPoint: true });
        rolledValue = extractRollValue(results);
      }
    } catch (error) {
      console.error(error);
      setEngineFallback(true);
    }

    if (rolledValue === null) {
      rolledValue = randomRoll();
    }

    setLastRoll(rolledValue);
    setOutcome(evaluateCocTier(rolledValue, selectedValue));
    setIsRolling(false);
  };

  const outcomeStyle =
    outcome?.tier === "critical"
      ? "dice-outcome-critical"
      : outcome?.tier === "extreme"
        ? "dice-outcome-extreme"
        : outcome?.tier === "hard"
          ? "dice-outcome-hard"
          : outcome?.tier === "regular"
            ? "dice-outcome-regular"
            : outcome?.tier === "fumble"
              ? "dice-outcome-fumble"
              : "dice-outcome-failure";

  const OutcomeIcon =
    outcome?.tier === "critical"
      ? Sparkles
      : outcome?.tier === "extreme"
        ? Flame
        : outcome?.tier === "hard" || outcome?.tier === "regular"
          ? CircleCheck
          : outcome?.tier === "fumble"
            ? Skull
            : AlertTriangle;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      <section className="border-[3px] border-[var(--color-weird-black)] p-4 bg-[var(--color-weird-paper)] relative">
        <div className="absolute top-0 left-0 w-full h-2 bg-[var(--color-weird-red)] border-b-[3px] border-[var(--color-weird-black)]"></div>
        <h2 className="font-serif text-2xl text-[var(--color-weird-red)] italic mb-4 border-b-[3px] border-[var(--color-weird-black)] pb-1 font-bold mt-1">
          {t("dice_roll_setup")}
        </h2>

        <div className="space-y-3">
          <div>
            <label className="text-[10px] font-serif uppercase tracking-wider text-[var(--color-weird-black)] block mb-1 font-bold">
              {t("dice_target_type")}
            </label>
            <PulpSelect
              value={source}
              onChange={(event) => setSource(event.target.value as TargetSource)}
              data-testid="roll-source-select"
            >
              <option value="attribute">{t("dice_target_attribute")}</option>
              <option value="skill">{t("dice_target_skill")}</option>
            </PulpSelect>
          </div>

          <div>
            <label className="text-[10px] font-serif uppercase tracking-wider text-[var(--color-weird-black)] block mb-1 font-bold">
              {t("dice_target_value")}
            </label>
            <PulpSelect
              value={selectedTarget?.key ?? ""}
              onChange={(event) => setTargetKey(event.target.value)}
              disabled={!targetOptions.length}
              data-testid="roll-target-select"
            >
              {targetOptions.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.label} ({option.value})
                </option>
              ))}
            </PulpSelect>
          </div>

          <div className="border-2 border-[var(--color-weird-black)] bg-[var(--color-weird-black)] text-[var(--color-weird-paper)] px-3 py-2">
            <p className="font-serif italic text-lg text-[var(--color-weird-yellow)] font-bold">
              {selectedTarget?.label ?? t("dice_no_target")}
            </p>
            <div className="mt-2 grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-[9px] uppercase tracking-widest text-[var(--color-weird-paper)] font-bold">
                  {t("dice_threshold_regular")}
                </p>
                <p className="font-['Courier_Prime'] text-xl font-bold">{selectedValue}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-widest text-[var(--color-weird-paper)] font-bold">
                  {t("dice_threshold_hard")}
                </p>
                <p className="font-['Courier_Prime'] text-xl font-bold">{selectedHalf}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-widest text-[var(--color-weird-paper)] font-bold">
                  {t("dice_threshold_extreme")}
                </p>
                <p className="font-['Courier_Prime'] text-xl font-bold">{selectedFifth}</p>
              </div>
            </div>
          </div>

          <PulpButton
            onClick={handleRoll}
            disabled={!selectedTarget || isRolling}
            className="w-full gap-2"
            data-testid="roll-d100"
          >
            <Target className="h-4 w-4" />
            {isRolling ? t("dice_rolling") : t("dice_roll_d100")}
          </PulpButton>

          {engineFallback && (
            <p className="text-xs font-serif italic text-[var(--color-weird-darkred)] font-bold">
              {t("dice_engine_fallback")}
            </p>
          )}
        </div>
      </section>

      <section className="border-[3px] border-[var(--color-weird-black)] p-4 bg-[var(--color-weird-paper)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-[var(--color-weird-red)] border-b-[3px] border-[var(--color-weird-black)]"></div>
        <h2 className="font-serif text-2xl text-[var(--color-weird-red)] italic mb-4 border-b-[3px] border-[var(--color-weird-black)] pb-1 font-bold mt-1">
          {t("dice_visual_roll")}
        </h2>

        <div
          id="coc-dice-box"
          className="relative h-72 border-2 border-[var(--color-weird-black)] bg-[radial-gradient(circle_at_20%_20%,rgba(217,37,37,0.25),transparent_55%),radial-gradient(circle_at_80%_90%,rgba(242,201,76,0.2),transparent_50%),linear-gradient(130deg,#25190f_0%,#130d08_100%)]"
        >
          {!isReady && (
            <div className="absolute inset-0 flex items-center justify-center text-center p-4 bg-[rgba(17,17,17,0.65)]">
              <p className="font-serif italic text-[var(--color-weird-paper)] text-xl font-bold">
                {t("dice_engine_loading")}
              </p>
            </div>
          )}
        </div>

        <div
          className={cn(
            "mt-3 border-2 border-[var(--color-weird-black)] px-3 py-2 transition-all min-h-20",
            outcome ? outcomeStyle : "bg-[var(--color-weird-paper)]",
          )}
          data-testid="roll-result-card"
        >
          {!outcome || lastRoll === null ? (
            <p className="font-serif text-sm italic text-[var(--color-weird-black-alpha-70)] font-bold">
              {t("dice_result_waiting")}
            </p>
          ) : (
            <div className="flex items-start gap-2">
              <OutcomeIcon className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs uppercase tracking-widest font-bold">
                  {outcome.success ? t("dice_result_success") : t("dice_result_failure")}
                </p>
                <p className="font-serif text-xl italic font-bold">
                  {t(`dice_outcome_${outcome.tier}`)}
                </p>
                <p className="font-['Courier_Prime'] text-base font-bold">
                  {t("dice_last_roll_value", { roll: lastRoll, target: selectedValue })}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
