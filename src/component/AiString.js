import React, { useEffect, useState } from 'react'
import {  recurrent } from 'brain.js'

const data = [
  { input: 'I feel great about the world!', output: 'happy' },
  { input: 'The world is a terrible place!', output: 'sad' },
  { input: 'Hi', output: 'Hi how are you' },
  { input: 'Hi how are you', output: 'I am good' },
  { input: 'me too', output: 'nice' },
]


function ChatAi() {
  const [loading, setLoading] = useState(true)
  const [netWork, setNetWork] = useState(null)
  const [result, setResult] = useState()

  const [value, setValue] = useState('')
  const [correctValue, setCorrectValue] = useState('')
  const [newData, setQuestions] = useState()

  useEffect(() => {
    getQuestionsFromApi((data) => {
      // console.log(data)
      data.map((element) => {
        console.log(element.question)
        // console.dir(element.answers)
        // console.dir(element.correct_answers)
        let obj = element.correct_answers
        let correctKey = Object.keys(obj).find((key) => obj[key] === 'true')
        let key = correctKey.replace('_correct', '')
        //  console.log()
        console.log(element.answers[key])
        let newObj = { input: element.question, output: element.answers[key] }
        setQuestions({ input: element.question, output: element.answers[key] })
        data.push(newObj)
      })
    })

    return () => {}
  }, [])
  useEffect(() => {
    console.log(data)
    return () => {}
  }, [newData])

  function getQuestionsFromApi(callback) {
    fetch(
      'https://quizapi.io/api/v1/questions?apiKey=YrZ4NIJcGrc1DUIFZMJO6goY5vpZ96WgMG4056RY&limit=10',
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((data) => {
        callback(data)
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error)
      })
  }
  function handleChange(event) {
    setValue(event.target.value)
  }
  function handleChangeCorrect(event) {
    setCorrectValue(event.target.value)
  }

  useEffect(() => {
    setLoading(true)
    // TrainData()
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
          {/* <div>correct output</div>
          <input
            type="text"
            value={correctValue}
            onChange={handleChangeCorrect}
          /> */}
        </>
      )}
    </>
  )
}
export default ChatAi
