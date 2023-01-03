import { useState } from 'react'

const Section = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.quote}
      <br></br>
      has {props.vote} votes
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const updateSelected = () => {
    const getRandomInt = (max) => Math.floor(Math.random() * max)
    setSelected(getRandomInt(anecdotes.length))
  }

  const increaseVote = () => {
    const copyOfVotes = [...votes]
    copyOfVotes[selected] = copyOfVotes[selected] + 1
    setVotes(copyOfVotes)
  }

  const findMostVotedIndex = () => {
    let index = -1;
    let mostVotedCount = -Number.MAX_VALUE;
    for (const i of votes.keys()) {
      if (votes[i] >= mostVotedCount) {
        index = i
        mostVotedCount = votes[i]
      }
    }
    return index;
  }

  return (
    <div>
      <Section title="Anecdote of the day" quote={anecdotes[selected]} vote={votes[selected]} />
      <button onClick={increaseVote}>vote</button>
      <button onClick={updateSelected}>next anecdote</button>
      <Section title="Anecdote with most votes" quote={anecdotes[findMostVotedIndex()]} vote={votes[findMostVotedIndex()]} />
    </div>
  )
}

export default App
