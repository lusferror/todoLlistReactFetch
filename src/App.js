import { useEffect, useState } from 'react';
import './App.css';
import Formulario from './components/Formulario';
import Tarea from './components/Tarea';

function App() {
const [tareas,setTareas]=useState([]);
const [addTarea,setAddTarea]=useState();
useEffect(()=>{
  fetch('https://assets.breatheco.de/apis/fake/todos/user/alesanchezr', {
    method: "GET",
    mode:'cors',
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(resp => {
      console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
      console.log(resp.status); // el código de estado = 200 o código = 400 etc.
      console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
      return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
  })
  .then(data => {
      setTareas(()=>data)
      //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
      console.log("esto se recibio del servidor",data); //esto imprimirá en la consola el objeto exacto recibido del servidor
  })
  .catch(error => {
      //manejo de errores
      console.log(error);
  });
},[])

  return (
    <div className="App">
      <div className='base-lista w-50 container my-2'>
      <h1>Todo</h1>
        <div className='formulario'>
          <Formulario setAddTarea={setAddTarea} setTareas={setTareas} addTarea={addTarea} tareas={tareas}/>
          <Tarea tareas={tareas} setTareas={setTareas}/>
        </div>
      </div>
    </div>
  );
}

export default App;