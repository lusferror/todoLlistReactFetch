import { useEffect, useState } from 'react';
import './App.css';
import Formulario from './components/Formulario';
import Tarea from './components/Tarea';

function App() {
const [tareas,setTareas]=useState([]);
const [addTarea,setAddTarea]=useState();

const miPrimerPost=()=>{
  fetch('https://assets.breatheco.de/apis/fake/todos/user/userx1',{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify([])
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error=> console.log(error))

}

useEffect(()=>{
  fetch('https://assets.breatheco.de/apis/fake/todos/user/userx1', {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(resp => {
      //console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
      //console.log(resp.status); // el código de estado = 200 o código = 400 etc.
      return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
  })
  .then(data => {
    const valor='This use does not exists, first call the POST method first to create the list for this username'
      if(data.msg === valor){
        miPrimerPost()
      }
      setTareas(tareas.concat(data))
      //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
      console.log("esto se recibio del servidor",data); //esto imprimirá en la consola el objeto exacto recibido del servidor
  })
  .catch(error => {
      //manejo de errores
      console.log(error);
  });
},[])

const newTarea =(e)=>{
  e.preventDefault()
   const todo={
     label: addTarea,
     done: false,
     //id: tareas.length + 1
   }
  // setTareas(tareas=>[...tareas,todo])
  setTareas(tareas.concat(todo))

   fetch('https://assets.breatheco.de/apis/fake/todos/user/userx1',{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(tareas)
     })
   .then(response=>response.json())
   .then(data=>console.log(data))
   .catch(e=>console.log(e))
    setAddTarea("")
}

  return (
    <div className="App">
      <div className='base-lista w-50 container my-2'>
      <h1>Todo</h1>
        <div className='formulario'>
          <Formulario setAddTarea={setAddTarea} newTarea={newTarea} addTarea={addTarea}/>
          <Tarea tareas={tareas} setTareas={setTareas}/>
        </div>
      </div>
    </div>
  );
}

export default App;