"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';

const Today = () => {

    const [todayTask, setTodayTask] = useState([])
const loadTodayTask =async () =>{
  const resp =await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/today/api`)
       const result = await resp.json();
       setTodayTask(result.results)
}
    useEffect(()=>{
     
      loadTodayTask()

    },[])
console.log(todayTask)

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