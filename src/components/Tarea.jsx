import {TiDelete} from 'react-icons/ti';
import '../styles/Tarea.css';
import React from 'react';

const Tarea = ({tareas,setTareas}) => {

    const deletTarea=(id)=>{
      
        let result= tareas.filter((tarea,ind2) => ind2 !== id)
        setTareas(result)
     }

  return (
    <div className='lista-tareas'>
    { tareas.length === 0 ?
    <p>No hay tareas, agregar tareas</p>
    :
    tareas.map((tarea,ind)=>
      <li key={ind}>{tarea.label}
      <button className='mx-2 btn btn-secondary' onClick={()=>deletTarea(ind)}><TiDelete className='icono' /></button>
      </li>
      )
      
    }
      
  </div>
  )
}

export default Tarea