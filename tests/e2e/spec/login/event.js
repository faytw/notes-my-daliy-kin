import { Given, When, Then } from "cypress-cucumber-preprocessor/steps"

Given('user select login type as {string}', (type) => {
  const options = {
    member: 2,
    develop: 1,
    visit: 0
  }
  cy.get('.v-select').as('select')
  cy.get('@select').click()
  cy.wait(300)
  cy.get('.v-select-list').children().as('options')
  cy.get('@options')
    .eq(options[type])
    .click()
})

When('user clicks submit button', () => {
  cy.get('[data-cy="Content-Login-Button-Submit"]').as('submit')
    .click()
})

Then('user logs in with {string} mode successed', (mode) => {
  const infos = {
    visitor: 'visitor',
    developer: 'developer1',
    member: 'developer1'
  }
  const userName = infos[mode]
  cy.expectPathName('index')
  cy.get('[data-cy="Content-App-User-Info-Name"]').as('username')
    .should(($div) => expect($div).to.be.text(userName))
})

Then('user types {string} and {string}', (email, password) => {
  cy.login(email, password)
})
