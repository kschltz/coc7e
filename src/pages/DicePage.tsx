import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useInvestigatorStore } from "../store/investigatorStore";
import { DiceRollerPanel } from "../components/dice/DiceRollerPanel";

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
      <div className="flex items-center gap-3 mb-4 border-b-2 border-[var(--color-weird-black-alpha-20)] pb-2 min-w-0">
        <button
          onClick={() => navigate("/ficha")}
          className="flex items-center gap-2 text-[var(--color-weird-black)] hover:text-[var(--color-weird-red)] transition-colors font-serif font-bold text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("dice_back_to_sheet")}
        </button>
      </div>

      <div className="mb-4 border-[3px] border-[var(--color-weird-black)] p-4 bg-[var(--color-weird-paper)] shadow-[6px_6px_0px_var(--color-weird-black)] relative">
        <div className="absolute top-0 left-0 w-full h-2 bg-[var(--color-weird-red)] border-b-[3px] border-[var(--color-weird-black)]"></div>
        <h1 className="font-['Cinzel_Decorative'] text-3xl md:text-4xl text-[var(--color-weird-red)] font-bold tracking-tighter leading-none mt-1">
          {t("dice_title")}
        </h1>
        <p className="font-['IM_Fell_English'] text-[var(--color-weird-black)] text-base md:text-lg italic mt-2 font-bold">
          {t("dice_subtitle")}
        </p>
      </div>

      <DiceRollerPanel sheet={sheet} />
    </div>
  );
}
