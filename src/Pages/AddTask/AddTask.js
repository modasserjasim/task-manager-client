import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import AddTaskForm from '../../components/AddTaskForm';
import TaskList from '../../components/TaskList';
import ToDo from '../../components/ToDo';
import UpdateForm from '../../components/UpdateForm';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCircleCheck, faPen, faTrashCan, faCircleXmark
} from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';

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

    //handle mark the task as complete
    const handleCompleteTask = id => {
        console.log('mark as completed');
        fetch(`${process.env.REACT_APP_API_URL}/my-task/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: true })
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.status) {
                    refetch();
                    toast.success(data.message);
                }

            })
    }
    //handle mark the task as complete
    const handleAvailableTask = id => {
        console.log('mark as uncompleted');
        fetch(`${process.env.REACT_APP_API_URL}/my-task/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: false })
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.status) {
                    refetch();
                    toast.success(data.message);
                }

            })
    }

    // remove the task
    const handleTaskDelete = id => {
        fetch(`${process.env.REACT_APP_API_URL}/my-task/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.status) {
                    refetch();
                    toast.success(data.message);
                }
            })
    }


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

    return (
        <div className="max-w-5xl mx-auto py-16">
            <h2 className='text-center text-3xl font-bold'>ADD YOUR NEW TASK!</h2>
            <br /><br />

            {updateData && updateData ? (
                <UpdateForm
                    updateData={updateData}
                    cancelUpdate={cancelUpdate}
                />
            ) : (
                <AddTaskForm
                    refetch={refetch}
                    isLoading={isLoading}
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
                                    {
                                        task.isTaskCompleted ?
                                            <span title="Mark as not completed"
                                                onClick={() => handleAvailableTask(task._id)}>
                                                <FontAwesomeIcon icon={faCircleXmark} />
                                            </span> :
                                            <span className='text-red-800' title="Mark as Completed"
                                                onClick={() => handleCompleteTask(task._id)}><FontAwesomeIcon icon={faCircleCheck} /></span>
                                    }




                                    {task.isTaskCompleted ? null : (
                                        <span title="Edit"
                                            onClick={() => setUpdateData(task)}
                                        >
                                            <FontAwesomeIcon icon={faPen} />
                                        </span>
                                    )}

                                    <span title="Delete"
                                        onClick={() => handleTaskDelete(task._id)}
                                    >
                                        <FontAwesomeIcon icon={faTrashCan} />
                                    </span>
                                </div>
                            </div>
                        )
                    }
                </> : <p className='text-center'>You didn't create any tasks yet...</p>}
            </div>


        </div>
    );
};

export default AddTask;