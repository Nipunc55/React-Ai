import React, { useEffect, useState } from 'react'
import { NeuralNetwork, utilities, recurrent } from 'brain.js'

const data = [
  'doe, a deer, a female deer',
  'ray, a drop of golden sun',
  'me, a name I call myself',
]

function ChatAi() {
  const [loading, setLoading] = useState(false)
  const [netWork, setNetWork] = useState(null)
  const [result, setResult] = useState(null)

  const [value, setValue] = useState('')

  function handleChange(event) {
    setValue(event.target.value)
  }

  useEffect(() => {
    setLoading(true)
    TrainData().then(() => {
      setLoading(false)
    })
  }, [])
  function TrainData() {
    const net = new recurrent.LSTM()
    net.train(data)
    setNetWork(net)
  }
  function Predict() {
    const output = netWork.run('I am brainjs')
    setResult(output)
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
        </>
      )}
    </>
  )
}
export default ChatAi
