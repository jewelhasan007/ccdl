"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import Swal from 'sweetalert2';
import { getAddTaskDB } from './getAddTask';
import Section from './Section';

const Today = ({refresh}) => {
const [allTask, setAllTask] = useState([])

const loadSections = async () =>{
  // const sections = await getSectionsDB();
  const tasks = await getAddTaskDB()
  // setAllSections(sections.services)
  setAllTask(tasks.res)
}
useEffect(()=>{
  loadSections()  
},[])

    const [todayTask, setTodayTask] = useState([])
const loadTodayTask =async () =>{
  const resp =await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/today/api`)
       const result = await resp.json();
       console.log("today list page", result)
       setTodayTask(result.results)
}
    useEffect(()=>{
     
      loadTodayTask()

    },[])
console.log(todayTask)
const handleDelete = async (id) =>{
  console.log(id)

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then( async(result) => {
    if (result.isConfirmed) {
      const deleteData =await  fetch (`${process.env.NEXT_PUBLIC_BASE_URL}/add-task/${id}`,{
        method: "DELETE",
          });
          const resp = await  deleteData.json();
          console.log(resp)

          if(resp?.response?.deletedCount > 0){
            // loadTodayTask();
            loadSections();
            
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            // toast.success("Deleted Succesfully");
          }

    
    }
  });


 
}

    return (
        <div>
         <div className="overflow-x-auto mt-4 max-h-screen   ">
    <table className="table table-xs  ">
      <thead className="text-left">
        <tr>
          <th></th>
          <th>Task Name</th>
          <th>Description</th>
          <th>Date</th>            
          <th>Tag</th>
          <th className="text-center">Status</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody className='text-black'>
         {todayTask.map((substation, index) => (
          <tr key={substation._id}>
            <th>{index + 1}</th>
            <td>{substation.name}</td>
            <td>{substation.description}</td>
            <td>{substation.date}</td>
            <td >{substation.tag}</td>
            <td
              className={`text-${
                substation.status === "Pending" ? "red" : "green"
              }-400 bg-${substation.status === "Pending" ? "red" : ""}-200 rounded-2xl text-center font-bold`}
            >
              {substation.status}
            </td>
            <td className='text-gray-400 tooltip' data-tip="Edit"><Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/edit-task/${substation._id}`}><FaRegEdit /></Link></td>
            <td className='text-red-400 tooltip' data-tip="Delete"><Link href="#" onClick={ (e) => {e.preventDefault(); handleDelete(substation._id)}}><RiDeleteBin5Line /></Link></td>
          
          </tr>
        ))}
      </tbody>
    </table>
  </div>
        </div>
    );
};

export default Today;