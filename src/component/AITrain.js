import React, { useEffect, useState } from 'react'
import { NeuralNetwork } from 'brain.js'
import { Row, Col } from 'react-bootstrap'
import MassageBox from './MassageBox'

let colorInput = []
export default function AITrain() {
  // const [diagram, setDiagram] = useState(null)
  const [netWork, setNetWork] = useState(null)
  // const [result, setResult] = useState(null)
  const [inputBottomColor, setBottomColor] = useState('#000000')
  const [inputTopColor, setTopColor] = useState('#000000')
  const [massage, setMassage] = useState(
    'Please Train the AI by Adding matching colors !',
  )

  function Store() {
    colorInput.push({
      input: ConvertColorToInt(inputTopColor),
      output: ConvertColorToInt(inputBottomColor),
    })
    setMassage(
      colorInput.length + ' Color pairs added to train ,Ready to train',
    )

    console.log(colorInput.length)
  }
  useEffect(() => {
    let doc = document.getElementById('result-top')
    doc.style.backgroundColor = inputTopColor
  }, [inputTopColor])
  useEffect(() => {
    let doc = document.getElementById('result-bottom')
    doc.style.backgroundColor = inputBottomColor
  }, [inputBottomColor])

  function ConvertColorToInt(color) {
    //const colorCode = parseInt(color.slice(1), 16)
    let colorCode
    try {
      const hexColorCode = color.slice(1)
      const red = parseInt(hexColorCode.substring(0, 2), 16) / 255 // Extract red component and convert to decimal
      const green = parseInt(hexColorCode.substring(2, 4), 16) / 255 // Extract green component and convert to decimal
      const blue = parseInt(hexColorCode.substring(4, 6), 16) / 255 // Extract blue component and convert to decimal
      colorCode = { r: red, g: green, b: blue }
    } catch (error) {
      colorCode = { r: 0, g: 0, b: 0 }
    }
    return colorCode
  }


  function TrainData() {
    setMassage('model is beign training by the data..')
    const net = new NeuralNetwork()
    net.train(colorInput)
    console.log(netWork);
    // setDiagram(utilities.toSVG(net))
    setNetWork(net)
    setMassage('training completed...')
    // diagram.innerHTML = utilities.toSVG(net)
  }

  return (
    <>
      <MassageBox massage={massage} />
      <Row>
        <Col>
          <div id="result-top" className="result">
            {inputTopColor}
          </div>
        </Col>
        <Col>
          {' '}
          <input
            type="color"
            value={inputTopColor}
            onChange={(e) => setTopColor(e.target.value)}
            id="colorPicker"
          ></input>
        </Col>
        <Col></Col>
        <Col></Col>
      </Row>
      <Row>
        <Col>
          <div id="result-bottom" className="result">
            {inputBottomColor}
          </div>
        </Col>
        <Col>
          <input
            type="color"
            value={inputBottomColor}
            onChange={(e) => setBottomColor(e.target.value)}
            id="colorPicker"
          ></input>
        </Col>
        <Col>
          <button onClick={Store}>Add</button>
        </Col>
        <Col>
          <button onClick={TrainData}>Train</button>
        </Col>
      </Row>
    </>
  )
}