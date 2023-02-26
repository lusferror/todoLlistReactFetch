import '../styles/Formulario.css';
import React from 'react';
import {BsTrash} from 'react-icons/bs';
import {AiFillFolderAdd} from 'react-icons/ai';

const Formulario = ({setAddTarea,addTarea,newTarea,DeletFunction}) => {
    
     /**
      * Esta funcion agrega las tareas
      */
    const handleInputTarea=(e)=>{
        setAddTarea((e.target.value))
      }

  return (
    <form onSubmit={(e)=>newTarea(e)}>
            <input placeholder='Ingresar tarea' onChange={(evento)=>handleInputTarea(evento)} value={addTarea}/>
            <button className='btn btn-secondary' type='submit'><AiFillFolderAdd /></button>

            {/* El boton borrar hay que cambiarle el type="button", sino por defecto asume que es un boton type="submit", y hacia que se ejecutaba de nuevo la funcion 
            "newTarea", por eso nos aparecia una tarea en blanco*/}
            <button className='btn btn-secondary' onClick={DeletFunction} type="button"><BsTrash/></button>
            
    </form>
  )
}

export default Formulario