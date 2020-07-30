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
    And user types '<email>' and '<password>'
    When user clicks submit button
    Then user logs in with 'member' mode successed
  
    Examples:
    |email                       |password     |
    |developer-account@gmail.com |developer777 | 

  @frontend @behavior
  Scenario Outline: A user logs in with member mode failed
    Given user select login type as 'member'
    And user types '<email>' and '<password>'
    When user clicks submit button
    Then notify shows up without confirm button
    And notify message is '帳號不存在'
    And user is in 'signin' page
    
    Examples:
    |email                   |password |
    |wrong-account@gmail.com |2wrfvn764| 

  @frontend @field-validation
  Scenario Outline: Input fields with empty value
    Given user select login type as 'member'
    And input '<field>' with empty value of '<page>'
    When user clicks submit button
    Then error message '<message>' shows under the field <index>

    Examples:
      | field    | message     | index | page  |
      | Email    | Email 為必填 | 0     | Login |
      | Password | 密碼 為必填   | 1     | Login |

  @frontend @field-validation
  Scenario Outline: user types invalid value in the input field
    Given user select login type as 'member'
    And user types invalid '<value>' in the input '<field>' of '<page>'
    Then error message '<message>' shows under the field <index>

    Examples:
      | field    | value            | message               | index | page  |
      | Email    | iuegyvg          | Email 須為有效的電子信箱 | 0     | Login |
      | Email    | ayhv754@vjdl     | Email 須為有效的電子信箱 | 0     | Login |
      | Email    | ayhv754@vjdl.jd  | Email 須為有效的電子信箱 | 0     | Login |




  
    