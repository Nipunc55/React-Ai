import React, { useState } from 'react'
import ConvertColorToRGB from '../Utils/ConvertColor'


export default function ColorPicker(props) {
     const [name, setName] = useState(null)
  return (
     <div className='input-color-container'>
            <input
            type="color"
            
            onChange={(e) =>{ 
                           let color=ConvertColorToRGB(e.target.value)
                           setName(()=>{if(color.colorName)return color.colorName})
                          
                        
               
                             props.colorInput(color.int)
                            
                        }
                        }
            id="colorPicker"
          ></input>
          <div>{name}</div>
          </div>
  )
}
