import React from 'react';
import TaskList from '../../components/TaskList';

const MyTasks = () => {
    return (
        <div className="max-w-5xl mx-auto py-16">
            <h2 className='text-center text-3xl font-bold mb-5'>My All Tasks</h2>
            <TaskList></TaskList>

        </div>
    );
};

export default MyTasks;