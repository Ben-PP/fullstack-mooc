import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const StatisticsLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good,neutral,bad}) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  const totalVotes = good+neutral+bad
  const avarage = (good - bad)/(good + bad) || 0
  const positivePercentage = good/totalVotes
  return (
    <>
      <h1>Statistics</h1>
      <table>
        <thead>
          <StatisticsLine text={"good"} value={good}/>
          <StatisticsLine text={"neutral"} value={neutral}/>
          <StatisticsLine text={"bad"} value={bad}/>
          <StatisticsLine text={"all"} value={totalVotes}/>
          <StatisticsLine text={"avarage"} value={avarage}/>
          <StatisticsLine text={"positive"} value={positivePercentage*100+"%"}/>
        </thead>
      </table>
    </>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addPositive = () => {
    setGood(good + 1)
  }

  const addNeutral = () => {
    setNeutral(neutral + 1)
  }

  const addNegative = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={addPositive} text={"good"}/>
      <Button handleClick={addNeutral} text={"neutral"}/>
      <Button handleClick={addNegative} text={"bad"}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App