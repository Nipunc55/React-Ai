import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Loader from './Loader'
import '../App.css'
import ColorPicker from './ColorPicker'
export default function Coantainer() {
     const [inputColor, setinputColor] = useState()

     const t_shirt = {
       position: [0, 0, -60],
       path: './3Dmodels/t_shirt.gltf',
       scale: 1,
     }
  return (
    <div>
         <Canvas className='canvas_cantainer'>

        <Loader name={t_shirt} materialColor={inputColor} />
        </Canvas>
       <ColorPicker colorInput={setinputColor}/>
        
        </div>
  )
}
