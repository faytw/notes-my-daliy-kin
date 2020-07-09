Cypress.Commands.add('expectPathName', (pathName) => {
    cy.location()
    .should((location) => expect(location.hash).to.eq(`#/${pathName}`))
})

Cypress.Commands.add('goToPage', (pathName) => {
    const host = 'http://localhost:8080/#'
    cy.visit(`${host}/${pathName}`)
    cy.wait(400)
})

Cypress.Commands.add("login", (email, password) => {  
    cy.get('@email').type(email)
    cy.get('@password').type(password)
})
