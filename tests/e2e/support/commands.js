Cypress.Commands.add('expectPathName', (pathName) => {
    cy.location()
    .should((location) => expect(location.hash).to.eq(`#/${pathName}`))
})

Cypress.Commands.add("login", (type, email, password) => {  
    cy.get('@email').type(email)
    cy.get('@password').type(password)
})
