const { test, expect } = require("@playwright/test");

test.describe("Login", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("Validate load login page", async ({ page }) => {
    await page.goto("/login");

    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
  });
});
