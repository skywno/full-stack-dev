import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'


const generateId = () => Number((Math.random() * 1000000).toFixed(0))

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      const anecdote = action.payload
      state.push(anecdote)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})


export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const allAnecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(allAnecdotes))
  }
}

export const vote = id => {
  return async dispatch => {
    await anecdoteService.increaseVoteByOne(id)
    const allAnecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(allAnecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew({
      content,
      id: generateId(),
      votes: 0
    })
    dispatch(appendAnecdote(anecdote))
  }
}
export default anecdoteSlice.reducer