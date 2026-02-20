class ActicenterDashboardPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://actinver.atlassian.net';
    
    // Locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.dashboardContainer = '[data-testid="acticenter-dashboard"]';
    this.prospectSearchField = '[data-testid="prospect-search-input"]';
    this.searchButton = '[data-testid="search-button"]';
    this.searchResultsList = '[data-testid="search-results-list"]';
    this.noResultsMessage = '[data-testid="no-results-message"]';
    this.prospectSelectionIndicator = '[data-testid="selected-prospect-indicator"]';
    this.newProspectButton = '[data-testid="new-prospect-button"]';
    this.errorMessage = '[data-testid="error-message"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async loginAsAdvisor(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForSelector(this.dashboardContainer, { state: 'visible' });
  }

  async isDashboardDisplayed() {
    return await this.page.isVisible(this.dashboardContainer);
  }

  async isProspectSearchFieldVisible() {
    return await this.page.isVisible(this.prospectSearchField);
  }

  async isProspectSearchFieldEnabled() {
    return await this.page.isEnabled(this.prospectSearchField);
  }

  async enterProspectSearchText(searchText) {
    await this.page.fill(this.prospectSearchField, searchText);
  }

  async waitForSearchExecution() {
    await this.page.waitForTimeout(1500);
    await this.page.waitForLoadState('networkidle');
  }

  async isNoResultsMessageDisplayed() {
    return await this.page.isVisible(this.noResultsMessage);
  }

  async getNoResultsMessageText() {
    return await this.page.textContent(this.noResultsMessage);
  }

  async isAnyProspectSelected() {
    return await this.page.isVisible(this.prospectSelectionIndicator);
  }

  async isNewProspectButtonVisible() {
    return await this.page.isVisible(this.newProspectButton);
  }

  async clickNewProspectButton() {
    await this.page.click(this.newProspectButton);
  }

  async clearSearchField() {
    await this.page.fill(this.prospectSearchField, '');
  }

  async isErrorMessageDisplayed() {
    return await this.page.isVisible(this.errorMessage);
  }

  async getErrorMessageText() {
    return await this.page.textContent(this.errorMessage);
  }
}

module.exports = ActicenterDashboardPage;