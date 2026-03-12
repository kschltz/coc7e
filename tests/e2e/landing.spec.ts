import { expect, test } from "@playwright/test";
import { setEnglishLocale } from "./helpers";

function buildFixtureSheet(name: string) {
  const now = new Date().toISOString();
  const attribute = { value: 50, half: 25, fifth: 10 };

  return {
    schemaVersion: "1.0",
    createdAt: now,
    updatedAt: now,
    name,
    player: "E2E Player",
    occupation: "author",
    age: 30,
    sex: "X",
    residence: "Arkham",
    birthplace: "Boston",
    STR: attribute,
    CON: attribute,
    SIZ: attribute,
    DEX: attribute,
    APP: attribute,
    INT: attribute,
    POW: attribute,
    EDU: attribute,
    luck: 50,
    startingLuck: 50,
    hp: { max: 10, current: 10 },
    mp: { max: 10, current: 10 },
    san: { max: 99, current: 50, starting: 50 },
    mov: 8,
    build: 0,
    damageBonus: "0",
    skills: {},
    occupationPointsTotal: 0,
    occupationPointsSpent: 0,
    personalPointsTotal: 0,
    personalPointsSpent: 0,
    equipment: [],
    cashOnHand: 0,
    weapons: [],
    notes: "Imported from Playwright",
  };
}

test.beforeEach(async ({ page }) => {
  await setEnglishLocale(page);
  await page.goto("/");
});

test("loads landing page and navigates to wizard", async ({ page }) => {
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("button", { name: "New Sheet" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Load JSON Sheet" })).toBeVisible();

  await page.getByRole("button", { name: "New Sheet" }).click();
  await expect(page).toHaveURL(/\/criar$/);
});

test("toggles language between English and Portuguese", async ({ page }) => {
  await expect(page.getByRole("button", { name: "New Sheet" })).toBeVisible();
  await expect(page.getByRole("button", { name: "PT" })).toBeVisible();

  await page.getByRole("button", { name: "PT" }).click();

  await expect(page.getByRole("button", { name: "Nova Ficha" })).toBeVisible();
  await expect(page.getByRole("button", { name: "EN" })).toBeVisible();
});

test("loads a valid JSON sheet and redirects to /ficha", async ({ page }) => {
  const fixture = buildFixtureSheet("Imported Investigator");
  const fileChooserPromise = page.waitForEvent("filechooser");

  await page.getByRole("button", { name: "Load JSON Sheet" }).click();

  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles({
    name: "investigator.json",
    mimeType: "application/json",
    buffer: Buffer.from(JSON.stringify(fixture), "utf-8"),
  });

  await expect(page).toHaveURL(/\/ficha$/);
  await expect(page.getByText("Imported Investigator")).toBeVisible();
});
