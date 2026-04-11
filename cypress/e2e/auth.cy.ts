describe('Authentication Flow', () => {
  it('should show validation errors on empty login form', () => {
    cy.visit('/login')
    cy.get('button[type="submit"]').click()
    cy.contains('Invalid email address').should('be.visible')
    cy.contains('Password is required').should('be.visible')
  })

  it('should navigate to register page', () => {
    cy.visit('/login')
    cy.contains('REGISTER').click()
    cy.url().should('include', '/register')
  })

  it('should handle successful registration and redirect to login', () => {
    // Mocking the API response
    cy.intercept('POST', '**/users/register', {
      statusCode: 201,
      body: { success: true, message: 'Registration successful' }
    }).as('registerRequest')

    cy.visit('/register')
    cy.get('input[name="name"]').type('John Doe')
    cy.get('input[name="username"]').type('johndoe')
    cy.get('input[name="email"]').type('johndoe@example.com')
    cy.get('input[name="password"]').type('password123')
    
    cy.get('button[type="submit"]').click()
    
    cy.wait('@registerRequest')
    cy.contains('Registration successful').should('be.visible')
    cy.url().should('include', '/login')
  })
})
