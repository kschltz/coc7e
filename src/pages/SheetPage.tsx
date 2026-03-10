import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useInvestigatorStore } from "../store/investigatorStore";
import { PulpButton } from "../components/ui/PulpButton";
import { PulpInput } from "../components/ui/PulpInput";
import { PulpCheckbox } from "../components/ui/PulpCheckbox";
import { saveSheet } from "../adapters/fileAdapter";
import { Printer, Save, Edit, Play, ArrowLeft } from "lucide-react";
import { SKILL_CATALOGUE } from "../domain/skills";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export function SheetPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const {
    sheet,
    editMode,
    setEditMode,
    updateField,
    updateAttribute,
    updateSkill,
    tickSkillCheck,
    updateHP,
    updateMP,
    updateSAN,
    updateLuck,
    isDirty,
    clearSheet,
  } = useInvestigatorStore();

  useEffect(() => {
    if (!sheet) {
      navigate("/");
    }
  }, [sheet, navigate]);

  if (!sheet) return null;

  const handleSave = async () => {
    await saveSheet(sheet);
  };

  const handlePrint = () => {
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 10;
      let y = 15;

      // Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(139, 26, 26); // Weird Red
      doc.text(t("app_title"), pageWidth / 2, y, { align: "center" });
      y += 10;

      // Investigator Info
      doc.setFontSize(14);
      doc.text(t("investigator"), margin, y);
      y += 2;
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(0.5);
      doc.line(margin, y, pageWidth - margin, y);
      y += 6;

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);
      
      const info = [
        [t("name"), sheet.name || "-"],
        [t("occupation"), sheet.occupation ? t(`occ_${sheet.occupation}`) : "-"],
        [t("age"), sheet.age || "-"],
        [t("sex"), sheet.sex || "-"],
        [t("residence"), sheet.residence || "-"],
        [t("birthplace"), sheet.birthplace || "-"]
      ];

      autoTable(doc, {
        startY: y,
        body: info,
        theme: 'plain',
        styles: { fontSize: 9, cellPadding: 1, font: 'helvetica' },
        columnStyles: { 0: { fontStyle: 'bold', cellWidth: 35 } },
        margin: { left: margin }
      });
      
      y = (doc as any).lastAutoTable?.finalY || (y + 30);

      // Attributes & Derived Stats
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(139, 26, 26);
      doc.text(t("attributes"), margin, y);
      doc.text(t("derived_stats"), pageWidth / 2 + 5, y);
      y += 2;
      doc.setDrawColor(0, 0, 0);
      doc.line(margin, y, pageWidth / 2 - 5, y);
      doc.line(pageWidth / 2 + 5, y, pageWidth - margin, y);
      y += 4;

      const attrData = [
        [t("str"), sheet.STR.value, sheet.STR.half, sheet.STR.fifth],
        [t("con"), sheet.CON.value, sheet.CON.half, sheet.CON.fifth],
        [t("siz"), sheet.SIZ.value, sheet.SIZ.half, sheet.SIZ.fifth],
        [t("dex"), sheet.DEX.value, sheet.DEX.half, sheet.DEX.fifth],
        [t("app"), sheet.APP.value, sheet.APP.half, sheet.APP.fifth],
        [t("int"), sheet.INT.value, sheet.INT.half, sheet.INT.fifth],
        [t("pow"), sheet.POW.value, sheet.POW.half, sheet.POW.fifth],
        [t("edu"), sheet.EDU.value, sheet.EDU.half, sheet.EDU.fifth]
      ];

      autoTable(doc, {
        startY: y,
        head: [['', 'Val', '1/2', '1/5']],
        body: attrData,
        theme: 'grid',
        styles: { fontSize: 8, cellPadding: 1, halign: 'center', font: 'helvetica' },
        headStyles: { fillColor: [139, 26, 26], textColor: [255, 255, 255] },
        columnStyles: { 0: { fontStyle: 'bold', halign: 'left', cellWidth: 15 } },
        margin: { left: margin },
        tableWidth: pageWidth / 2 - 15
      });

      const derivedData = [
        [t("hp"), `${sheet.hp.current} / ${sheet.hp.max}`],
        [t("mp"), `${sheet.mp.current} / ${sheet.mp.max}`],
        [t("san"), `${sheet.san.current} / ${sheet.san.max}`],
        [t("luck"), `${sheet.luck} / 99`],
        [t("mov"), sheet.mov],
        [t("build"), sheet.build],
        [t("damage_bonus"), sheet.damageBonus]
      ];

      autoTable(doc, {
        startY: y,
        body: derivedData,
        theme: 'grid',
        styles: { fontSize: 8, cellPadding: 1, halign: 'center', font: 'helvetica' },
        columnStyles: { 0: { fontStyle: 'bold', halign: 'left', cellWidth: 30 } },
        margin: { left: pageWidth / 2 + 5 },
        tableWidth: pageWidth / 2 - 15
      });

      y = Math.max((doc as any).lastAutoTable?.finalY || y, y) + 8;

      // Skills
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(139, 26, 26);
      doc.text(t("skills"), margin, y);
      y += 2;
      doc.setDrawColor(0, 0, 0);
      doc.line(margin, y, pageWidth - margin, y);
      y += 4;

      const skillsData = Object.entries(sheet.skills)
        .filter(([_, s]) => s.value > s.base)
        .map(([key, s]) => [t(`skills_${key}`), s.value, Math.floor(s.value/2), Math.floor(s.value/5)]);

      autoTable(doc, {
        startY: y,
        head: [[t("skills"), 'Val', '1/2', '1/5']],
        body: skillsData,
        theme: 'striped',
        styles: { fontSize: 7, cellPadding: 0.5, font: 'helvetica' },
        headStyles: { fillColor: [139, 26, 26], textColor: [255, 255, 255] },
        columnStyles: { 0: { fontStyle: 'bold' }, 1: { halign: 'center', cellWidth: 10 }, 2: { halign: 'center', cellWidth: 10 }, 3: { halign: 'center', cellWidth: 10 } },
        margin: { left: margin },
        tableWidth: pageWidth - 2 * margin
      });

      y = ((doc as any).lastAutoTable?.finalY || y) + 8;

      // Backstory
      if (y > doc.internal.pageSize.getHeight() - 40) { doc.addPage(); y = 20; }
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(139, 26, 26);
      doc.text(t("backstory"), margin, y);
      y += 2;
      doc.setDrawColor(0, 0, 0);
      doc.line(margin, y, pageWidth - margin, y);
      y += 4;

      const backstory = [
        [t("personal_description"), sheet.personalDescription || "-"],
        [t("ideology_beliefs"), sheet.ideology || "-"],
        [t("significant_people"), sheet.significantPeople || "-"],
        [t("meaningful_locations"), sheet.meaningfulLocations || "-"],
        [t("treasured_possessions"), sheet.treasuredPossessions || "-"],
        [t("traits"), sheet.traits || "-"]
      ];

      autoTable(doc, {
        startY: y,
        body: backstory,
        theme: 'plain',
        styles: { fontSize: 8, cellPadding: 1, cellWidth: 'wrap', font: 'helvetica' },
        columnStyles: { 0: { fontStyle: 'bold', cellWidth: 40 } },
        margin: { left: margin }
      });

      const safeName = (sheet.name || "investigator").replace(/[^a-z0-9]/gi, '_').toLowerCase();
      doc.save(`${safeName}_sheet.pdf`);
    } catch (error) {
      console.error("PDF Generation Error:", error);
      alert("Error generating PDF. Please try again.");
    }
  };

  const handleHomeClick = () => {
    if (isDirty) {
      if (
        !window.confirm(
          t("unsaved_changes")
        )
      ) {
        return;
      }
    }
    clearSheet();
    navigate("/");
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "pt-BR" ? "en" : "pt-BR";
    i18n.changeLanguage(newLang);
    localStorage.setItem("coc.locale", newLang);
  };

  return (
    <div className="max-w-7xl mx-auto py-2">
      <div className="flex justify-between items-center mb-4 print:hidden border-b-2 border-[var(--color-weird-black-alpha-20)] pb-2">
        <div className="flex items-center gap-4">
          <button
            onClick={handleHomeClick}
            className="flex items-center gap-2 text-[var(--color-weird-black)] hover:text-[var(--color-weird-red)] transition-colors font-serif font-bold text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("back")}
          </button>
        </div>
        <div className="flex items-center gap-2">
          <PulpButton
            variant="outline"
            onClick={() => setEditMode(!editMode)}
            className="flex items-center gap-2 py-1 px-3 text-xs h-8"
          >
            {editMode ? (
              <Play className="w-3 h-3" />
            ) : (
              <Edit className="w-3 h-3" />
            )}
            {editMode ? t("play_mode") : t("edit_mode")}
          </PulpButton>
          <PulpButton
            variant="outline"
            onClick={handleSave}
            className="flex items-center gap-2 py-1 px-3 text-xs h-8"
          >
            <Save className="w-3 h-3" />
            {t("save_json")}
          </PulpButton>
          <PulpButton
            variant="outline"
            onClick={handlePrint}
            className="flex items-center gap-2 py-1 px-3 text-xs h-8"
          >
            <Printer className="w-3 h-3" />
            {t("print")}
          </PulpButton>
        </div>
      </div>

      <div id="sheet-content" className="grid grid-cols-1 lg:grid-cols-12 print:grid-cols-12 gap-4 print:gap-2 print:p-0">
        {/* Left Column */}
        <div className="lg:col-span-3 print:col-span-3 space-y-4 print:space-y-2">
          <div className="border-[3px] border-[var(--color-weird-black)] p-4 print:p-2 bg-[var(--color-weird-paper)] shadow-[6px_6px_0px_var(--color-weird-black)] relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-[var(--color-weird-red)] border-b-[3px] border-[var(--color-weird-black)]"></div>
            <h2 className="font-['IM_Fell_English'] text-2xl print:text-xl text-[var(--color-weird-red)] italic mb-4 border-b-[3px] border-[var(--color-weird-black)] pb-1 font-bold mt-1">
              {t("investigator")}
            </h2>
            <div className="space-y-2">
              <div>
                <label className="text-[10px] font-serif uppercase tracking-wider text-[var(--color-weird-black)] block font-bold">
                  {t("name")}
                </label>
                {editMode ? (
                  <PulpInput
                    value={sheet.name || ""}
                    onChange={(e) => updateField("name", e.target.value)}
                  />
                ) : (
                  <div className="font-serif text-base border-b border-[var(--color-weird-black-alpha-30)] pb-0.5 font-bold text-[var(--color-weird-black)]">
                    {sheet.name}
                  </div>
                )}
              </div>
              <div>
                <label className="text-[10px] font-serif uppercase tracking-wider text-[var(--color-weird-black)] block font-bold">
                  {t("occupation")}
                </label>
                <div className="font-serif text-base border-b border-[var(--color-weird-black-alpha-30)] pb-0.5 font-bold text-[var(--color-weird-black)]">
                  {t(`occ_${sheet.occupation}`)}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-serif uppercase tracking-wider text-[var(--color-weird-black)] block font-bold">
                    {t("age")}
                  </label>
                  <div className="font-serif text-base border-b border-[var(--color-weird-black-alpha-30)] pb-0.5 font-bold text-[var(--color-weird-black)]">
                    {sheet.age}
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-serif uppercase tracking-wider text-[var(--color-weird-black)] block font-bold">
                    {t("sex")}
                  </label>
                  {editMode ? (
                    <PulpInput
                      value={sheet.sex || ""}
                      onChange={(e) => updateField("sex", e.target.value)}
                    />
                  ) : (
                    <div className="font-serif text-base border-b border-[var(--color-weird-black-alpha-30)] pb-0.5 font-bold text-[var(--color-weird-black)]">
                      {sheet.sex || "-"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="border-[3px] border-[var(--color-weird-black)] p-4 print:p-2 bg-[var(--color-weird-paper)] shadow-[6px_6px_0px_var(--color-weird-black)] relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-[var(--color-weird-red)] border-b-[3px] border-[var(--color-weird-black)]"></div>
            <h2 className="font-['IM_Fell_English'] text-2xl print:text-xl text-[var(--color-weird-red)] italic mb-4 border-b-[3px] border-[var(--color-weird-black)] pb-1 font-bold mt-1">
              {t("attributes")}
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {["STR", "CON", "SIZ", "DEX", "APP", "INT", "POW", "EDU"].map(
                (attr) => (
                  <div
                    key={attr}
                    className="flex flex-col items-center border-2 border-[var(--color-weird-black)] p-1 bg-[var(--color-weird-paper)] shadow-[2px_2px_0px_var(--color-weird-black)]"
                  >
                    <span className="font-serif font-bold text-[var(--color-weird-red)] text-[10px] mb-0.5">
                      {t(attr.toLowerCase())}
                    </span>
                    {editMode ? (
                      <PulpInput
                        type="number"
                        value={(sheet as any)[attr]?.value || 0}
                        onChange={(e) =>
                          updateAttribute(
                            attr as any,
                            parseInt(e.target.value) || 0,
                          )
                        }
                        className="text-center text-xl font-['Courier_Prime'] font-bold w-14 h-7 border-b-2 border-[var(--color-weird-red)] bg-transparent"
                      />
                    ) : (
                      <span className="text-xl font-['Courier_Prime'] font-bold text-[var(--color-weird-black)]">
                        {(sheet as any)[attr].value}
                      </span>
                    )}
                    <div className="flex justify-between w-full px-2 mt-0.5 text-[9px] font-['Courier_Prime'] text-[var(--color-weird-black-alpha-70)] border-t border-[var(--color-weird-black-alpha-20)] pt-0.5 font-bold">
                      <span>{(sheet as any)[attr].half}</span>
                      <span>{(sheet as any)[attr].fifth}</span>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>

          <div className="border-[3px] border-[var(--color-weird-black)] p-4 print:p-2 bg-[var(--color-weird-paper)] shadow-[6px_6px_0px_var(--color-weird-black)] relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-[var(--color-weird-red)] border-b-[3px] border-[var(--color-weird-black)]"></div>
            <h2 className="font-['IM_Fell_English'] text-2xl print:text-xl text-[var(--color-weird-red)] italic mb-4 border-b-[3px] border-[var(--color-weird-black)] pb-1 font-bold mt-1">
              {t("derived_stats")}
            </h2>

            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-[var(--color-weird-black-alpha-20)] pb-1">
                <span className="font-serif font-bold text-[var(--color-weird-red)] text-xs">
                  {t("hp")}
                </span>
                <div className="flex items-center gap-2">
                  <PulpInput
                    type="number"
                    value={sheet.hp?.current || 0}
                    onChange={(e) => updateHP(parseInt(e.target.value) || 0)}
                    className="w-10 text-center text-lg font-['Courier_Prime'] font-bold border-b-2 border-[var(--color-weird-red)] text-[var(--color-weird-black)] h-7"
                  />
                  <span className="text-[var(--color-weird-black-alpha-50)] font-['Courier_Prime'] font-bold text-sm">
                    / {sheet.hp.max}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between border-b border-[var(--color-weird-black-alpha-20)] pb-1">
                <span className="font-serif font-bold text-[var(--color-weird-red)] text-xs">
                  {t("mp")}
                </span>
                <div className="flex items-center gap-2">
                  <PulpInput
                    type="number"
                    value={sheet.mp?.current || 0}
                    onChange={(e) => updateMP(parseInt(e.target.value) || 0)}
                    className="w-10 text-center text-lg font-['Courier_Prime'] font-bold border-b-2 border-[var(--color-weird-red)] text-[var(--color-weird-black)] h-7"
                  />
                  <span className="text-[var(--color-weird-black-alpha-50)] font-['Courier_Prime'] font-bold text-sm">
                    / {sheet.mp.max}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between border-b border-[var(--color-weird-black-alpha-20)] pb-1">
                <span className="font-serif font-bold text-[var(--color-weird-red)] text-xs">
                  {t("san")}
                </span>
                <div className="flex items-center gap-2">
                  <PulpInput
                    type="number"
                    value={sheet.san?.current || 0}
                    onChange={(e) => updateSAN(parseInt(e.target.value) || 0)}
                    className="w-10 text-center text-lg font-['Courier_Prime'] font-bold border-b-2 border-[var(--color-weird-red)] text-[var(--color-weird-black)] h-7"
                  />
                  <span className="text-[var(--color-weird-black-alpha-50)] font-['Courier_Prime'] font-bold text-sm">
                    / {sheet.san.max}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between border-b border-[var(--color-weird-black-alpha-20)] pb-1">
                <span className="font-serif font-bold text-[var(--color-weird-red)] text-xs">
                  {t("luck")}
                </span>
                <div className="flex items-center gap-2">
                  <PulpInput
                    type="number"
                    value={sheet.luck || 0}
                    onChange={(e) => updateLuck(parseInt(e.target.value) || 0)}
                    className="w-10 text-center text-lg font-['Courier_Prime'] font-bold border-b-2 border-[var(--color-weird-red)] text-[var(--color-weird-black)] h-7"
                  />
                  <span className="text-[var(--color-weird-black-alpha-50)] font-['Courier_Prime'] font-bold text-sm">
                    / 99
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-1 pt-1 text-center">
                <div>
                  <span className="block font-serif font-bold text-[var(--color-weird-red)] text-[9px] uppercase">
                    {t("mov")}
                  </span>
                  <span className="font-['Courier_Prime'] text-xl font-bold text-[var(--color-weird-black)]">
                    {sheet.mov}
                  </span>
                </div>
                <div>
                  <span className="block font-serif font-bold text-[var(--color-weird-red)] text-[9px] uppercase">
                    {t("build")}
                  </span>
                  <span className="font-['Courier_Prime'] text-xl font-bold text-[var(--color-weird-black)]">
                    {sheet.build > 0 ? `+${sheet.build}` : sheet.build}
                  </span>
                </div>
                <div>
                  <span className="block font-serif font-bold text-[var(--color-weird-red)] text-[9px] uppercase">
                    {t("damage_bonus")}
                  </span>
                  <span className="font-['Courier_Prime'] text-xl font-bold text-[var(--color-weird-black)]">
                    {sheet.damageBonus}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Centre Column */}
        <div className="lg:col-span-5 print:col-span-5 space-y-4 print:space-y-2">
          <div className="border-[3px] border-[var(--color-weird-black)] p-4 print:p-2 bg-[var(--color-weird-paper)] shadow-[6px_6px_0px_var(--color-weird-black)] relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-[var(--color-weird-red)] border-b-[3px] border-[var(--color-weird-black)]"></div>
            <h2 className="font-['IM_Fell_English'] text-2xl print:text-xl text-[var(--color-weird-red)] italic mb-4 border-b-[3px] border-[var(--color-weird-black)] pb-1 font-bold mt-1">
              {t("skills")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 print:grid-cols-3 gap-x-4 gap-y-0.5">
              {SKILL_CATALOGUE.map((skill) => {
                const s = sheet.skills[skill.key];
                if (!s) return null;
                const isSpecialist = s.value >= 90;

                return (
                  <div
                    key={skill.key}
                    className="flex items-center justify-between border-b-2 border-[var(--color-weird-black-alpha-20)] py-1 hover:bg-[var(--color-weird-black-alpha-10)] transition-colors"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <PulpCheckbox
                        checked={s.checked}
                        onChange={() => tickSkillCheck(skill.key)}
                        className="w-4 h-4 flex-shrink-0"
                      />
                      <span
                        className={`text-sm font-serif truncate font-bold ${isSpecialist ? "text-[var(--color-weird-red)]" : "text-[var(--color-weird-black)]"}`}
                        title={t(`skills_${skill.key}`)}
                      >
                        {t(`skills_${skill.key}`)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {editMode ? (
                        <PulpInput
                          type="number"
                          value={s.value || 0}
                          onChange={(e) =>
                            updateSkill(
                              skill.key,
                              parseInt(e.target.value) || s.base,
                            )
                          }
                          className="w-10 text-center text-sm font-['Courier_Prime'] font-bold border-b-2 border-[var(--color-weird-red)] bg-transparent p-0 h-6"
                        />
                      ) : (
                        <span className="w-8 text-right font-['Courier_Prime'] font-bold text-base print:text-sm text-[var(--color-weird-black)]">
                          {s.value}
                        </span>
                      )}
                      <div className="flex flex-col text-[8px] font-['Courier_Prime'] text-[var(--color-weird-black-alpha-70)] leading-none w-4 text-right font-bold">
                        <span>{Math.floor(s.value / 2)}</span>
                        <span>{Math.floor(s.value / 5)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 print:col-span-4 space-y-4 print:space-y-2">
          <div className="border-[3px] border-[var(--color-weird-black)] p-4 print:p-2 bg-[var(--color-weird-paper)] shadow-[6px_6px_0px_var(--color-weird-black)] relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-[var(--color-weird-red)] border-b-[3px] border-[var(--color-weird-black)]"></div>
            <h2 className="font-['IM_Fell_English'] text-2xl print:text-xl text-[var(--color-weird-red)] italic mb-4 border-b-[3px] border-[var(--color-weird-black)] pb-1 font-bold mt-1">
              {t("backstory")}
            </h2>

            <div className="space-y-2">
              {[
                { key: "personalDescription", label: t("personal_description") },
                { key: "ideology", label: t("ideology_beliefs") },
                { key: "significantPeople", label: t("significant_people") },
                { key: "meaningfulLocations", label: t("meaningful_locations") },
                { key: "treasuredPossessions", label: t("treasured_possessions") },
                { key: "traits", label: t("traits") },
              ].map((item) => (
                <div key={item.key}>
                  <label className="text-[10px] font-serif uppercase tracking-wider text-[var(--color-weird-black)] block mb-0.5 font-bold">
                    {item.label}
                  </label>
                  {editMode ? (
                    <textarea
                      value={(sheet as any)[item.key] || ""}
                      onChange={(e) =>
                        updateField(item.key as any, e.target.value)
                      }
                      className="w-full h-16 bg-[var(--color-weird-paper)] border-2 border-[var(--color-weird-black)] shadow-[4px_4px_0px_var(--color-weird-black)] p-2 text-sm font-serif text-[var(--color-weird-black)] focus-visible:outline-none focus-visible:border-[var(--color-weird-red)] resize-y font-bold"
                    />
                  ) : (
                    <div className="font-serif text-xs border-b border-[var(--color-weird-black-alpha-20)] pb-1 min-h-[1.5rem] whitespace-pre-wrap italic text-[var(--color-weird-black)] font-bold">
                      {(sheet as any)[item.key] || "-"}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="border-[3px] border-[var(--color-weird-black)] p-4 print:p-2 bg-[var(--color-weird-paper)] shadow-[6px_6px_0px_var(--color-weird-black)] relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-[var(--color-weird-red)] border-b-[3px] border-[var(--color-weird-black)]"></div>
            <h2 className="font-['IM_Fell_English'] text-2xl print:text-xl text-[var(--color-weird-red)] italic mb-4 border-b-[3px] border-[var(--color-weird-black)] pb-1 font-bold mt-1">
              {t("notes")}
            </h2>
            {editMode ? (
              <textarea
                value={sheet.notes || ""}
                onChange={(e) => updateField("notes", e.target.value)}
                className="w-full h-32 bg-[var(--color-weird-paper)] border-2 border-[var(--color-weird-black)] shadow-[4px_4px_0px_var(--color-weird-black)] p-2 text-sm font-serif text-[var(--color-weird-black)] focus-visible:outline-none focus-visible:border-[var(--color-weird-red)] resize-y font-bold"
              />
            ) : (
              <div className="font-serif text-xs min-h-[8rem] whitespace-pre-wrap italic text-[var(--color-weird-black)] font-bold">
                {sheet.notes || "-"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
