Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
   
    firstName: 'Luisa',
    lastName: 'Leitão',
    email: 'luisaleitao@gmail.com'


}) => {

    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.contains('button','Enviar').click()


})