import { expect, Page } from "@playwright/test";

export async function setEnglishLocale(page: Page): Promise<void> {
  await page.addInitScript(() => {
    localStorage.setItem("coc.locale", "en");
  });
}

export async function completeWizardToSheet(
  page: Page,
  investigatorName = "E2E Investigator",
): Promise<void> {
  await page.goto("/criar");

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
}
