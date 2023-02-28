import { useMutation, useQueryClient } from "react-query"
import { createAnecdote } from "../requests"
import { useNotify } from "../NotificationContext"

const AnecdoteForm = () => {
  const notifyWith = useNotify()
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      // queryClient.invalidateQueries('anecdotes')
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
    },
    onError: (err) => {
      console.log(err)
      notifyWith(err.response.data.error)
    }
  })

  const generateId = () => Number(Math.random() * 1000000).toFixed(0)

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, id: generateId(), votes: 0 })
    notifyWith(`You created '${content}'`)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
