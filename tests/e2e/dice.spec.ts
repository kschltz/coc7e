import { expect, test } from "@playwright/test";
import { completeWizardToSheet, setEnglishLocale } from "./helpers";

test.beforeEach(async ({ page }) => {
  await setEnglishLocale(page);
});

test("redirects dice page to home when no sheet is loaded", async ({ page }) => {
  await page.goto("/dados");

  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole("button", { name: "New Sheet" })).toBeVisible();
});

test("allows rolling against attributes and skills from a loaded sheet", async ({ page }) => {
  await completeWizardToSheet(page, "Dice Test Investigator");

  await page.getByTestId("open-dice").click();
  await expect(page).toHaveURL(/\/dados$/);

  await expect(page.getByTestId("roll-source-select")).toBeVisible();
  await expect(page.getByTestId("roll-target-select")).toBeVisible();

  await page.getByTestId("roll-source-select").selectOption("skill");
  await page.getByTestId("roll-d100").click();

  await expect(page.getByTestId("roll-result-card")).toContainText(/Roll\s+\d+\s+vs\s+target\s+\d+/, {
    timeout: 20_000,
  });
});
