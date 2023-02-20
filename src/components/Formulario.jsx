import '../styles/Formulario.css';
import React from 'react';

const Formulario = ({setAddTarea,setTareas,addTarea,tareas}) => {

    const handleInputTarea=(e)=>{
        setAddTarea((e.target.value))
      }
      const newTarea=(e)=>{
        e.preventDefault()
        const tareaObj={
          label: addTarea,
          done: false,
          id: tareas.length +1
        }
        setTareas(tareas.concat(tareaObj))
        setAddTarea("")
    }
  return (
    <form onSubmit={newTarea}>
            <input placeholder='Ingresar tarea' onChange={handleInputTarea} value={addTarea}/>
            <button className='btn btn-secondary' type='submit'>add</button>
            
    </form>
  )
}

export default Formulario