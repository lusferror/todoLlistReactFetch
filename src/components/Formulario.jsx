import '../styles/Formulario.css';
import React from 'react';
import { TiContacts } from 'react-icons/ti';

const Formulario = ({setAddTarea,addTarea,newTarea}) => {

    const handleInputTarea=(e)=>{
      //let tarea={label:e.tagret.value,done:false}
        setAddTarea((e.target.value))
      }

   // const newTarea=(e)=>{
   //    e.preventDefault()
   //     const todo={
   //       label: addTarea,
   //       done: false,
   //       //id: tareas.length + 1
   //     }
   //    // setTareas(tareas=>[...tareas,todo])
   //    setTareas(tareas.concat(todo))
//
   //     fetch('https://assets.breatheco.de/apis/fake/todos/user/userx1',{
   //          method:'PUT',
   //          headers:{
   //              'Content-Type':'application/json'
   //          },
   //          body:JSON.stringify(tareas)
   //       })
   //     .then(response=>response.json())
   //     .then(data=>console.log(data))
   //     .catch(e=>console.log(e))
   //      setAddTarea("")
   // }
  return (
    <form onSubmit={(e)=>newTarea(e)}>
            <input placeholder='Ingresar tarea' onChange={(evento)=>handleInputTarea(evento)} value={addTarea}/>
            <button className='btn btn-secondary' type='submit'>add</button>
            
    </form>
  )
}

export default Formulario