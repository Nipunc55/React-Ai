import React, { useEffect, useState } from 'react'
import { NeuralNetwork } from 'brain.js'
import { Row, Col } from 'react-bootstrap'
import MassageBox from './MassageBox'
import ColorContainer from './ColorContainer'
// const data = [
//   { input: [0], output: [1] },
//   { input: [1], output: [0] },
// ]

let colorInput = []
function AiModel() {
  // const [diagram, setDiagram] = useState(null)
  const [netWork, setNetWork] = useState(null)
  // const [result, setResult] = useState(null)
  const [inputBottomColor, setBottomColor] = useState('#000000')
  const [inputTopColor, setTopColor] = useState('#000000')
  const [massage, setMassage] = useState(
    'Please Train the AI by Adding matching colors !',
  )

  const [value, setValue] = useState('')
  const [resultColorBottom, setResultColour] = useState('#000000')

  function handleChange(event) {
    setValue(event.target.value)
  }
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
  // function ConvertIntToColor(colorInt) {
  //   const hexColorCode = '#' + colorInt.toString(16)
  //   return hexColorCode
  // }

  function TrainData() {
    const net = new NeuralNetwork()
    net.train(colorInput)
    // setDiagram(utilities.toSVG(net))
    setNetWork(net)
    // diagram.innerHTML = utilities.toSVG(net)
  }
  function Predict() {
    let doc = document.getElementById('result-bottom')
    const input = ConvertColorToInt(value)
    // console.log(input)
    // const array = value.split(',').map((item) => parseInt(item, 10))
    const prediction = netWork.run(input)
    //doc.style.backgroundColor = prediction
    //setResult(prediction)
    setResultColour(
      `rgba(${prediction.r * 255}, ${prediction.g * 255}, ${
        prediction.b * 255
      })`,
    )
    // doc.style.backgroundColor = `rgba(${prediction.r * 255}, ${
    //   prediction.g * 255
    // }, ${prediction.b * 255})`
    console.log(prediction)
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
        <Col>
          {/* <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="300.000000pt"
            height="228.000000pt"
            viewBox="0 0 300.000000 228.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,228.000000) scale(0.100000,-0.100000)"
              fill="#FF0000"
              stroke="none"
            >
              <path
                d="M808 2201 c-23 -5 -156 -86 -355 -216 -175 -114 -326 -215 -336 -224
-16 -16 -8 -31 149 -265 92 -136 173 -250 180 -253 7 -3 77 34 154 81 78 47
143 86 146 86 2 0 4 -299 4 -665 l0 -665 750 0 750 0 2 665 3 665 105 -63 c58
-34 126 -75 152 -90 l48 -28 127 193 c69 106 146 223 170 261 l43 67 -340 226
-341 226 -213 6 -213 5 -33 -46 c-62 -87 -148 -130 -260 -130 -111 0 -198 43
-259 128 l-32 45 -182 -1 c-100 -1 -198 -5 -219 -8z m398 -161 c30 -28 84 -65
121 -83 64 -30 75 -32 178 -32 101 1 115 3 175 31 36 17 90 54 121 82 l57 52
163 0 163 0 278 -185 278 -185 -17 -34 c-35 -66 -188 -295 -198 -295 -5 -1
-93 49 -194 109 -101 61 -186 108 -189 106 -3 -3 -7 -321 -10 -706 l-5 -700
-628 0 -629 0 0 705 c0 388 -4 705 -8 705 -4 0 -90 -50 -191 -110 -132 -79
-187 -107 -196 -100 -7 5 -56 75 -111 155 -78 116 -96 149 -88 162 5 9 129 96
274 194 l265 178 169 0 169 1 53 -50z"
                fill="#FFHH00"
              />
            </g>
          </svg> */}
        </Col>
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
      <input type="color" value={value} onChange={handleChange} />
      {/* <div dangerouslySetInnerHTML={{ __html: diagram }} /> */}
      <button onClick={Predict}>Predict</button>

      <ColorContainer
        inputBottomColor={value}
        resultColor={resultColorBottom}
      />
    </>
  )
}
export default AiModel
