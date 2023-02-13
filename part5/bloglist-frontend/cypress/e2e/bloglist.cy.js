describe('template spec', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function () {
    cy.contains('login')
  })

  describe('login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username-input').type('gyehalim')
      cy.get('#password-input').type('1234567890')
      cy.contains('login').click()
      cy.get('.success').contains('gyeha lim logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username-input').type('gyehalim')
      cy.get('#password-input').type('wrong')
      cy.contains('login').click()

      cy.get('.error').contains('Wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('user can like a blog', function () {
    beforeEach(function () {
      cy.get('#username-input').type('gyehalim')
      cy.get('#password-input').type('1234567890')
      cy.contains('login').click()
      cy.get('.success').contains('gyeha lim logged in')
      cy.addBlog({ title: 'new test title', author: 'new test author', url: 'new test url' })
    })

    it.only('succeeds', function () {
      cy.contains('new test title').parent().find('button').click()
      cy.contains('likes').should('contain', 0)
      cy.contains('like').click()
      cy.contains('like').click()
      cy.contains('likes').should('contain', 2)
    })
  })
})