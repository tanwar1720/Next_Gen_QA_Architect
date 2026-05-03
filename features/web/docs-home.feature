@web
Feature: Documentation web journey

  Scenario: Open the get started guide
    Given I open the documentation home page
    When I navigate to the get started guide
    Then I should see the installation guide
