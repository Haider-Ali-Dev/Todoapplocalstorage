import { getItem } from 'localforage';
import React, { useState, useEffect } from 'react';
import localforage from 'localforage'
localforage.config({
    driver      : localforage.WEBSQL, // Force WebSQL; same as using setDriver()
    name        : 'myApp',
    version     : 1.0,
    size        : 4980736, // Size of database, in bytes. WebSQL-only for now.
    storeName   : 'keyvaluepairs', // Should be alphanumeric, with underscores.
    description : 'some description'
  });

const Todo = (props) => {
    const [task, setTask] = useState("")
    const [editedTask, setEditedTask] = useState("")
    const [taskID, setTaskID] = useState(0) // Primary Key
    const [tasks, setTasks] = useState([])
    const [keys, setKeys] = useState([])

    let taskDB = localforage.createInstance({
        name: "task",
    })
    const onTaskSubmit = () => {
        taskDB.setItem(1, "Hello People", (err) => err)
        taskDB.setItem(2, "Hello People", (err) => err)
        taskDB.setItem(3, "Hello People", (err) => err)
    }

    useEffect(async ()=> {
        const finalKeys = []
        const dbKeys = await taskDB.keys()
        // dbKeys.forEach(async (key) => {
        //     if (key) {
        //         const data = await getItem(key)
        //         finalKeys.push(data)
        //         console.log(data)
        //     }
        // })
        setKeys(dbKeys)
        // const data = await taskDB.getItem(1)
        // setTasks(data)
    }, [])

    // useEffect(() => {

    // }, [])
    return (
        <div>
            <div>
                <input required onChange={(event) => setTask(event.target.value)} placeholder={"Enter your Task"}/>
                <input required type={"number"} onChange={(event) => setTaskID(Number(event.target.value))} placeholder={"Enter your Task ID"}/>
                <button onClick={onTaskSubmit}>Add Task</button>

                <div>
                    {keys ? () =>{
                        return keys.map(async (value) => {
                            const data = await getItem(value)
                            console.log(data)
                           return <p>{data}</p>
                        })
                    } : "None"}
                </div>
            </div>
        </div>
    );
}


export default Todo;
// getItem(data).then(value => value)