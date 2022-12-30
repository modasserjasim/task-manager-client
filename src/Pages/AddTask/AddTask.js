import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import AddTaskForm from '../../components/AddTaskForm';
import TaskList from '../../components/TaskList';
import ToDo from '../../components/ToDo';
import UpdateForm from '../../components/UpdateForm';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCircleCheck, faPen, faTrashCan
} from '@fortawesome/free-solid-svg-icons'

const AddTask = () => {
    const { user } = useContext(AuthContext);
    const url = `${process.env.REACT_APP_API_URL}/my-tasks?email=${user?.email}`;
    const { data: tasks = [], isLoading, refetch } = useQuery({
        queryKey: ['my-tasks', user?.email],
        queryFn: async () => {
            const res = await fetch(url);
            const data = await res.json();
            return data.tasks;
        }
    })
    // Tasks (ToDo List) State
    //////////////////////////
    const [toDo, setToDo] = useState([
        { id: 1, title: 'Task 1', status: false },
        { id: 2, title: 'Task 2', status: false }
    ])

    // Temp State
    /////////////
    const [newTask, setNewTask] = useState('')
    const [updateData, setUpdateData] = useState('')

    // Add task 
    ///////////
    const addTask = () => {
        if (newTask) {
            let num = toDo.length + 1

            // let newEntry = { id: num, title: newTask, status: false }
            // setToDo([...toDo, newEntry])

            // refactored
            setToDo([
                ...toDo,
                { id: num, title: newTask, status: false }
            ])

            setNewTask('')

        }
    }

    // Delete task 
    //////////////
    const deleteTask = (id) => {

        // let newTasks = toDo.filter( task => task.id !== id)
        // setToDo(newTasks)

        // refactored
        setToDo(toDo.filter(task => task.id !== id))

    }

    // Mark task as done or completed
    /////////////////////////////////
    const markDone = (id) => {

        // let newTask = toDo.map( task => {
        //   if( task.id === id ) {
        //     return ({ ...task, status: !task.status })
        //   } 
        //   return task
        // })
        // setToDo(newTask)

        // refactored
        setToDo(toDo.map(
            task => task.id === id
                ? ({ ...task, status: !task.status })
                : (task)
        ))

    }

    // Cancel update
    ////////////////
    const cancelUpdate = () => {
        setUpdateData('')
    }

    // Change task for update
    /////////////////////////
    const changeHolder = (e) => {

        // let newEntry = {
        //   id: updateData.id,
        //   title: e.target.value,
        //   status: updateData.status ? true : false
        // }
        // setUpdateData(newEntry)

        // refactored
        setUpdateData({ ...updateData, title: e.target.value })

    }

    // Update task
    //////////////
    const updateTask = () => {

        // let filterRecords = [...toDo].filter( task => task.id !== updateData.id )
        // let updatedObject = [...filterRecords, updateData]
        // setToDo(updatedObject)

        // refactored
        let removeOldRecord = [...toDo].filter(task => task.id !== updateData.id)
        setToDo([
            ...removeOldRecord,
            updateData
        ])

        setUpdateData('')

    }
    return (
        <div className="max-w-5xl mx-auto py-16">
            <h2 className='text-center text-3xl font-bold'>ADD YOUR NEW TASK!</h2>
            <br /><br />

            {updateData && updateData ? (
                <UpdateForm
                    updateData={updateData}
                    changeHolder={changeHolder}
                    updateTask={updateTask}
                    cancelUpdate={cancelUpdate}
                />
            ) : (
                <AddTaskForm
                    refetch={refetch}
                    isLoading={isLoading}
                    newTask={newTask}
                    setNewTask={setNewTask}
                    addTask={addTask}
                />
            )}

            <div className='mt-3'>
                {tasks && tasks.length ? <>
                    {
                        tasks?.map((task, index) =>
                            <div key={task._id} className="col taskBg">
                                <div className={task.isTaskCompleted ? 'done' : ''}>
                                    <span className="taskNumber">{index + 1}</span>
                                    <span className="taskText">{task.taskName}</span>
                                </div>
                                <div className="iconsWrap">
                                    <span title="Completed / Not Completed"
                                    >
                                        <FontAwesomeIcon icon={faCircleCheck} />
                                    </span>

                                    {task.status ? null : (
                                        <span title="Edit"
                                        >
                                            <FontAwesomeIcon icon={faPen} />
                                        </span>
                                    )}

                                    <span title="Delete"
                                    >
                                        <FontAwesomeIcon icon={faTrashCan} />
                                    </span>
                                </div>
                            </div>
                        )
                    }
                </> : <p className='text-center'>You didn't create any tasks yet...</p>}
            </div>

            {/* <ToDo
                toDo={toDo}
                markDone={markDone}
                setUpdateData={setUpdateData}
                deleteTask={deleteTask}
            /> */}


        </div>
    );
};

export default AddTask;