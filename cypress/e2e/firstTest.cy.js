describe('End-to-End Test', () => {
  it('should log in and display user data', () => {
    // Visit the login page
    cy.visit('http://localhost:3000/');

    // Enter login credentials and submit
   
    
    cy.get('#whatTask')
    .click({force:true})
    .get('input[data-testid="cypress-email"]')
    .click({force:true})
    .type("username123")

    cy.get('#whatTask')
    .click({force:true})
    .get('input[data-testid="cypress-password"]')
    .click({force:true})
    .type("password123")
    //cy.get('input[data-testid="cypress-password"]').type('password123');
    
    cy.get('#whatTask')
    .click({force:true})
    .get('button[data-testid="cypress-submit"]')
    .click({force:true})
    //cy.get('button[data-testid="cypress-submit"]').click();
    
    
    cy.intercept('POST', '/api/create-new-post', (req) => {
      // You can modify the request here if needed
      req.continue((res) => {
        // Modify the response if needed
        console.log(req)
        res.send({ success: true });
      });
    }).as('postRequest');

 


  });
});
