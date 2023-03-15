import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'

let topElement
let botomElement
function ColorContainer(props) {
  useEffect(() => {
    topElement = document.getElementById('result-top-container-1')
    botomElement = document.getElementById('result-bottom-container-1')
  }, [])

  useEffect(() => {
    SetColor(topElement, props.inputBottomColor)
    SetColor(botomElement, props.resultColor)
  }, [props])
  function SetColor(element, color) {
    try {
      element.style.backgroundColor = color
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      {' '}
      <Row>
        <Col>
          <div id="result-top-container-1" className="result">
            {props.inputTopColor}
          </div>
        </Col>
        <Col>
          {' '}
          {/* <input
            type="color"
            value={inputTopColor}
            onChange={(e) => setTopColor(e.target.value)}
            id="colorPicker"
          ></input> */}
        </Col>
        <Col></Col>
        <Col></Col>
      </Row>
      <Row>
        <Col>
          <div id="result-bottom-container-1" className="result">
            {props.inputBottomColor}
          </div>
        </Col>
        <Col>
          {/* <input
            type="color"
            value={props.inputBottomColor}
            onChange={(e) => setBottomColor(e.target.value)}
            id="colorPicker"
          ></input> */}
        </Col>
        <Col></Col>
        <Col></Col>
      </Row>
    </>
  )
}

export default ColorContainer
