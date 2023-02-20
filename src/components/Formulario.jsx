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
        let option1={method:'POST',mode:'cors',body:JSON.stringify(tareaObj),header:{'Content-Type':'application/json'}}
    const poneTareas = async ()=>{
      try{
        const response =  await fetch('https://assets.breatheco.de/apis/fake/todos/user/alesanchezr',option1);
        const info2= await response.json();
              setTareas(()=>info2);
              setAddTarea("")
              console.log("que tengo post?",info2)
            //  setIsLoading(false);//  carga finalizada
          }catch(error){
            console.log(error);
          }       
        }
        poneTareas()


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