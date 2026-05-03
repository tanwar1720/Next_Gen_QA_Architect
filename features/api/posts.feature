@api
Feature: Posts API

  Scenario: List posts
    Given the posts API is available
    When I request the list of posts
    Then the response should be successful
    And the response should include posts

  Scenario: Create a post
    Given the posts API is available
    When I create a post with title "framework" and body "Created from a Gherkin scenario."
    Then the response status should be 201
