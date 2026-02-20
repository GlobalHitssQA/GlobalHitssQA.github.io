Feature: Prospect search with no results in Acticenter

  Scenario: Advisor searches for a prospect that does not exist in database
    Given the advisor is authenticated in Acticenter with a valid Banca Patrimonial, Privada or Wealth Management user
    And the dashboard is displayed with the prospect search field available
    When the advisor enters more than 2 characters in the search field that do not match any existing prospect
    And the system executes the automatic search
    Then the system displays a message indicating no results were found
    And the advisor remains on the Acticenter dashboard
    And the advisor can perform a new search or access functions to register a new prospect