import deepFreeze from 'deep-freeze'
import anecdoteReducer from './anecdoteReducer'

describe('anecdote reducer', () => {

  const initialState = [
    {
      content: 'If it hurts, do it more often',
      id: 1,
      votes: 0
    }
  ]

  test('vote can be incremented', () => {
    const action = {
      type: 'VOTE',
      payload: {
        id: 1
      }
    }
    const state = initialState

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)
    expect(newState).toEqual([
      {
        content: 'If it hurts, do it more often',
        id: 1,
        votes: 1
      }
    ])
  })
})