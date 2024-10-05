import React from 'react'
import { useState } from 'react';
import './App.css';
const App = () => {
  const [todo, settodo] = useState("");
  const [alltodo, setalltodo] = useState([]);
  const [editID,seteditID] = useState(0);
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editID) {
      const editedItem = alltodo.find((t) => t.id === editID);
      const updation = alltodo.map((t) =>
        t.id === editedItem.id ? { id: t.id, todo } : t
      );
      setalltodo(updation);
      seteditID(0);
    } else {
      if (todo !== "") {
        setalltodo([{ id: `${todo}-${Date.now()}`, todo }, ...alltodo]);
      }
    }
    settodo("");
  };
  const handleDelete = (id)=>{
    const deltodo = alltodo.filter((t)=> t.id!==id)
    setalltodo([...deltodo]);
  }

  const handleEdit = (id)=>{
    const req = alltodo.find((t)=> t.id === id)
    settodo(req.todo);
    seteditID(id);
  }
  return (
    
    <div className='App'>
      <div className='container'>
        <h1>ToDo-List-App</h1>
        <form className='todoForm' onSubmit={handleSubmit}>
          <input type='text' value={todo} onChange={(e)=>settodo(e.target.value)}></input>
          <button type='submit'>{editID? "Edit" : "Go"}</button>
        </form>
 
        <ul className='allTodo'>
          {
            alltodo.map((t)=>(
              <li className='singleTodo'>
              <span className='todoText' key={t.id}>{t.todo}</span>
              <button onClick={()=>handleEdit(t.id)}>Edit</button>
              <button onClick={()=>handleDelete(t.id)}>Delete</button>
          </li> 
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default App
