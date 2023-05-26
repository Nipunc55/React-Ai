import { useState,useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import Loader from './Loader'
import '../App.css'
import ColorPicker from './ColorPicker'
import ControlPanel from './ControlPanel'

const gym_girl = {
       position: [0, 0,0],
       path: './3Dmodels/girl_1.gltf',
       scale:0.7,
     }
export default function Coantainer() {
     const [inputColor, setinputColor] = useState()
     const [model,setModel]=useState(gym_girl)

     useEffect(() => {
        // console.log(model);
     }, [model])
     

     
  return (
    <div>
      <Canvas className='canvas_cantainer'>

        <Loader name={model} materialColor={inputColor} />
        </Canvas>
      <ColorPicker colorInput={setinputColor} />
      <ControlPanel setModel={setModel}/>
        
    </div>
  )
}
