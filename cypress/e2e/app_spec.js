describe('End-to-End Test', () => {
    it('should log in and display user data', () => {
      // Visit the login page
      cy.visit('http://localhost:3000/');
  
      // Enter login credentials and submit
      cy.get('[data-testid="cypress-email"]').type('testuser');
      cy.get('[data-testid="cypress-password"]').type('password123');
      cy.get('[data-testid="cypress-submit"]').click();
  
      // Verify successful login by checking for a token or redirect
      cy.url().should('include', '/dashboard');
      
      // Fetch data from the API
      cy.intercept('GET', 'http://localhost:8000/api/data').as('getData');
      cy.wait('@getData').its('response.statusCode').should('eq', 200);
  
      // Verify data display
      cy.get('.data-item').should('have.length.greaterThan', 0);
      cy.get('.data-item').first().should('contain.text', 'Expected Data');
    });
  });
  