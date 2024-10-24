import { styled, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { FaCheck, FaPencilAlt, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { createTask, deleteTask, fetchTask, updateTask } from '../functions/api';
import { notify } from '../functions/utils';

const Tasks = () => {

  const [input, setinput] = useState('')
  const [tasks, setTasks] = useState([])
  const [copyTasks, setcopyTasks] = useState([])
  const [updateState, setupdateState] = useState(null)

  console.log(input)


  const handle_update_add =(e)=>{
    e.preventDefault()
    if(updateState && input){
      const obj = {
        _id: updateState._id,
        TaskName: input,
        IsDone: updateState.IsDone
      }
      console.log("update api call.....")
      updatingTask(obj)
    }
    else if(updateState === null && input){
      console.log("add api call.....")
      addTasks(e)
    }
  }

  useEffect(() => {
    if(updateState){
      setinput(updateState.TaskName)
    }
  }, [updateState])
  


  const addTasks = async (e) => {
    e.preventDefault()
    try {
      const obj = {
        TaskName: input,
        IsDone: false
      }

      const { message, success } = await createTask(obj)
      if (success) {
        notify(message, "success")
      }
      else {
        notify(message, "error")
      }
      setinput('')
      getTasks()
    } catch (error) {
      console.log(error)
      notify("failed to create the task", "error")
    }
  }


  const getTasks = async () => {
    try {
      const { message, success, data } = await fetchTask();

      // if (success) {
      //   notify(message, "success")
      // }
      // else {
      //   notify(message, "error")
      // }
      setTasks(data)
      setcopyTasks(data)     // searching functionality mai kaam aayega.
    } catch (error) {
      console.log(error)
      notify("failed to  get the tasks", "error")
    }
  }

  useEffect(() => {
    getTasks()
  }, [])

  const handleCheckUncheck = async (item) => {
    try {
      const { _id, TaskName, IsDone } = item
      const obj = {
        TaskName,
        IsDone: !IsDone
      }
      const { message, success } = await updateTask(_id, obj)
      if (success) {
        notify(message, "success")
      } else {
        notify(message, "error")
      }
      getTasks()
    } catch (error) {
      console.log(error)
      notify("failed to update the task", "error")
    }
  }

  const updatingTask = async (item) => {
    try {
      const { _id, TaskName, IsDone } = item
      const obj = {
        TaskName,
        IsDone
      }
      const { message, success } = await updateTask(_id, obj)
      if (success) {
        notify(message, "success")
      }
      else {
        notify(message, "error")
      }
      getTasks()
    } catch (error) {
      console.log(error)
      notify("failed to update the task", "error")
    }
    setinput("")
    setupdateState(null)
  }

  const deletingTask = async(id) => {
    try {
      const {message, success} = await deleteTask(id)
      if(success){
        notify(message, "success")
      }
      else{
        notify(message, "error")
      }
      getTasks()
    } catch (error) {
      console.log(error)
      notify("failed to delete the task", error)
    }
  }


  const searchingTask = (e) => {
    const term = e.target.value.toLowerCase();
    const oldTasks = [...copyTasks];
    const results = oldTasks.filter((item) => 
      item.TaskName && item.TaskName.toLowerCase().includes(term)
    );
    setTasks(results);
  }
  

  return (
    <Container>

      {/* heading */}
      <Typography
        variant="h4"
        component="h2"
        style={{ fontWeight: 'bold', color: '#333', marginBottom: "8px" }}>
        MANAGE YOUR TASKS
      </Typography>

      {/* add task and search */}
      <InputSearch>
        <div>
          <Input value={input} onChange={(e) => { setinput(e.target.value) }} type='text' placeholder='enter the task' />
          <Button onClick={handle_update_add}><FaPlus /></Button>
        </div>

        <div>
          <span><FaSearch /></span>
          <Input onChange={searchingTask} type='text' placeholder='search the task' />
        </div>
      </InputSearch>

      <TaskListContainer>
        {/* task list */}
        {
          tasks.map((item) => (
            <ListItem key={item._id}>
              <span style={item.IsDone ? { textDecoration: "line-through" } : {}}>{item.TaskName}</span>
              <div>
                <Button onClick={() => { handleCheckUncheck(item) }}><FaCheck /></Button>
                <Button onClick={() => setupdateState(item)}><FaPencilAlt /></Button>
                <Button onClick={() => { deletingTask(item._id) }}><FaTrash /></Button>
              </div>
            </ListItem>
          ))
        }
      </TaskListContainer>

      {/* toastify */}
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
      />

    </Container>
  )
}

const Container = styled('div')`
  display: flex;
  max-width:  50vw;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  padding: 20px;
  margin: auto;
  margin-top: 5px;
  background: linear-gradient(to right, #FFB6C1, #ADD8E6);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  height: calc(100vh - 10px);
  overflow-y: auto;
`

const InputSearch = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  background: linear-gradient(to right, #FFFACD, #FFD700);
  margin-bottom: 8px;

  div{
    display: flex;
    flex-grow: 1;
    margin-right: 0.25rem;
    align-items: center;

    span{
      display: flex;
    align-items: center;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    color: #495057;
    background-color: #e9ecef;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    }
  }
`
const Input = styled("input")`
   width: 100%;
    padding: 0.375rem 0.75rem;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    font-size: 1rem;
    margin-right: 0.25rem;
`


const Button = styled("button")`
    display: inline-block;
    font-weight: 400;
    text-align: center;
    text-decoration: none;
    padding: 0.25rem 0.5rem;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    color: #fff;
    background-color: #28a745;
    font-size: 0.875rem;
    margin-right: 0.5rem;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
        background-color: #218838;
        transform: scale(1.05);
    }
`

const TaskListContainer = styled("div")`
  display: flex;
  width: 100%;
  flex-direction: column;
`

const ListItem = styled("div")`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px;
  padding: 5px;
  background-color: #edeee5;
  border-radius: 10px;
  
`

export default Tasks
