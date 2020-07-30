import {
  Then,
  Given,
  When
} from "cypress-cucumber-preprocessor/steps"

Given('user goes to {string} page', (pageName) => {
  cy.goToPage(pageName)
  cy.expectPathName(pageName)
})

Then('app title should exist and it shows {string}', (title) => {
  cy.get('[data-cy="Content-App-Link-Title"]')
    .should(($div) => {
      expect($div).to.be.exist
      expect($div).to.be.visible
      expect($div).to.text(title)
    })
})
