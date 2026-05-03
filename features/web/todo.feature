@web
Feature: TodoMVC web journey

  Scenario: Manage todos
    Given I open the TodoMVC app
    When I add these todos
      | title                         |
      | Design framework architecture |
      | Add Cucumber support          |
    Then I should see 2 todos
    When I complete the todo "Design framework architecture"
    Then I should see 1 active todo remaining
    When I filter completed todos
    Then I should see the todo "Design framework architecture"
    And I should not see the todo "Add Cucumber support"
    When I clear completed todos
    Then I should see 0 todos
