import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useInvestigatorStore } from "../store/investigatorStore";
import { PulpButton } from "../components/ui/PulpButton";
import { PulpInput } from "../components/ui/PulpInput";
import { PulpCheckbox } from "../components/ui/PulpCheckbox";
import { saveSheet } from "../adapters/fileAdapter";
import { Printer, Save, Edit, Play, ArrowLeft, Dices } from "lucide-react";
import { SKILL_CATALOGUE } from "../domain/skills";
import { ElderSign, TentacleDivider } from "../components/illustrations";
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
      const doc = new jsPDF({ unit: "mm", format: "a4" });
      const pdfDoc = doc as jsPDF & { lastAutoTable?: { finalY: number } };
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 12;
      const gutter = 6;
      const contentWidth = pageWidth - margin * 2;
      const columnWidth = (contentWidth - gutter) / 2;
      const compactHeaderHeight = 14;
      const sectionSpacing = 6;
      let y = margin;

      const getTableFinalY = () => pdfDoc.lastAutoTable?.finalY ?? y;

      const drawPageHeader = (compact = false) => {
        doc.setFont("helvetica", "bold");
        doc.setTextColor(139, 26, 26);

        if (compact) {
          doc.setFontSize(11);
          doc.text(t("app_title"), margin, y);
          doc.setFont("helvetica", "normal");
          doc.setFontSize(9);
          doc.setTextColor(0, 0, 0);
          doc.text(sheet.name || "-", pageWidth - margin, y, { align: "right" });
          y += 4;
          doc.setDrawColor(0, 0, 0);
          doc.setLineWidth(0.4);
          doc.line(margin, y, pageWidth - margin, y);
          y += 4;
          return;
        }

        doc.setFontSize(22);
        doc.text(t("app_title"), pageWidth / 2, y, { align: "center" });
        y += 8;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.text(sheet.name || "-", pageWidth / 2, y, { align: "center" });
        y += 4;

        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(0.5);
        doc.line(margin, y, pageWidth - margin, y);
        y += 6;
      };

      const addPage = () => {
        doc.addPage();
        y = margin;
        drawPageHeader(true);
      };

      const ensureSpace = (neededHeight: number) => {
        if (y + neededHeight > pageHeight - margin) {
          addPage();
        }
      };

      const drawSectionHeader = (title: string, minimumContentHeight = 12) => {
        ensureSpace(compactHeaderHeight + minimumContentHeight);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(139, 26, 26);
        doc.text(title, margin, y);
        y += 2;
        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(0.4);
        doc.line(margin, y, pageWidth - margin, y);
        y += 4;
      };

      const drawSplitSectionHeader = (leftTitle: string, rightTitle: string) => {
        ensureSpace(compactHeaderHeight + 36);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(139, 26, 26);
        doc.text(leftTitle, margin, y);
        doc.text(rightTitle, margin + columnWidth + gutter, y);
        y += 2;
        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(0.4);
        doc.line(margin, y, margin + columnWidth, y);
        doc.line(margin + columnWidth + gutter, y, pageWidth - margin, y);
        y += 4;
      };

      drawPageHeader();

      const info = [
        [t("name"), sheet.name || "-"],
        [t("occupation"), sheet.occupation ? t(`occ_${sheet.occupation}`) : "-"],
        [t("age"), sheet.age || "-"],
        [t("sex"), sheet.sex || "-"],
        [t("residence"), sheet.residence || "-"],
        [t("birthplace"), sheet.birthplace || "-"]
      ];

      drawSectionHeader(t("investigator"), 24);

      autoTable(doc, {
        startY: y,
        body: info,
        theme: "plain",
        styles: {
          fontSize: 9,
          cellPadding: 1.5,
          font: "helvetica",
          overflow: "linebreak",
          valign: "middle",
        },
        columnStyles: {
          0: { fontStyle: "bold", cellWidth: 38 },
          1: { cellWidth: contentWidth - 38 },
        },
        margin: { left: margin, right: margin },
        tableWidth: contentWidth,
      });

      y = getTableFinalY() + sectionSpacing;

      drawSplitSectionHeader(t("attributes"), t("derived_stats"));

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
        head: [["", "Val", "1/2", "1/5"]],
        body: attrData,
        theme: "grid",
        styles: {
          fontSize: 8,
          cellPadding: 1.2,
          halign: "center",
          font: "helvetica",
          overflow: "linebreak",
        },
        headStyles: { fillColor: [139, 26, 26], textColor: [255, 255, 255] },
        columnStyles: {
          0: { fontStyle: "bold", halign: "left", cellWidth: 18 },
          1: { cellWidth: 15 },
          2: { cellWidth: 15 },
          3: { cellWidth: 15 },
        },
        margin: { left: margin },
        tableWidth: columnWidth,
      });

      const attrEndY = getTableFinalY();

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
        theme: "grid",
        styles: {
          fontSize: 8,
          cellPadding: 1.2,
          halign: "center",
          font: "helvetica",
          overflow: "linebreak",
        },
        columnStyles: {
          0: { fontStyle: "bold", halign: "left", cellWidth: 34 },
          1: { cellWidth: columnWidth - 34 },
        },
        margin: { left: margin + columnWidth + gutter },
        tableWidth: columnWidth,
      });

      const derivedEndY = getTableFinalY();

      y = Math.max(attrEndY, derivedEndY) + sectionSpacing;

      drawSectionHeader(t("skills"), 18);

      const thinMargin = 2; // thin margin between columns in mm
      const numColumns = 4;
      const allSkillsData = SKILL_CATALOGUE.map((skill) => {
        const sheetSkill = sheet.skills[skill.key];
        return {
          key: skill.key,
          name: t(`skills_${skill.key}`),
          value: sheetSkill?.value ?? skill.base,
        };
      }).sort((a, b) => b.value - a.value);

      const chunkSize = Math.ceil(allSkillsData.length / numColumns);
      const skillsColumns: string[][] = Array.from({ length: numColumns }, () => []);
      for (let i = 0; i < allSkillsData.length; i++) {
        const col = Math.floor(i / chunkSize);
        skillsColumns[col].push(
          `${allSkillsData[i].name}: ${allSkillsData[i].value}/${Math.floor(allSkillsData[i].value / 2)}/${Math.floor(allSkillsData[i].value / 5)}`
        );
      }

      const skillsRows: string[][] = [];
      const maxLen = Math.max(...skillsColumns.map((c) => c.length));
      for (let i = 0; i < maxLen; i++) {
        skillsRows.push(
          skillsColumns.map((col) => col[i] || "")
        );
      }

      autoTable(doc, {
        startY: y,
        body: skillsRows,
        theme: "plain",
        styles: {
          fontSize: 7,
          cellPadding: { top: 1.2, bottom: 1.2, left: thinMargin/2, right: thinMargin/2 },
          font: "helvetica",
          overflow: "linebreak",
          valign: "top",
          lineColor: [170, 170, 170],
          lineWidth: { top: 0, right: 0, bottom: 0.12, left: 0 },
        },
        margin: { left: margin, right: margin },
        tableWidth: contentWidth,
        rowPageBreak: "avoid",
      });

      y = getTableFinalY() + sectionSpacing;

      drawSectionHeader(t("backstory"), 28);

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
        theme: "plain",
        styles: {
          fontSize: 8,
          cellPadding: 1.4,
          cellWidth: "wrap",
          font: "helvetica",
          overflow: "linebreak",
          valign: "top",
        },
        columnStyles: {
          0: { fontStyle: "bold", cellWidth: 42 },
          1: { cellWidth: contentWidth - 42 },
        },
        margin: { left: margin, right: margin },
        tableWidth: contentWidth,
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

  const handleDiceClick = () => {
    navigate("/dados");
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "pt-BR" ? "en" : "pt-BR";
    i18n.changeLanguage(newLang);
    localStorage.setItem("coc.locale", newLang);
  };

  return (
    <div className="max-w-7xl mx-auto py-2 min-w-0">
      <div className="flex flex-wrap items-center gap-3 mb-4 print:hidden border-b-2 border-[var(--color-weird-black)] pb-2 min-w-0">
        <div className="flex items-center gap-4 min-w-0">
          <button
            onClick={handleHomeClick}
            className="flex items-center gap-2 text-[var(--color-weird-black)] hover:text-[var(--color-weird-red)] transition-colors font-serif font-bold text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("back")}
          </button>
        </div>
        <div className="ml-auto flex items-center gap-2 min-w-0">
          <PulpButton
            variant="outline"
            onClick={() => setEditMode(!editMode)}
            className="h-8 w-10 px-0 text-xs"
            aria-label={editMode ? t("play_mode") : t("edit_mode")}
            title={editMode ? t("play_mode") : t("edit_mode")}
          >
            {editMode ? (
              <Play className="w-3 h-3" />
            ) : (
              <Edit className="w-3 h-3" />
            )}
          </PulpButton>
          <PulpButton
            variant="outline"
            onClick={handleSave}
            className="h-8 w-10 px-0 text-xs"
            aria-label={t("save_json")}
            title={t("save_json")}
            data-testid="save-json"
          >
            <Save className="w-3 h-3" />
          </PulpButton>
          <PulpButton
            variant="outline"
            onClick={handlePrint}
            className="h-8 w-10 px-0 text-xs"
            aria-label={t("print")}
            title={t("print")}
            data-testid="export-pdf"
          >
            <Printer className="w-3 h-3" />
          </PulpButton>
          <PulpButton
            variant="outline"
            onClick={handleDiceClick}
            className="h-8 w-10 px-0 text-xs"
            aria-label={t("dice")}
            title={t("dice")}
            data-testid="open-dice"
          >
            <Dices className="w-3 h-3" />
          </PulpButton>
        </div>
      </div>

      <TentacleDivider className="w-full h-6 text-[var(--color-weird-black)] opacity-15 mb-2 print:hidden" />

      <div id="sheet-content" className="grid grid-cols-1 lg:grid-cols-12 print:grid-cols-12 gap-4 print:gap-2 print:p-0">
        {/* Left Column */}
        <div className="lg:col-span-3 print:col-span-3 space-y-4 print:space-y-2">
          <div className="border-[3px] border-[var(--color-weird-paper)] p-4 print:p-2 bg-[var(--color-weird-teal)] relative">
            <h2 className="font-serif text-2xl print:text-xl text-[var(--color-weird-paper)] italic mb-4 pb-1 font-extrabold uppercase bg-[var(--color-weird-red)] px-3 py-1 border-2 border-[var(--color-weird-black)] -mx-1">
              {t("investigator")}
            </h2>
            <div className="space-y-2">
              <div>
                <label className="text-[10px] font-sans uppercase tracking-wider text-[var(--color-weird-paper)] block font-bold">
                  {t("name")}
                </label>
                {editMode ? (
                  <PulpInput
                    value={sheet.name || ""}
                    onChange={(e) => updateField("name", e.target.value)}
                  />
                ) : (
                  <div className="font-serif text-base border-b border-[var(--color-weird-paper)]/30 pb-0.5 font-bold text-[var(--color-weird-paper)]">
                    {sheet.name}
                  </div>
                )}
              </div>
              <div>
                <label className="text-[10px] font-sans uppercase tracking-wider text-[var(--color-weird-paper)] block font-bold">
                  {t("occupation")}
                </label>
                <div className="font-serif text-base border-b border-[var(--color-weird-paper)]/30 pb-0.5 font-bold text-[var(--color-weird-paper)]">
                  {t(`occ_${sheet.occupation}`)}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-sans uppercase tracking-wider text-[var(--color-weird-paper)] block font-bold">
                    {t("age")}
                  </label>
                  <div className="font-serif text-base border-b border-[var(--color-weird-paper)]/30 pb-0.5 font-bold text-[var(--color-weird-paper)]">
                    {sheet.age}
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-sans uppercase tracking-wider text-[var(--color-weird-paper)] block font-bold">
                    {t("sex")}
                  </label>
                  {editMode ? (
                    <PulpInput
                      value={sheet.sex || ""}
                      onChange={(e) => updateField("sex", e.target.value)}
                    />
                  ) : (
                    <div className="font-serif text-base border-b border-[var(--color-weird-paper)]/30 pb-0.5 font-bold text-[var(--color-weird-paper)]">
                      {sheet.sex || "-"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="border-[3px] border-[var(--color-weird-paper)] p-4 print:p-2 bg-[var(--color-weird-teal)] relative">
            <h2 className="font-serif text-2xl print:text-xl text-[var(--color-weird-paper)] italic mb-4 pb-1 font-extrabold uppercase bg-[var(--color-weird-red)] px-3 py-1 border-2 border-[var(--color-weird-black)] -mx-1">
              {t("attributes")}
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {["STR", "CON", "SIZ", "DEX", "APP", "INT", "POW", "EDU"].map(
                (attr) => (
                  <div
                    key={attr}
                    className="flex flex-col items-center border-2 border-[var(--color-weird-black)] p-1 bg-[var(--color-weird-paper)]"
                  >
                    <span className="font-serif font-bold text-[var(--color-weird-red)] text-[10px] mb-0.5">
                      {t(attr.toLowerCase())}
                    </span>
                    {editMode ? (
                      <PulpInput
                        type="number"
                        value={(sheet as any)[attr]?.value || 0}
                        onChange={(e) => {
                          const nextValue = Number(e.target.value);
                          if (Number.isFinite(nextValue)) {
                            updateAttribute(attr as any, nextValue);
                          }
                        }}
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

          <div className="border-[3px] border-[var(--color-weird-paper)] p-4 print:p-2 bg-[var(--color-weird-teal)] relative">
            <h2 className="font-serif text-2xl print:text-xl text-[var(--color-weird-paper)] italic mb-4 pb-1 font-extrabold uppercase bg-[var(--color-weird-red)] px-3 py-1 border-2 border-[var(--color-weird-black)] -mx-1">
              {t("derived_stats")}
            </h2>

            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-[var(--color-weird-paper)]/20 pb-1">
                <span className="font-sans font-bold text-[var(--color-weird-paper)] text-xs uppercase">
                  {t("hp")}
                </span>
                <div className="flex items-center gap-2">
                  <PulpInput
                    type="number"
                    value={sheet.hp?.current || 0}
                    onChange={(e) => updateHP(parseInt(e.target.value) || 0)}
                    className="w-14 text-center text-lg font-['Courier_Prime'] font-bold border-b-2 border-[var(--color-weird-red)] text-[var(--color-weird-black)] h-7"
                  />
                  <span className="text-[var(--color-weird-paper)]/50 font-['Courier_Prime'] font-bold text-sm">
                    / {sheet.hp.max}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between border-b border-[var(--color-weird-paper)]/20 pb-1">
                <span className="font-sans font-bold text-[var(--color-weird-paper)] text-xs uppercase">
                  {t("mp")}
                </span>
                <div className="flex items-center gap-2">
                  <PulpInput
                    type="number"
                    value={sheet.mp?.current || 0}
                    onChange={(e) => updateMP(parseInt(e.target.value) || 0)}
                    className="w-14 text-center text-lg font-['Courier_Prime'] font-bold border-b-2 border-[var(--color-weird-red)] text-[var(--color-weird-black)] h-7"
                  />
                  <span className="text-[var(--color-weird-paper)]/50 font-['Courier_Prime'] font-bold text-sm">
                    / {sheet.mp.max}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between border-b border-[var(--color-weird-paper)]/20 pb-1">
                <span className="font-sans font-bold text-[var(--color-weird-paper)] text-xs uppercase">
                  {t("san")}
                </span>
                <div className="flex items-center gap-2">
                  <PulpInput
                    type="number"
                    value={sheet.san?.current || 0}
                    onChange={(e) => updateSAN(parseInt(e.target.value) || 0)}
                    className="w-14 text-center text-lg font-['Courier_Prime'] font-bold border-b-2 border-[var(--color-weird-red)] text-[var(--color-weird-black)] h-7"
                  />
                  <span className="text-[var(--color-weird-paper)]/50 font-['Courier_Prime'] font-bold text-sm">
                    / {sheet.san.max}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between border-b border-[var(--color-weird-paper)]/20 pb-1">
                <span className="font-sans font-bold text-[var(--color-weird-paper)] text-xs uppercase">
                  {t("luck")}
                </span>
                <div className="flex items-center gap-2">
                  <PulpInput
                    type="number"
                    value={sheet.luck || 0}
                    onChange={(e) => updateLuck(parseInt(e.target.value) || 0)}
                    className="w-14 text-center text-lg font-['Courier_Prime'] font-bold border-b-2 border-[var(--color-weird-red)] text-[var(--color-weird-black)] h-7"
                  />
                  <span className="text-[var(--color-weird-paper)]/50 font-['Courier_Prime'] font-bold text-sm">
                    / 99
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-1 pt-1 text-center">
                <div>
                  <span className="block font-sans font-bold text-[var(--color-weird-paper)] text-[9px] uppercase">
                    {t("mov")}
                  </span>
                  <span className="font-['Courier_Prime'] text-xl font-bold text-[var(--color-weird-paper)]">
                    {sheet.mov}
                  </span>
                </div>
                <div>
                  <span className="block font-sans font-bold text-[var(--color-weird-paper)] text-[9px] uppercase">
                    {t("build")}
                  </span>
                  <span className="font-['Courier_Prime'] text-xl font-bold text-[var(--color-weird-paper)]">
                    {sheet.build > 0 ? `+${sheet.build}` : sheet.build}
                  </span>
                </div>
                <div>
                  <span className="block font-sans font-bold text-[var(--color-weird-paper)] text-[9px] uppercase">
                    {t("damage_bonus")}
                  </span>
                  <span className="font-['Courier_Prime'] text-xl font-bold text-[var(--color-weird-paper)]">
                    {sheet.damageBonus}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Centre Column */}
        <div className="lg:col-span-5 print:col-span-5 space-y-4 print:space-y-2">
          <div className="border-[3px] border-[var(--color-weird-paper)] p-4 print:p-2 bg-[var(--color-weird-teal)] relative">
            <h2 className="font-serif text-2xl print:text-xl text-[var(--color-weird-paper)] italic mb-4 pb-1 font-extrabold uppercase bg-[var(--color-weird-red)] px-3 py-1 border-2 border-[var(--color-weird-black)] -mx-1">
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
                    className="flex items-center justify-between border-b-2 border-[var(--color-weird-paper)]/20 py-1 hover:bg-[var(--color-weird-paper)]/10 transition-colors"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <PulpCheckbox
                        checked={s.checked}
                        onChange={() => tickSkillCheck(skill.key)}
                        className="w-4 h-4 flex-shrink-0"
                      />
                      <span
                        className={`text-sm font-serif truncate font-bold ${isSpecialist ? "text-[var(--color-weird-yellow)]" : "text-[var(--color-weird-paper)]"}`}
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
                          onChange={(e) => {
                            const nextValue = Number(e.target.value);
                            if (Number.isFinite(nextValue)) {
                              updateSkill(skill.key, nextValue);
                            }
                          }}
                          className="w-10 text-center text-sm font-['Courier_Prime'] font-bold border-b-2 border-[var(--color-weird-red)] bg-transparent p-0 h-6"
                        />
                      ) : (
                        <span className="w-8 text-right font-['Courier_Prime'] font-bold text-base print:text-sm text-[var(--color-weird-paper)]">
                          {s.value}
                        </span>
                      )}
                      <div className="flex flex-col text-[8px] font-['Courier_Prime'] text-[var(--color-weird-paper)]/70 leading-none w-4 text-right font-bold">
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
          <div className="border-[3px] border-[var(--color-weird-paper)] p-4 print:p-2 bg-[var(--color-weird-teal)] relative overflow-hidden">
            {/* Watermark */}
            <ElderSign className="absolute bottom-4 right-4 w-24 h-24 text-[var(--color-weird-black)] opacity-[0.06] pointer-events-none print:hidden" />

            <h2 className="font-serif text-2xl print:text-xl text-[var(--color-weird-paper)] italic mb-4 pb-1 font-extrabold uppercase bg-[var(--color-weird-red)] px-3 py-1 border-2 border-[var(--color-weird-black)] -mx-1">
              {t("backstory")}
            </h2>

            <div className="relative z-10 space-y-2">
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
                      className="w-full h-16 bg-[var(--color-weird-paper)] border-2 border-[var(--color-weird-black)] p-2 text-sm font-serif text-[var(--color-weird-black)] focus-visible:outline-none focus-visible:border-[var(--color-weird-red)] resize-y font-bold"
                    />
                  ) : (
                    <div className="font-serif text-xs border-b border-[var(--color-weird-paper)]/20 pb-1 min-h-[1.5rem] whitespace-pre-wrap italic text-[var(--color-weird-paper)] font-bold">
                      {(sheet as any)[item.key] || "-"}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="border-[3px] border-[var(--color-weird-paper)] p-4 print:p-2 bg-[var(--color-weird-teal)] relative">
            <h2 className="font-serif text-2xl print:text-xl text-[var(--color-weird-paper)] italic mb-4 pb-1 font-extrabold uppercase bg-[var(--color-weird-red)] px-3 py-1 border-2 border-[var(--color-weird-black)] -mx-1">
              {t("notes")}
            </h2>
            {editMode ? (
              <textarea
                value={sheet.notes || ""}
                onChange={(e) => updateField("notes", e.target.value)}
                className="w-full h-32 bg-[var(--color-weird-paper)] border-2 border-[var(--color-weird-black)] p-2 text-sm font-serif text-[var(--color-weird-black)] focus-visible:outline-none focus-visible:border-[var(--color-weird-red)] resize-y font-bold"
              />
            ) : (
              <div className="font-serif text-xs min-h-[8rem] whitespace-pre-wrap italic text-[var(--color-weird-paper)] font-bold">
                {sheet.notes || "-"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
