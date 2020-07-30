import { Given, When, Then } from "cypress-cucumber-preprocessor/steps"

Then('app infomation should exist', () => {
  cy.get('[data-cy="Contnet-Login-Info-Title"]')
    .should('be.exist')
    .should('not.be.empty')

  cy.get('[data-cy="Contnet-Login-Info-Text"]')
    .should('be.exist')
    .should('not.be.empty')
})

Then('select of login mode should exist, and default as {string}', (type) => {
  const value = {
    visit: '以訪客身份登入',
    develop: '以測試帳號登入',
    member: '以認證帳號登入'
  }
  cy.get('[data-cy="Content-Login-Select"]')
    .prev()
    .should(($div) => expect($div).to.have.text(value[type]))
})

Then('input of email should exist and have correct value as {string}', (type) => {
  const email = {
    visit: Cypress.env('visitEmail'),
    develop: Cypress.env('developEmail'),
    member: Cypress.env('accountEmail')
  }
  cy.get('[data-cy="Content-Login-Input-Email"]').as('email')
    .should(($input) => {
      expect($input).to.be.exist
      expect($input).to.be.visible
      expect($input).to.be.value(email[type])
    })
})

Then('input of password should exist and have correct value as {string}', (type) => {
  const password = {
    visit: Cypress.env('visitPassword'),
    develop: Cypress.env('developPassword'),
    member: Cypress.env('accountPassword')
  }
  cy.get('[data-cy="Content-Login-Input-Password"]').as('password')
    .should(($input) => {
      expect($input).to.be.exist
      expect($input).to.be.visible
      expect($input).to.be.value(password[type])
    })
})

Then('inputs of email and password should be disabled', () => {
  cy.get('[data-cy="Content-Login-Input-Email"]').should('be.disabled')
  cy.get('[data-cy="Content-Login-Input-Password"]').should('be.disabled')
})

Then('submit button should exist and it shows {string}', (value) => {
  cy.get('[data-cy="Content-Login-Button-Submit"]')
      .should(($btn) => {
        expect($btn).to.be.exist
        expect($btn).to.be.visible
        expect($btn).to.be.text(value)
      })
})