const { test, expect } = require("@playwright/test");

test.describe("Login", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("Validate load login page", async ({ page }) => {
    await page.goto("/login");

    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
  });

  test("Validate successful login", async ({ page }) => {
    await page.goto("https://catapi-eight.vercel.app/");
    await page.getByRole("link", { name: "Login" }).click();
    await page.getByPlaceholder("email / user / unique id").click();
    await page.getByPlaceholder("email / user / unique id").fill("rui");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.getByRole("link", { name: "Logout" })).toBeVisible();
    const isLoggedIn = await page.evaluate(() =>
      localStorage.getItem("isLoggedIn")
    );
    const user = await page.evaluate(() => localStorage.getItem("user"));

    expect(isLoggedIn).toBe("true");
    expect(user).not.toBeNull();
    expect(user).toBe("113286"); // result of the hash function for "rui"
  });

  test("Validate successful logout", async ({ page }) => {
    await page.goto("https://catapi-eight.vercel.app/");
    await page.getByRole("link", { name: "Login" }).click();
    await page.getByPlaceholder("email / user / unique id").click();
    await page.getByPlaceholder("email / user / unique id").fill("rui");
    await page.getByRole("button", { name: "Login" }).click();
    await page.getByRole("link", { name: "Logout" }).click();
    await expect(page.getByRole("link", { name: "Login" })).toBeVisible();

    const isLoggedIn = await page.evaluate(() =>
      localStorage.getItem("isLoggedIn")
    );
    const user = await page.evaluate(() => localStorage.getItem("user"));

    expect(isLoggedIn).toBeNull;
    expect(user).toBeNull();
  });
});
