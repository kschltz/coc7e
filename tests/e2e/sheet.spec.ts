import { expect, test } from "@playwright/test";
import { completeWizardToSheet, setEnglishLocale } from "./helpers";

test.beforeEach(async ({ page }) => {
  await setEnglishLocale(page);
});

test("allows editing investigator name from the sheet", async ({ page }) => {
  await completeWizardToSheet(page, "Sheet Edit Investigator");

  await page.getByRole("button", { name: "Edit Mode" }).click();
  await expect(page.getByRole("button", { name: "Play Mode" })).toBeVisible();

  const investigatorPanel = page
    .locator("div")
    .filter({ has: page.getByRole("heading", { name: "Investigator" }) })
    .first();
  const nameInput = investigatorPanel.locator("input:not([type='number'])").first();
  await nameInput.fill("Edited Investigator Name");

  await page.getByRole("button", { name: "Play Mode" }).click();
  await expect(page.getByText("Edited Investigator Name")).toBeVisible();
});

test("recalculates HP max when CON changes", async ({ page }) => {
  await completeWizardToSheet(page, "Sheet Derived Stats Investigator");

  await page.getByRole("button", { name: "Edit Mode" }).click();

  const attributesPanel = page
    .locator("div")
    .filter({ has: page.getByRole("heading", { name: "Attributes" }) })
    .first();
  const derivedPanel = page
    .locator("div")
    .filter({ has: page.getByRole("heading", { name: "Derived Stats" }) })
    .first();

  const hpRow = derivedPanel
    .locator("div")
    .filter({ has: page.getByText("Hit Points") })
    .first();

  await expect(hpRow).toContainText("/ 10");

  const attributeInputs = attributesPanel.locator("input[type='number']");
  await attributeInputs.nth(1).fill("80");

  await expect(hpRow).toContainText("/ 13");
});

test("exports sheet JSON from sheet page", async ({ page }) => {
  await completeWizardToSheet(page, "Sheet Export Investigator");

  const downloadPromise = page.waitForEvent("download");
  await page.getByTestId("save-json").click();
  const download = await downloadPromise;

  expect(download.suggestedFilename()).toContain("_coc7e.json");
});
