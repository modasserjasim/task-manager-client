import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../context/AuthProvider/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCircleCheck, faPen, faTrashCan
} from '@fortawesome/free-solid-svg-icons'

const TaskList = () => {
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
    console.log(tasks);
    return (
        <>
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
        </>
    );
};

export default TaskList;