import { wait } from '@testing-library/user-event/dist/utils';
import { useEffect, useState } from 'react';
import './App.css';
import Formulario from './components/Formulario';
import Tarea from './components/Tarea';

function App() {
const [tareas,setTareas]=useState([]);
const [addTarea,setAddTarea]=useState();
const [vacio, setVacio] = useState(false); //No hizo falta usar el estado vacio,
const [borrar, setBorrar] = useState(false); // agregue un nuevo estado, para que el useEffect que acualiza las tareas solo se ejecute cuando 
                                            //se acutaliza las lista y no cuando se borre

/**
 * Esta funcion es la que crea la lista de tareas desde desde cero
 * @returns la respuesta en formato json 
 */
const miPrimerPost = async() =>{
    const response = await fetch('https://assets.breatheco.de/apis/fake/todos/user/userx1',{
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify([])
        })

    return response.json();
}

/**
 * Esta función, es el get de la api, que te trae todas las tareas cuando cargas la pagina.
 * @returns la respuesta en formato json 
 */
const getFuncion = async ()=>{
  const response =  await fetch('https://assets.breatheco.de/apis/fake/todos/user/userx1', {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }); 
  const respuesta =  response.json()
  return respuesta;
}

/**
 * Esta funcion junta todas las asincronias, no funcionaba el bucle "while" o "for", por que estabamos trabajando con funciones asíncronas, lo que quiere decir
 * que no esperaba la consulta a la api, y no tenia la respuesta a tiempo, entonces de esta manera obligo a la aplicaición esperar la respuesta de cada fetch para
 * que pueda continuar a la siguiente función
 */
const onLoad = async() =>{
  const valor='This use does not exists, first call the POST method first to create the list for this username'
  const get = await getFuncion();
  if (get.msg == valor){
      await miPrimerPost();
      const get = await getFuncion();
      setTareas(get);
  }
  else{
    setTareas(get);
  }

}

/**
 * Aquí llamamos la función que junta las asincronias, para que se ejecute en el useEffect
 */
useEffect( () =>{

  onLoad();
  
},[])

/**
 * Esta funcion actualiza la lista de tareas en la api
 * @param {*} tareas corresponde a la lista de tareas 
 */
const PutFunction=(tareas)=>{
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
}
const DeletFunction=()=>{
  setTareas([]);
  setBorrar(true)
  fetch('https://assets.breatheco.de/apis/fake/todos/user/userx1',{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json'
        }
      
     })
   .then(response=>response.json())
   .then(data=>console.log(data))
   .catch(e=>console.log(e))
}

/**
 * Esta funcion agrega una nueva tarea a nuestro esta "tareas"
 * @param {*} e es el evento 
 */
const newTarea =(e)=>{
  e.preventDefault()
  setBorrar(false);
   const todo={
     label: addTarea,
     done: false,
   }
  setTareas(tareas.concat(todo))

    
    setAddTarea("")
}

/**
 * Esta funcion detecta el cambio de nuestro estado "tareas", pero solo se va a ejecutar cuando la lista sea mayor a 0 y 
 * no estemos ejectuando la funcion "DeletFunction"
 */
useEffect(()=>{
  if(tareas.length > 0 && borrar ==  false){
    PutFunction(tareas) ;
  }
},[tareas])

  return (
    <div className="App">
      <div className='base-lista w-50 container my-2'>
      <h1>Todo</h1>
        <div className='formulario'>
          <Formulario setAddTarea={setAddTarea} newTarea={newTarea} addTarea={addTarea} DeletFunction={DeletFunction}/>
          <Tarea tareas={tareas} setTareas={setTareas} PutFunction={PutFunction} />
        </div>
      </div>
    </div>
  );
}

export default App;