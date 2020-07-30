import {
  Then,
  Given,
  When
} from "cypress-cucumber-preprocessor/steps"

Given('user goes to {string} page', (pageName) => {
  cy.goToPage(pageName)
  cy.expectPathName(pageName)
})

Then('user is in {string} page', (pageName) => {
  cy.expectPathName(pageName)
})

Given('input {string} with empty value of {string}', (field, page) => {
  cy.get(`[data-cy="Content-${page}-Input-${field}"]`)
    .should('be.empty')
})

When('user types invalid {string} in the input {string} of {string}', (value, field, page) => {
  cy.get(`[data-cy="Content-${page}-Input-${field}"]`)
    .type(value)
})

Then('error message {string} shows under the field {int}', (message ,index) => {
  cy.get('.v-messages')
    .children()
    .eq(index)
    .children()
    .should('be.exist')
    .should('be.visible')
    .should('be.text', message)
})

Then('app title should exist and it shows {string}', (title) => {
  cy.get('[data-cy="Content-App-Link-Title"]')
    .should(($div) => {
      expect($div).to.be.exist
      expect($div).to.be.visible
      expect($div).to.text(title)
    })
})

Then('notify shows up with confirm button', () => {
  cy.get('[data-cy="Content-Notify-Container"]').as('notify')
    .should('be.exist')
    .should('be.visible')

  cy.get('[data-cy="Content-Notify-Button-Confirm"]')
    .should('be.exist')
    .should('be.visible')
})

Then('notify shows up without confirm button', () => {
  cy.get('[data-cy="Content-Notify-Container"]').as('notify')
    .should('be.exist')
    .should('be.visible')

  cy.get('[data-cy="Content-Notify-Button-Confirm"]')
    .should('not.be.exist')
})

Then('notify message is {string}', (message) => {
  cy.get('[data-cy="Content-Notify-Container"]')
    .should('contain', message) 
})
