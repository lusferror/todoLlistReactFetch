import '../styles/Formulario.css';
import React from 'react';
import {BsTrash} from 'react-icons/bs';
import {AiFillFolderAdd} from 'react-icons/ai';

const Formulario = ({setAddTarea,addTarea,newTarea,DeletFunction}) => {

    const handleInputTarea=(e)=>{
      //let tarea={label:e.tagret.value,done:false}
        setAddTarea((e.target.value))
      }

  return (
    <form onSubmit={(e)=>newTarea(e)}>
            <input placeholder='Ingresar tarea' onChange={(evento)=>handleInputTarea(evento)} value={addTarea}/>
            <button className='btn btn-secondary' type='submit'><AiFillFolderAdd /></button>
            <button className='btn btn-secondary' onClick={DeletFunction} ><BsTrash/></button>
            
    </form>
  )
}

export default Formulario