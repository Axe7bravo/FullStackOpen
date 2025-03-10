import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.onClick}>{props.text}</button>
)

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
}

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad;
  const average = total === 0 ? 0 : (props.good * 1 + props.neutral * 0 + props.bad * -1) / total;
  const positivePercentage = total === 0 ? 0 : (props.good / total) * 100;

  let emoji = "";


  if(total === 0){

      return (
        <div>
            <h1>statistics</h1>
            <p>No feedback given yet</p>
        </div>
      )
  }

  if (average < 0) {
    emoji = "😞"; // when average is negative
  } else if (average > 0) {
    emoji = "😊"; // when average is positive
  }

  return (
    <div>
      <h1>statistics {emoji}</h1>
      <table>
        <tbody> 
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={`${positivePercentage}%`} />
        </tbody>
      </table>
    </div>
  );

  
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)



  return (
    <div>
      <h1>give feedback </h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />

      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

export default App