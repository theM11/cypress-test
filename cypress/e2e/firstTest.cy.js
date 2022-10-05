/// <reference types="cypress" />


describe('Salsita test spec', () => {
  it('should visit page and do some action', () => {
    var testArray = []
    cy.visit(Cypress.env('login_url'))
    cy.get('.enterButton').click()
    cy.url().should('include', '/code')
    cy.get('[name="secret"]').invoke('attr', 'value').then(($secret) => {
      const secretValue = $secret
      cy.get('[id="code"]').type(secretValue)
    })
    cy.get('[id="isRobot"]').check()
    cy.get('[type="submit"]').click()
    cy.url().should('include', '/lists')
    // cy.url().should('include', '/commands/actions')
    cy.get('[qa-id="Awesome"]').children().should('have.length', 5) // li a druhy text spanu
    cy.get('[qa-id="Famous"]').children().should('have.length', 5)
    cy.get('h2').get('strong').each(x=>{
      expect(x.text()).to.be.oneOf([
        "Famous quotes",
        "Awesome quotes"
      ])
    })
    cy.get('h2').get('strong').should('have.length', 2)
    cy.get('.score').each(x=>{
      var value = parseInt(x.text())
      testArray.push(value)
      var result = testArray.reduce((a, b) => a + b, 0)
      cy.log(result)
    })
    cy.get('[id=summary]').invoke('text')
  })
})