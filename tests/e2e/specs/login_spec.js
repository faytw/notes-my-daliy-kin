describe('Login test', () => {
  it('Visits the sigin page', () => {
    cy.goToPage('signin')
    cy.expectPathName('signin')
  })

  it('Checks app bar', () => {
    cy.get('[data-cy="Content-App-Top-Bar"]').as('bar')
      .should(($div) => {
        expect($div).to.be.exist
        expect($div).to.be.visible
      })
  })

  it('Checks app title', () => {
    cy.get('[data-cy="Content-App-Link-Title"]').as('title')
      .should(($div) => {
        expect($div).to.be.exist
        expect($div).to.be.visible
        expect($div).to.text('馬雅曆共時筆記')
      })
  })

  it('Checks signin select --- default value', () => {
    cy.get('[data-cy="Content-Login-Select"]')
      .prev()
      .should(($div) => expect($div).to.have.text('以訪客身份登入'))
  })

  it('Checks signin select -- options', () => {
    cy.get('.v-select').as('select')
      .should(($div) => {
        expect($div).to.be.exist
        expect($div).to.be.visible
      })

    cy.get('@select').click()
    cy.get('.v-select-list')
      .children().as('options')
      .should(($options) => {
        expect($options).to.have.length(3)
      })

    cy.get('@options')
      .eq(0)
      .should(($div) => expect($div).to.have.text('以訪客身份登入'))

    cy.get('@options')
      .eq(1)
      .should(($div) => expect($div).to.have.text('以測試帳號登入'))

    cy.get('@options')
      .eq(2)
      .should(($div) => expect($div).to.have.text('以認證帳號登入'))
  })

  it('Checks signin form input -- email', () => {
    cy.get('[data-cy="Content-Login-Input-Email"]').as('email')
      .should(($input) => {
        expect($input).to.be.exist
        expect($input).to.be.visible
        expect($input).to.be.disabled
        expect($input).to.be.value(Cypress.env('visitEmail'))
      })

    cy.get('@email')
      .prev()
      .should(($label) => expect($label).to.be.text('Email'))
  })

  it('Checks signin form input -- password', () => {
    cy.get('[data-cy="Content-Login-Input-Password"]').as('password')
      .should(($input) => {
        expect($input).to.be.exist
        expect($input).to.be.visible
        expect($input).to.be.disabled
        expect($input).to.be.value(Cypress.env('visitPassword'))
      })

    cy.get('@password')
      .prev()
      .should(($label) => expect($label).to.be.text('密碼'))
  })

  it('Checks signin submit', () => {
    cy.get('[data-cy="Content-Login-Button-Submit"]')
      .should(($btn) => {
        expect($btn).to.be.exist
        expect($btn).to.be.visible
        expect($btn).to.be.text('送出')
      })
  })
})

describe('Login Test -- Behavior', () => {
  it('Sigin with "visit" type successed', () => {
    const email = Cypress.env('visitEmail')
    const password = Cypress.env('visitPassword')

    cy.goToPage('signin')
    cy.expectPathName('signin')

    cy.get('.v-select').as('select')
    cy.get('@select').click()
    cy.wait(300)
    cy.get('.v-select-list').children().as('options')
    cy.get('@options')
      .eq(0)
      .click()

    cy.get('[data-cy="Content-Login-Input-Email"]').as('email')
      .should(($input) => {
        expect($input).to.be.exist
        expect($input).to.be.visible
        expect($input).to.be.disabled
        expect($input).to.be.value(email)
      })

    cy.get('[data-cy="Content-Login-Input-Password"]').as('password')
      .should(($input) => {
        expect($input).to.be.exist
        expect($input).to.be.visible
        expect($input).to.be.disabled
        expect($input).to.be.value(password)
    })

    cy.get('[data-cy="Content-Login-Button-Submit"]').as('submit')
      .click()

    cy.expectPathName('index')
    cy.get('[data-cy="Content-App-User-Info-Name"]').as('username')
      .should(($div) => expect($div).to.be.text('visitor'))
  }) 

  it('Sigin with "develop" type successed', () => {
    const email = Cypress.env('developEmail')
    const password = Cypress.env('developPassword')

    cy.goToPage('signin')
    cy.expectPathName('signin')

    cy.get('.v-select').as('select')
    cy.get('@select').click()
    cy.wait(300)
    cy.get('.v-select-list').children().as('options')
    cy.get('@options')
      .eq(1)
      .click()

    cy.get('[data-cy="Content-Login-Input-Email"]').as('email')
      .should(($input) => {
        expect($input).to.be.exist
        expect($input).to.be.visible
        expect($input).to.be.disabled
        expect($input).to.be.value(email)
      })

    cy.get('[data-cy="Content-Login-Input-Password"]').as('password')
      .should(($input) => {
        expect($input).to.be.exist
        expect($input).to.be.visible
        expect($input).to.be.disabled
        expect($input).to.be.value(password)
      })

    cy.get('[data-cy="Content-Login-Button-Submit"]').as('submit')
      .click()

    cy.expectPathName('index')
    cy.get('[data-cy="Content-App-User-Info-Name"]').as('username')
      .should(($div) => expect($div).to.be.text('developer1'))
  })

  it('Sigin with "account" type successed', () => {
    const email = Cypress.env('accountEmail')
    const password = Cypress.env('accountPassword')

    cy.goToPage('signin')
    cy.expectPathName('signin')

    cy.get('.v-select').as('select')
    cy.get('@select').click()
    cy.wait(300)
    cy.get('.v-select-list').children().as('options')
    cy.get('@options')
      .eq(2)
      .click()

    cy.get('[data-cy="Content-Login-Input-Email"]').as('email')
      .should(($input) => {
        expect($input).to.be.exist
        expect($input).to.be.visible
        expect($input).to.not.be.disabled
      })

    cy.get('[data-cy="Content-Login-Input-Password"]').as('password')
      .should(($input) => {
        expect($input).to.be.exist
        expect($input).to.be.visible
        expect($input).to.not.be.disabled
      })

    cy.login(email, password)

    cy.get('@email').should(($input) => expect($input).to.be.value(email))
    cy.get('@password').should(($input) => expect($input).to.be.value(password))

    cy.get('[data-cy="Content-Login-Button-Submit"]').as('submit')
      .click()

    cy.expectPathName('index')
    cy.get('[data-cy="Content-App-User-Info-Name"]').as('username')
      .should(($div) => expect($div).to.be.text('developer1'))
  })
})
