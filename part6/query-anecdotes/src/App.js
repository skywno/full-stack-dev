import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { getAllAnecdotes, updateAnecdote } from './requests'
import { useNotify } from './NotificationContext'

const App = () => {

  const result = useQuery(
    'anecdotes',
    getAllAnecdotes,
    {
      retry: 1
    }
  )

  const notifyWith = useNotify()
  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: ({ content }) => {
      queryClient.invalidateQueries('anecdotes')
      notifyWith(`anecdote '${content}' voted`)
    }
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }


  if (result.isLoading) {
    return <div> loading data ...</div>
  }

  if (result.isError) {
    return <div> anecdote service not available due to problems in server</div>
  }

  console.log(result)
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
