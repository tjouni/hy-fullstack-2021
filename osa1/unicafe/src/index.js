import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ name, count, setFunction }) => {
  const increaseCount = () => setFunction(count + 1);
  return <button onClick={increaseCount}>{name}</button>;
};

const StatisticsTable = ({ good, neutral, bad, sum, avg, positive }) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>good</td>
          <td>{good}</td>
        </tr>
        <tr>
          <td>neutral</td>
          <td>{neutral}</td>
        </tr>
        <tr>
          <td>bad</td>
          <td>{bad}</td>
        </tr>
        <tr>
          <td>all</td>
          <td>{sum}</td>
        </tr>
        <tr>
          <td>average</td>
          <td>{avg}</td>
        </tr>
        <tr>
          <td>positive</td>
          <td>{positive} %</td>
        </tr>
      </tbody>
    </table>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const sum = good + neutral + bad;
  const avg = (good - bad) / sum || 0;
  const positive = (good / sum) * 100 || 0;
  const content =
    sum !== 0 ? (
      <div>
        <StatisticsTable
          good={good}
          neutral={neutral}
          bad={bad}
          sum={sum}
          avg={avg}
          positive={positive}
        />
      </div>
    ) : (
      <div>
        <p>No feedback given</p>
      </div>
    );

  return (
    <div>
      <h1>statistics</h1>
      {content}
    </div>
  );
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button name="good" count={good} setFunction={setGood} />
      <Button name="neutral" count={neutral} setFunction={setNeutral} />
      <Button name="bad" count={bad} setFunction={setBad} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
