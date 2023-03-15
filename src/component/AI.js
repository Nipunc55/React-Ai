import React, { useEffect, useState } from 'react'
import { NeuralNetwork, utilities } from 'brain.js'

const data = [
  { input: [0], output: [1] },
  { input: [1], output: [0] },
]

let colorInput = []
function AiModel() {
  const [diagram, setDiagram] = useState(null)
  const [netWork, setNetWork] = useState(null)
  const [result, setResult] = useState(null)
  const [inputBottomcolor, setBottomColor] = useState()
  const [inputTopColor, setTopColor] = useState(null)

  const [value, setValue] = useState('')

  function handleChange(event) {
    setValue(event.target.value)
  }
  function Store() {
    colorInput.push({
      input: ConvertColorToInt(inputTopColor),
      output: ConvertColorToInt(inputBottomcolor),
    })

    console.log(colorInput)
  }
  function ConvertColorToInt(color) {
    //const colorCode = parseInt(color.slice(1), 16)
    const hexColorCode = color.slice(1)
    const red = parseInt(hexColorCode.substring(0, 2), 16) / 255 // Extract red component and convert to decimal
    const green = parseInt(hexColorCode.substring(2, 4), 16) / 255 // Extract green component and convert to decimal
    const blue = parseInt(hexColorCode.substring(4, 6), 16) / 255 // Extract blue component and convert to decimal
    // console.log(`RGB values: (${red}, ${green}, ${blue})`)
    const colorCode = { r: red, g: green, b: blue }
    return colorCode
  }
  function ConvertIntToColor(colorInt) {
    const hexColorCode = '#' + colorInt.toString(16)
    return hexColorCode
  }

  useEffect(() => {
    //TrainData()
  }, [])
  function TrainData() {
    const net = new NeuralNetwork()
    net.train(colorInput)
    // setDiagram(utilities.toSVG(net))
    setNetWork(net)
    // diagram.innerHTML = utilities.toSVG(net)
  }
  function Predict() {
    let doc = document.getElementById('result-top')
    const input = ConvertColorToInt(value)
    // console.log(input)
    // const array = value.split(',').map((item) => parseInt(item, 10))
    const prediction = netWork.run(input)
    //doc.style.backgroundColor = prediction
    //setResult(prediction)
    doc.style.backgroundColor = `rgba(${prediction.r * 255}, ${
      prediction.g * 255
    }, ${prediction.b * 255})`
    console.log(prediction)
  }
  return (
    <>
      {' '}
      <div id="result-top" className="result">
        {inputTopColor}
      </div>
      <div id="result-bottom" className="result">
        {inputBottomcolor}
      </div>
      <input type="color" value={value} onChange={handleChange} />
      {/* <div dangerouslySetInnerHTML={{ __html: diagram }} /> */}
      <button onClick={Predict}>Predict</button>
      <input
        type="color"
        onChange={(e) => setTopColor(e.target.value)}
        id="colorPicker"
      ></input>
      <input
        type="color"
        onChange={(e) => setBottomColor(e.target.value)}
        id="colorPicker"
      ></input>
      <button onClick={Store}>Add</button>
      <button onClick={TrainData}>Train</button>
    </>
  )
}
export default AiModel
