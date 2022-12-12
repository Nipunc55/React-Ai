import React, { useEffect, useState } from 'react'
import { NeuralNetwork, utilities } from 'brain.js'

const data = [
  { input: [0], output: [1] },
  { input: [1], output: [0] },
]

function AiModel() {
  const [diagram, setDiagram] = useState(null)
  const [netWork, setNetWork] = useState(null)
  const [result, setResult] = useState(null)

  const [value, setValue] = useState('')

  function handleChange(event) {
    setValue(event.target.value)
  }

  //   function handleClick() {
  //     // Do something with the value of the input here
  //     console.log(value)
  //   }

  useEffect(() => {
    TrainData()
  }, [])
  function TrainData() {
    const net = new NeuralNetwork()
    net.train(data)
    setDiagram(utilities.toSVG(net))
    setNetWork(net)
    // diagram.innerHTML = utilities.toSVG(net)
  }
  function Predict() {
    const array = value.split(',').map((item) => parseInt(item, 10))
    const prediction = netWork.run([value])
    setResult(prediction)
  }
  return (
    <>
      {' '}
      <div>{result}</div>
      <input type="text" value={value} onChange={handleChange} />
      {/* <div dangerouslySetInnerHTML={{ __html: diagram }} /> */}
      <button onClick={Predict}>Predict</button>
    </>
  )
}
export default AiModel
