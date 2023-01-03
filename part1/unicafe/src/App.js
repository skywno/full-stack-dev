import { useState } from 'react'

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ text, value, suffix }) => <div>{text} {value} {suffix}</div>

const Statistics = ({ good, bad, neutral }) => {

  const sum = good + bad + neutral
  const average = sum === 0 ? 0 : (good - bad) / sum
  const positive = sum === 0 ? 0 : good / sum * 100

  if (sum > 0) {
    return (
      <div>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={sum} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive} suffix="%" />
      </div>
    )
  } else {
    return (
      <div>
        No feedback given
      </div>
    )
  }
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)

  const increaseNeutral = () => setNeutral(neutral + 1)

  const increaseBad = () => setBad(bad + 1)


  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={increaseGood} />
      <Button text="netural" onClick={increaseNeutral} />
      <Button text="bad" onClick={increaseBad} />
      <h1>Statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App
