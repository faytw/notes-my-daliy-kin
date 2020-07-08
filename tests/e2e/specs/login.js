const bar = cy.get('[data-cy="Content-App-Top-Bar"]').as('bar')
const title = cy.get('[data-cy="Content-App-Link-Title"]').as('title')
const select = cy.get('[data-cy="Content-Login-Select"]').as('select')
const email = cy.get('[data-cy="Content-Login-Input-Email"]').as('email')
const password = cy.get('[data-cy="Content-Login-Input-Password"]').as('password')
const submit = cy.get('[data-cy="Content-Login-Button-Submit"]').as('submit')

describe('Login Test -- UI', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.expectPathName('signin')
  })

  it('App bar is exist.', () => {

  })

  it('App title is exist.', () => {

  })

  it('App select is exist.', () => {

  })

  it('App submit is exist.', () => {

  })

  it('App select has three options.', () => {

  })

  it('App select has default value.', () => {

  })
})

describe('Login Test -- Behavior -- Sigin with "visit" type', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.expectPathName('signin')
  })

})

describe('Login Test -- Behavior -- Sigin with "develop" type', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.expectPathName('signin')
  })

})

describe('Login Test -- Behavior -- Sigin with "account" type', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.expectPathName('signin')
  })

  it('Signin with "account"', {
    env: {
      type: 'account',
      email: '',
      password: ''
    }
  }, () => {
    const type = Cypress.env('type')
    const email = Cypress.env('email')
    const password = Cypress.env('password')
    
    cy.login('account', email, password)
  })
})
