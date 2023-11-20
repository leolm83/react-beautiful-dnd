import { useState } from 'react'
import './App.css'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
function App() {

  const DATA = [{
    "id":"1",
    "nome": "AINT REST FOR THE WICKED",
    "artista":"CAGE THE ELEPHANT"
  },
  {
    "id":"2",
    "nome": "TROUBLE",
    "artista":"CAGE THE ELEPHANT"
  },
  
];
  const [data, setData] = useState(DATA)
  const handleClick = event => {
      if(event.detail === 2){
      console.log("clicado 2 vezes")
      }
  }
  const handleDragDrop = (results) =>{
    const { source, destination, type} = results;
    if(!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) return;
    
    if(type === "group"){
      setData((beforeData) => {
        const dataCopy = [...beforeData]
        console.log(dataCopy)
        const removedData = dataCopy.splice(source.index,1)
        dataCopy.splice(destination.index,0,removedData[0])
        console.log(dataCopy)
        return dataCopy;
      })
      
    }
    console.log("hello");
  }

  return (
    <div id="main">
    <h1>DRAWND MUSIC</h1>
    <h2>PLAYLIST</h2>
    <h3>CAGED</h3>{/* PLAYLIST NAME */}
    <DragDropContext onDragEnd={handleDragDrop}>
    <Droppable droppableId='playlist' type='group'>
      {(provided) => <ul {...provided.droppableProps} ref={provided.innerRef}>
      
      {data.map((item,index) =>{ 
        return  <Draggable draggableId={item.id} key={item.id} index={index} >
            {(provided) => (
            <li className='music'{...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef} onClick={handleClick}> {item.nome} : {item.artista}</li>
            )}
          </Draggable>})}
          {provided.placeholder}  
      </ul>}
    </Droppable>
    </DragDropContext>
    </div>
  )
}

export default App
