import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { PulpButton } from "../components/ui/PulpButton";
import { loadSheet } from "../adapters/fileAdapter";
import { useInvestigatorStore } from "../store/investigatorStore";
import { FileDown, FilePlus } from "lucide-react";

export function LandingPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const setSheet = useInvestigatorStore((state) => state.loadSheet);

  const handleLoad = async () => {
    try {
      const sheet = await loadSheet();
      setSheet(sheet);
      navigate("/ficha");
    } catch (err) {
      console.error(err);
      alert(t("load_error"));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6">
      <div className="text-center space-y-1 mb-2">
        <h1 
          className="font-['Cinzel_Decorative'] text-4xl md:text-6xl font-bold tracking-tighter text-[var(--color-weird-red)] uppercase leading-none"
          style={{
            textShadow: "2px 2px 0px var(--color-weird-black), 4px 4px 0px var(--color-weird-yellow)"
          }}
        >
          {t("app_title")}
        </h1>
        <p className="font-['IM_Fell_English'] italic text-lg md:text-xl text-[var(--color-weird-black)] tracking-[0.2em] font-bold">
          {t("investigator_sheet_subtitle")}
        </p>
      </div>

      <div className="text-center max-w-2xl mx-auto space-y-4 bg-[var(--color-weird-black)] p-6 border-[3px] border-[var(--color-weird-red)] shadow-[6px_6px_0px_var(--color-weird-yellow)]">
        <p className="font-['IM_Fell_English'] text-xl md:text-2xl text-[var(--color-weird-paper)] leading-relaxed font-bold italic">
          {t("lovecraft_quote")}
        </p>
        <p className="font-serif font-bold text-[var(--color-weird-yellow)] text-sm tracking-widest uppercase">
          {t("lovecraft_author")}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <Link to="/criar" className="flex-1">
          <PulpButton className="w-full py-3 text-base flex items-center justify-center gap-2">
            <FilePlus className="w-4 h-4" />
            {t("new_sheet")}
          </PulpButton>
        </Link>
        <PulpButton
          variant="outline"
          className="flex-1 py-3 text-base flex items-center justify-center gap-2"
          onClick={handleLoad}
        >
          <FileDown className="w-4 h-4" />
          {t("load_json")}
        </PulpButton>
      </div>
    </div>
  );
}
