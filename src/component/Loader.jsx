/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import  { useState, useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'
import { OrbitControls } from '@react-three/drei'

const Loader = (props) => {
  const [center, setCenter] = useState([0, 0, 0])
  const [clickedObject, setClickedObject] = useState(null)
  const mesh = useRef()
  const orbitRef = useRef()
  const { camera } = useThree()
  // eslint-disable-next-line react/prop-types
  const gltf = useLoader(GLTFLoader, props.name.path)
  const raycaster = new THREE.Raycaster()
  //console.log('loader rendered')
  useEffect(() => {
    let mixer
    if (gltf.animations.length) {
      mixer = new THREE.AnimationMixer(gltf.scene)
      const action = mixer.clipAction(gltf.animations[0])
      action.play()
      // action.halt(8)
      gltf.animations.forEach((clip) => {
        // const action = mixer.clipAction(clip)
        console.log(clip)
        // action.play()

        // action.halt(props.aniamtionDuration)
      })
    }
  }, [])
  useEffect(() => {
    // const { metalness, roughness } = props.option
    // if (clickedObject) {
    //   clickedObject.material.metalness = metalness
    //   clickedObject.material.roughness = roughness
    // }
if(clickedObject)clickedObject.material.color=props.materialColor
   //console.log(props.materialColor)
  }, [props.materialColor])

  /**
   * get the center of clicked object
   * @param {*} event
   */
  const handleClick = (event) => {
    const { clientX, clientY } = event
    const x = (clientX / window.innerWidth) * 2 - 1
    const y = -(clientY / window.innerHeight) * 2 + 1
    const mouse = { x: x, y: y }
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(mesh.current.children, true)
    if (intersects.length > 0) {
      const clickedObject = intersects[0].object
      if (clickedObject) {
        // const { name, position } = clickedObject
        // props.onDataReceve(clickedObject)
        setClickedObject(clickedObject)
       console.log(clickedObject);
        //clickedObject.material.metalness = 1
        let {r,g,b}=clickedObject.material.color
        
        clickedObject.material.color={r,g,b}
       


        console.log(r,g,b)
        const worldPosition = new THREE.Vector3().copy(clickedObject.position)
        clickedObject.parent.localToWorld(worldPosition)
        setCenter(worldPosition)
      }
    }
  }

  //*********/
  useFrame(() => {
    orbitRef.current.update()
    
  })

  return (
    <>
            {/* <pointLight position={[0, 1, 0]} color="#001BFF" intensity={0.6} /> */}
      <ambientLight intensity={0.2} />
      <directionalLight color="#ffffff" intensity={0.5} position={[3, 0, 3]} />
      <OrbitControls ref={orbitRef} target={center} />
      <primitive
        ref={mesh}
        object={gltf.scene}
        scale={props.name.scale}
        position={props.name.position}
        onClick={handleClick}
      />
    </>
  )
}
export default Loader
