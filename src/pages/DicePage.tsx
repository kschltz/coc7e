import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useInvestigatorStore } from "../store/investigatorStore";
import { DiceRollerPanel } from "../components/dice/DiceRollerPanel";
import {
  ElderSign,
  TentacleCorner,
} from "../components/illustrations";

export function DicePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const sheet = useInvestigatorStore((state) => state.sheet);

  useEffect(() => {
    if (!sheet) {
      navigate("/");
    }
  }, [navigate, sheet]);

  if (!sheet) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto py-2 min-w-0">
      <div className="flex items-center gap-3 mb-4 border-b-2 border-[var(--color-weird-black)] pb-2 min-w-0">
        <button
          onClick={() => navigate("/ficha")}
          className="flex items-center gap-2 text-[var(--color-weird-black)] hover:text-[var(--color-weird-red)] transition-colors font-serif font-bold text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("dice_back_to_sheet")}
        </button>
      </div>

      <div className="relative mb-4 border-[3px] border-[var(--color-weird-paper)] p-6 bg-[var(--color-weird-teal)] outline-[3px] outline-[var(--color-weird-black)] overflow-hidden">
        {/* Decorative corners */}
        <TentacleCorner className="absolute top-0 left-0 w-16 h-16 md:w-24 md:h-24 text-[var(--color-weird-black)] opacity-15 pointer-events-none" />
        <TentacleCorner className="absolute top-0 right-0 w-16 h-16 md:w-24 md:h-24 text-[var(--color-weird-black)] opacity-15 pointer-events-none -scale-x-100" />

        {/* Elder signs flanking the title */}
        <ElderSign className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 text-[var(--color-weird-yellow)] opacity-20 pointer-events-none" />

        <div className="relative z-10">
          <h1 className="font-serif text-3xl md:text-4xl text-[var(--color-weird-black)] font-extrabold italic tracking-tight leading-none uppercase">
            {t("dice_title")}
          </h1>
          <p className="font-serif text-[var(--color-weird-paper)] text-base md:text-lg italic mt-2 font-bold">
            {t("dice_subtitle")}
          </p>
        </div>
      </div>

      <DiceRollerPanel sheet={sheet} />
    </div>
  );
}
