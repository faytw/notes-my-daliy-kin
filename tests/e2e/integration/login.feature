Feature: The Login 
 
  App provide different mode to user, and user should choose 
  which mode dose he want to use in the app before login.

  Background:
    Given user goes to 'signin' page

  @frontend @element
  Scenario: Page elements should exist and display correctly
    Then app title should exist and it shows '馬雅曆共時筆記'
    And app infomation should exist
    And select of login mode should exist, and default as 'visit'
    And input of email should exist and have correct value as 'visit'
    And input of password should exist and have correct value as 'visit'
    And inputs of email and password should be disabled
    And submit button should exist and it shows '送出'
  
  @frontend @behavior
  Scenario: A user logs in with visitor mode
    Given user select login type as 'visit'
    And input of email should exist and have correct value as 'visit'
    And input of password should exist and have correct value as 'visit'
    And inputs of email and password should be disabled
    When user clicks submit button
    Then user logs in with 'visitor' mode successed

  @frontend @behavior
  Scenario: A user logs in with developer mode
    Given user select login type as 'develop'
    And input of email should exist and have correct value as 'develop'
    And input of password should exist and have correct value as 'develop'
    And inputs of email and password should be disabled
    When user clicks submit button
    Then user logs in with 'developer' mode successed
    
  @frontend @behavior
  Scenario Outline: A user logs in with member mode successed
    Given user select login type as 'member'
    And user types correct '<email>' and '<password>'
    When user clicks submit button
    Then user logs in with 'member' mode successed
  
    Examples:
    |email                       |password     |
    |developer-account@gmail.com |developer777 | 

  @frontend @behavior
  Scenario Outline: A user logs in with member mode failed
    Given user select login type as 'member'
    And user types incorrect '<email>' and '<password>'
    When user clicks submit button
    Then error message should shows up and it shows '帳號不存在'
    
    Examples:
    |email                   |password |
    |wrong-account@gmail.com |2wrfvn764| 