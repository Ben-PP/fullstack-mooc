import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      anecdote: 'If it hurts, do it more often.',
      votes: 0
    },
    {
      anecdote: 'Adding manpower to a late software project makes it later!',
      votes: 0
    },
    {
      anecdote: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      votes: 0
    },
    {
      anecdote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      votes: 0
    },
    {
      anecdote: 'Premature optimization is the root of all evil.',
      votes: 0
    },
    {
      anecdote: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      votes: 0
    },
    {
      anecdote: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
      votes: 0
    }
  ])
  const [selected, setSelected] = useState(0)

  const generateRandomInt = (max) => {
    return Math.floor(Math.random() * max) + 1
  }

  const handleNext = () => {
    setSelected(generateRandomInt(anecdotes.length-1))
  }

  const handleVote = () => {
    const newAnecdotes = [...anecdotes]
    newAnecdotes[selected].votes = anecdotes[selected].votes + 1
    setAnecdotes(newAnecdotes)
  }

  const mostVotedAnecdote = () => {
    const onlyVotes = anecdotes.map((element) => {
      return element.votes
    })
    let max = onlyVotes[0]
    let maxIndex = 0
    for (let i = 1; i < onlyVotes.length; i++) {
      if (onlyVotes[i] > max) {
        maxIndex = i;
        max = onlyVotes[i]
      }
    }
    return anecdotes[maxIndex]
  }

  return (
    <div>
      <p>{anecdotes[selected].anecdote}</p>
      <p>Has {anecdotes[selected].votes} votes</p>
      <Button handleClick={handleVote} text="Vote"/>
      <Button handleClick={handleNext} text="Next anecdote"/>
      <h1>Anecdote with the most votes</h1>
      <p>{mostVotedAnecdote().anecdote}</p>
      <p>has {mostVotedAnecdote().votes}</p>
    </div>
  )
}

export default App
