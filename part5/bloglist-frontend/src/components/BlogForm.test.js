import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'

test('5:16 when creating a new blog, event handler for adding blog is called with the right details', async () => {
  const mockAddBlog = jest.fn()

  const user = userEvent.setup()
  const { container } = render(<BlogForm addBlog={mockAddBlog} />)

  const titleInput = container.querySelector('#title-input')
  const authorInput = container.querySelector('#author-input')
  const urlInput = container.querySelector('#url-input')

  const saveButton = screen.getByText('create')
  await user.type(titleInput, 'test title')
  await user.type(authorInput, 'test author')
  await user.type(urlInput, 'test url')

  await user.click(saveButton)

  expect(mockAddBlog).toBeCalled
  expect(mockAddBlog.mock.calls[0][0].title).toBe('test title')
  expect(mockAddBlog.mock.calls[0][0].author).toBe('test author')
  expect(mockAddBlog.mock.calls[0][0].url).toBe('test url')
})