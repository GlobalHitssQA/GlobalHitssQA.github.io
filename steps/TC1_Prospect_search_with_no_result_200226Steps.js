const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterDashboardPage = require('../pages/ActicenterDashboardPage');

let dashboardPage;

Given('the advisor is authenticated in Acticenter with a valid Banca Patrimonial, Privada or Wealth Management user', async function() {
  dashboardPage = new ActicenterDashboardPage(this.page);
  await dashboardPage.navigateToActicenter();
  await dashboardPage.loginAsAdvisor(this.credentials.username, this.credentials.password);
});

Given('the dashboard is displayed with the prospect search field available', async function() {
  const isDashboardVisible = await dashboardPage.isDashboardDisplayed();
  expect(isDashboardVisible).toBe(true);
  const isSearchFieldVisible = await dashboardPage.isProspectSearchFieldVisible();
  expect(isSearchFieldVisible).toBe(true);
});

When('the advisor enters more than 2 characters in the search field that do not match any existing prospect', async function() {
  await dashboardPage.enterProspectSearchText('XYZNONEXISTENT123');
});

When('the system executes the automatic search', async function() {
  await dashboardPage.waitForSearchExecution();
});

Then('the system displays a message indicating no results were found', async function() {
  const noResultsMessageVisible = await dashboardPage.isNoResultsMessageDisplayed();
  expect(noResultsMessageVisible).toBe(true);
});

Then('the advisor remains on the Acticenter dashboard', async function() {
  const isDashboardVisible = await dashboardPage.isDashboardDisplayed();
  expect(isDashboardVisible).toBe(true);
  const isProspectSelected = await dashboardPage.isAnyProspectSelected();
  expect(isProspectSelected).toBe(false);
});

Then('the advisor can perform a new search or access functions to register a new prospect', async function() {
  const isSearchFieldEnabled = await dashboardPage.isProspectSearchFieldEnabled();
  expect(isSearchFieldEnabled).toBe(true);
  const isNewProspectButtonVisible = await dashboardPage.isNewProspectButtonVisible();
  expect(isNewProspectButtonVisible).toBe(true);
});