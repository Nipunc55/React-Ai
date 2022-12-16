import React, { useEffect, useState } from 'react'
import { NeuralNetwork, utilities, recurrent } from 'brain.js'

const data = [
  { input: 'I feel great about the world!', output: 'happy' },
  { input: 'The world is a terrible place!', output: 'sad' },
  { input: 'Hi', output: 'Hi how are you' },
  { input: 'Hi how are you', output: 'I am good' },
  { input: 'me too', output: 'nice' },
]
const defaultText = 'I didnt get that !'

function ChatAi() {
  const [loading, setLoading] = useState(true)
  const [netWork, setNetWork] = useState(null)
  const [result, setResult] = useState()

  const [value, setValue] = useState('')
  const [correctValue, setCorrectValue] = useState('')

  function handleChange(event) {
    setValue(event.target.value)
  }
  function handleChangeCorrect(event) {
    setCorrectValue(event.target.value)
  }

  useEffect(() => {
    setLoading(true)
    TrainData()
  }, [])
  function TrainData() {
    const net = new recurrent.LSTM()
    net.train(data, {
      iterations: 1000,
      log: true,
      callback: () => {
        setLoading(false)
      },
    })
    setNetWork(net)
  }
  function Predict() {
    const output = netWork.run(value)
    if (output === '') {
      setResult('defaultText')
      console.log('empty')
    }
    console.log(output)
    setResult(output)
  }
  function Save() {
    data.push({ input: value, output: correctValue })
    console.log(data)
  }
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div>{result}</div>
          <input type="text" value={value} onChange={handleChange} />

          <button onClick={Predict}>Predict</button>
          <button onClick={Save}>SaveData</button>
          <button onClick={TrainData}>TrainAi</button>
          <div>correct output</div>
          <input
            type="text"
            value={correctValue}
            onChange={handleChangeCorrect}
          />
        </>
      )}
    </>
  )
}
export default ChatAi
