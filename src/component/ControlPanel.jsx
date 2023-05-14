import styles from '../styles/controlPanel.module.css'

export default function ControlPanel(props) {
    const modelData=[{name:"gym_girl",data:{
       position: [0,0,0],
       path: './3Dmodels/girl_2.gltf',
       scale:0.7,
     }},
     {name:"office_girl",data:{
       position: [0,0,0],
       path: './3Dmodels/girl_3.gltf',
       scale:0.7,
     }}]

  return (
    <>
    <div className={styles.container}>
        {
        modelData !=null ?
        // eslint-disable-next-line react/prop-types
        (modelData.map((item,index)=>{return (<img onClick={()=>{props.setModel(item.data)}} key={index} width='100%' src='/vite.svg' alt={item.name}></img>)
         })
        )
        :(null)
        }
    </div>
    </>
  )
}
