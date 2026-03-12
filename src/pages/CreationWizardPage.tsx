import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  useWizardStore,
  useInvestigatorStore,
} from "../store/investigatorStore";
import { PulpButton } from "../components/ui/PulpButton";
import { PulpDivider } from "../components/ui/PulpDivider";
import { createInvestigator } from "../application";
import { saveSheet } from "../adapters/fileAdapter";

// Wizard Steps
import { Step1Concept } from "../components/wizard/Step1Concept";
import { Step2Attributes } from "../components/wizard/Step2Attributes";
import { Step3Age } from "../components/wizard/Step3Age";
import { Step4Occupation } from "../components/wizard/Step4Occupation";
import { Step5Skills } from "../components/wizard/Step5Skills";
import { Step6Backstory } from "../components/wizard/Step6Backstory";
import { Step7Review } from "../components/wizard/Step7Review";

const STEPS = [
  "step_concept",
  "step_attributes",
  "step_age",
  "step_occupation",
  "step_skills",
  "step_backstory",
  "step_review",
];

export function CreationWizardPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { currentStep, nextStep, prevStep, setStep, data, isValid } =
    useWizardStore();
  const loadSheet = useInvestigatorStore((state) => state.loadSheet);

  const hasValueInRange = (value?: number, min = 15, max = 99) =>
    typeof value === "number" && Number.isFinite(value) && value >= min && value <= max;

  const isStepRawComplete = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return Boolean(data.name?.trim() && data.occupation?.trim());
      case 2:
        return (
          hasValueInRange(data.STR?.value) &&
          hasValueInRange(data.CON?.value) &&
          hasValueInRange(data.SIZ?.value) &&
          hasValueInRange(data.DEX?.value) &&
          hasValueInRange(data.APP?.value) &&
          hasValueInRange(data.INT?.value) &&
          hasValueInRange(data.POW?.value) &&
          hasValueInRange(data.EDU?.value) &&
          hasValueInRange(data.luck)
        );
      case 3:
        return hasValueInRange(data.age, 15, 90);
      case 4:
        return (
          typeof data.occupationPointsTotal === "number" &&
          Number.isFinite(data.occupationPointsTotal) &&
          typeof data.personalPointsTotal === "number" &&
          Number.isFinite(data.personalPointsTotal)
        );
      case 5:
        return (
          !!data.skills &&
          typeof data.occupationPointsSpent === "number" &&
          typeof data.personalPointsSpent === "number" &&
          typeof data.occupationPointsTotal === "number" &&
          typeof data.personalPointsTotal === "number" &&
          data.occupationPointsSpent <= data.occupationPointsTotal &&
          data.personalPointsSpent <= data.personalPointsTotal
        );
      case 6:
        return true;
      case 7:
        return true;
      default:
        return false;
    }
  };

  const completedSteps: boolean[] = [];
  for (let index = 0; index < STEPS.length; index += 1) {
    const stepNumber = index + 1;
    const previousComplete = index === 0 ? true : completedSteps[index - 1];
    completedSteps[index] = previousComplete && isStepRawComplete(stepNumber);
  }

  const firstIncompleteIndex = completedSteps.findIndex((isComplete) => !isComplete);
  const lastIncompleteStep = firstIncompleteIndex === -1 ? STEPS.length : firstIncompleteIndex + 1;

  const handleFinish = async () => {
    const sheet = createInvestigator(data);
    loadSheet(sheet);
    await saveSheet(sheet);
    navigate("/ficha");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Concept />;
      case 2:
        return <Step2Attributes />;
      case 3:
        return <Step3Age />;
      case 4:
        return <Step4Occupation />;
      case 5:
        return <Step5Skills />;
      case 6:
        return <Step6Backstory />;
      case 7:
        return <Step7Review />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-4">
      <div className="flex flex-col items-center mb-6">
        <h2 className="font-['Cinzel_Decorative'] text-4xl text-[var(--color-weird-red)] font-bold tracking-tighter drop-shadow-sm mb-6">
          {t("new_sheet")}
        </h2>
        <div className="flex flex-wrap justify-center gap-2 text-sm font-serif uppercase tracking-widest text-[var(--color-weird-black)]">
          {STEPS.map((step, index) => (
            <div key={step} className="flex items-center">
              {(() => {
                const stepNumber = index + 1;
                const isCurrent = currentStep === stepNumber;
                const isCompleted = completedSteps[index];
                const isLastIncomplete = stepNumber === lastIncompleteStep;
                const isClickable = isCompleted || isLastIncomplete;

                if (!isClickable) {
                  return (
                    <span
                      className="opacity-50 cursor-default"
                      aria-disabled="true"
                    >
                      {stepNumber}. {t(step)}
                    </span>
                  );
                }

                return (
                  <button
                    type="button"
                    onClick={() => setStep(stepNumber)}
                    aria-current={isCurrent ? "step" : undefined}
                    className={
                      isCurrent
                        ? "text-[var(--color-weird-red)] font-bold bg-[var(--color-weird-yellow)] px-2 py-1 border-2 border-[var(--color-weird-black)] shadow-[2px_2px_0px_var(--color-weird-black)]"
                        : "px-2 py-1 opacity-80 cursor-pointer border-2 border-transparent hover:border-[var(--color-weird-black-alpha-20)] hover:bg-[var(--color-weird-black-alpha-10)] focus-visible:outline-none focus-visible:border-[var(--color-weird-black-alpha-30)] focus-visible:bg-[var(--color-weird-black-alpha-10)]"
                    }
                    title={
                      isCompleted ? t("back") : undefined
                    }
                  >
                    {stepNumber}. {t(step)}
                  </button>
                );
              })()}
              {index < STEPS.length - 1 && (
                <span className="mx-2 opacity-30">/</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[var(--color-weird-paper)] p-8 border-[4px] border-[var(--color-weird-black)] shadow-[8px_8px_0px_var(--color-weird-black)] relative">
        <div className="absolute top-0 left-0 w-full h-2 bg-[var(--color-weird-red)] border-b-[3px] border-[var(--color-weird-black)]"></div>
        {renderStep()}
      </div>

      <PulpDivider className="my-8" />

      <div className="flex justify-between items-center">
        <PulpButton
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
        >
          {t("back")}
        </PulpButton>

        {currentStep < 7 ? (
          <PulpButton onClick={nextStep} disabled={!isValid}>
            {t("next")}
          </PulpButton>
        ) : (
          <PulpButton onClick={handleFinish} disabled={!isValid}>
            {t("save")}
          </PulpButton>
        )}
      </div>
    </div>
  );
}
