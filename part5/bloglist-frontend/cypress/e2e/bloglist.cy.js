beforeEach(function () {
  cy.request('POST', 'http://localhost:3003/api/testing/reset')
  cy.addUser({ username: 'gyehalim', name: 'gyeha lim', password: '1234567890' })
  cy.addUser({ username: 'jisungpark', name: 'jisung park', password: '1234567890' })
  cy.visit('http://localhost:3000')
})

describe('login', function () {
  it('login form is shown', function () {
    cy.contains('login')
  })

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

describe('user', function () {
  beforeEach(function () {
    cy.get('#username-input').type('gyehalim')
    cy.get('#password-input').type('1234567890')
    cy.contains('login').click()
    cy.get('.success').contains('gyeha lim logged in')
    cy.addBlog({ title: 'new test title', author: 'new test author', url: 'new test url' })
  })

  it('can like a blog', function () {
    cy.contains('new test title').parent().find('button').click()
    cy.contains('likes').should('contain', 0)
    cy.contains('like').click()
    cy.contains('likes').should('contain', 1)
  })

  it('can delete the blog that the user created', function () {
    cy.get('.blogInShort').should('have.css', 'display', 'block')
    cy.get('.blogInShort').contains('new test title').parent().find('#view-button').click()
    cy.get('.blogInShort').should('have.css', 'display', 'none')
    cy.get('.blogInDetail').should('have.css', 'display', 'block')
    cy.get('.blogInDetail').contains('new test title').parent().find('#delete-button').click()
    cy.should('not.contain', 'new test title')
  })

  it.only('cannot delete the blog that another user created', function () {
    cy.contains('logout').click()
    cy.get('#username-input').type('jisungpark')
    cy.get('#password-input').type('1234567890')
    cy.contains('login').click()
    cy.get('.success').contains('jisung park logged in')

    cy.get('.blogInShort').contains('new test title').parent().find('#view-button').click()
    cy.get('.blogInDetail').should('not.have.id', '#delete-button')
  })
})
