import { ReactNode, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useInvestigatorStore } from "../../store/investigatorStore";

export function AppShell({ children }: { children: ReactNode }) {
  const isDirty = useInvestigatorStore((state) => state.isDirty);
  const { i18n } = useTranslation();

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const toggleLanguage = () => {
    const newLang = i18n.language === "pt-BR" ? "en" : "pt-BR";
    i18n.changeLanguage(newLang);
    localStorage.setItem("coc.locale", newLang);
  };

  return (
    <div className="min-h-screen bg-[var(--color-weird-paper)] text-[var(--color-weird-black)] font-serif selection:bg-[var(--color-weird-red)] selection:text-[var(--color-weird-paper)]">
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.08] mix-blend-multiply"
        style={{
          backgroundImage:
            'url("https://www.transparenttextures.com/patterns/aged-paper.png")',
        }}
      ></div>
      
      {/* Discrete Language Toggle */}
      <div className="fixed top-4 right-4 z-50 print:hidden">
        <button
          onClick={toggleLanguage}
          className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-weird-black)] hover:text-[var(--color-weird-red)] transition-colors bg-[var(--color-weird-paper)] border border-[var(--color-weird-black-alpha-30)] px-2 py-1 rounded shadow-sm hover:shadow-md font-bold"
        >
          {i18n.language === "pt-BR" ? "EN" : "PT-BR"}
        </button>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col min-h-screen">
        <main className="flex-1">{children}</main>
        <footer className="mt-8 py-4 border-t-[2px] border-[var(--color-weird-red-alpha)] text-center text-[10px] text-[var(--color-weird-black-alpha-50)] font-serif italic print:hidden font-bold">
          <p>
            Call of Cthulhu is a Trademark of Chaosium Inc. and is used with
            their permission via the OGL.
          </p>
        </footer>
      </div>
    </div>
  );
}
