import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthProvider/AuthProvider';
import Spinner from './Spinner';

const AddTaskForm = () => {
  const { user } = useContext(AuthContext);
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddTask = data => {
    setLoading(true);
    // console.log(data);

    // add image to imageBB
    const image = data.img[0];
    const formData = new FormData();
    formData.append('image', image);

    const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_KEY}`;
    fetch(url, {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(imgData => {
        // console.log(imgData);
        if (imgData.success) {
          const taskImg = (imgData.data.url);
          console.log(taskImg);
          const taskInfo = {
            taskName: data.taskTitle,
            taskDescription: data.description,
            taskImg: taskImg,
            isTaskCompleted: false,
            userEmail: user.email
          }
          console.log(taskInfo);
          //save Task information to the database
          fetch(`${process.env.REACT_APP_API_URL}/add-task`, {
            method: "POST",
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify(taskInfo)
          })
            .then(res => res.json())
            .then(result => {
              if (result.status) {
                setLoading(false);
                toast.success(result.message);

              } else {
                toast.error(result.error);

              }
            })
        }
      })
  }
  return (
    <div className='flex justify-center items-center'>
      <form onSubmit={handleSubmit(handleAddTask)} className="bg-white shadow rounded w-full   p-5 md:p-10">
        <div className="relative">
          <input {...register("taskTitle", { required: "Task Title is required" })} type="text" name='taskTitle' id="floating_outlined_taskTitle" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " />
          <label htmlFor="floating_outlined_taskTitle" className="absolute text-md text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Task Title</label>
          <div>
            {errors.taskTitle && <p role="alert" className='text-red-700 text-xs'>{errors.taskTitle?.message}</p>}
          </div>
        </div>

        <div className="relative mt-4 w-full">
          <textarea {...register("description", { required: "Task description is required" })} name='description' type="textarea" id="floating_outlined_description" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " required />
          <label htmlFor="floating_outlined_description" className="absolute text-md text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Task Description</label>
          <div>
            {errors.description && <p role="alert" className='text-red-700 text-xs'>{errors.description?.message}</p>}
          </div>
        </div>
        <div className="relative mt-4">
          <input {...register("img", { required: "Image is required" })} type="file" name='img' id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " required />
          <label htmlFor="floating_outlined" className="absolute text-md text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Choose Task Photo</label>
          <div>
            {errors.img && <p role="alert" className='text-red-700 text-xs'>{errors.img?.message}</p>}
          </div>

        </div>

        <div className="mt-8">
          <button type="submit" className="text-lg rounded-md font-semibold leading-none text-white focus:outline-none bg-green-800 border hover:bg-green-600 py-4 w-full">
            {loading ? <Spinner /> : 'Add New Task'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddTaskForm;