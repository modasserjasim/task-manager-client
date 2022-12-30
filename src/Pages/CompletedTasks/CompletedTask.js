import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCircleCheck, faPen, faTrashCan
} from '@fortawesome/free-solid-svg-icons'

const CompletedTask = () => {
    const { user } = useContext(AuthContext);
    const url = `${process.env.REACT_APP_API_URL}/completed-tasks?email=${user?.email}`;
    const { data: completedTasks = [] } = useQuery({
        queryKey: ['completed-tasks', user?.email],
        queryFn: async () => {
            const res = await fetch(url);
            const data = await res.json();
            return data.completedTasks;
        }
    })
    console.log(completedTasks);
    return (
        <div className="max-w-5xl mx-auto py-16">
            <h2 className='text-center text-3xl font-bold mb-5'>Completed Tasks</h2>
            {completedTasks && completedTasks.length ? <>
                {
                    completedTasks?.map((task, index) =>
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
            </> : 'No Completed Tasks...'}

        </div>
    );
};

export default CompletedTask;