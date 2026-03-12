import { expect, test } from "@playwright/test";
import { setEnglishLocale } from "./helpers";

test.beforeEach(async ({ page }) => {
  await setEnglishLocale(page);
  await page.goto("/criar");
});

test("requires name and occupation before advancing from Step 1", async ({ page }) => {
  const nextButton = page.getByRole("button", { name: "Next" });

  await expect(
    page.getByRole("heading", { level: 3, name: "Concept", exact: true }),
  ).toBeVisible();
  await expect(nextButton).toBeDisabled();

  await page.locator("input[name='name']").fill("Validation Investigator");
  await expect(nextButton).toBeDisabled();

  await page.locator("select[name='occupation']").selectOption({ index: 1 });
  await expect(nextButton).toBeEnabled();
});

test("can complete the full wizard and land on the sheet page", async ({ page }) => {
  const investigatorName = "E2E Full Flow Investigator";

  await page.locator("input[name='name']").fill(investigatorName);
  await page.locator("select[name='occupation']").selectOption({ index: 1 });

  await page.getByRole("button", { name: "Next" }).click();
  await expect(
    page.getByRole("heading", { level: 3, name: "Attributes", exact: true }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Next" }).click();
  await expect(
    page.getByRole("heading", { level: 3, name: "Age", exact: true }),
  ).toBeVisible();

  await page.locator("input[type='number']").first().fill("30");

  await page.getByRole("button", { name: "Next" }).click();
  await expect(
    page.getByRole("heading", { level: 3, name: "Occupation", exact: true }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Next" }).click();
  await expect(
    page.getByRole("heading", { level: 3, name: "Skills", exact: true }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Next" }).click();
  await expect(
    page.getByRole("heading", { level: 3, name: "Backstory", exact: true }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Next" }).click();
  await expect(
    page.getByRole("heading", { level: 3, name: "Review", exact: true }),
  ).toBeVisible();

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Save" }).click();
  await downloadPromise;

  await expect(page).toHaveURL(/\/ficha$/);
  await expect(page.getByText(investigatorName)).toBeVisible();
});
