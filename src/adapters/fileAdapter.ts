import { InvestigatorSheet, InvestigatorSheetSchema } from "../domain/schema";

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export async function saveSheet(sheet: InvestigatorSheet): Promise<void> {
  const json = JSON.stringify(sheet, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const filename = `${slugify(sheet.name || "investigator")}_coc7e.json`;

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export async function loadSheet(): Promise<InvestigatorSheet> {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return reject(new Error("No file selected"));

      try {
        const text = await file.text();
        const raw = JSON.parse(text);

        // Basic migration logic could go here
        const migrated = raw; // runMigrations(raw)

        const result = InvestigatorSheetSchema.safeParse(migrated);
        if (!result.success) {
          console.error(result.error);
          reject(new Error("Sheet validation failed"));
          return;
        }
        resolve(result.data);
      } catch (err) {
        reject(err);
      }
    };
    input.click();
  });
}
