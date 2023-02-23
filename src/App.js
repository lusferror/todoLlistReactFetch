import { useEffect, useState } from 'react';
import './App.css';
import Formulario from './components/Formulario';
import Tarea from './components/Tarea';

function App() {
const [tareas,setTareas]=useState([]);
const [addTarea,setAddTarea]=useState();
const [vacio, setVacio] = useState(false);

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
  do{
  fetch('https://assets.breatheco.de/apis/fake/todos/user/userx1', {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(resp => {
      return resp.json(); 
      
    })
  .then(data => {
    const valor='This use does not exists, first call the POST method first to create the list for this username'
      if(data.msg === valor){
        miPrimerPost()
        
      }else{
        setTareas(tareas.concat(data))
        setVacio(true)
       //  console.log("esto se recibio del servidor",data);
      }
      
  })
  .catch(error => {
      //manejo de errores
      console.log(error);
  });
  }while(vacio)
},[])


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
  console.log("funcion delete")
  fetch('https://assets.breatheco.de/apis/fake/todos/user/userx1',{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json'
        }
      
     })
   .then(response=>response.json())
   .then(data=>console.log(data))
   .catch(e=>console.log(e))
   setTareas([])
}

const newTarea =(e)=>{
  e.preventDefault()
   const todo={
     label: addTarea,
     done: false,
     //id: tareas.length + 1
   }
  // setTareas(tareas=>[...tareas,todo])
  setTareas(tareas.concat(todo))

    
    setAddTarea("")
}


useEffect(()=>{
  if(vacio === true){
    PutFunction(tareas) 
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