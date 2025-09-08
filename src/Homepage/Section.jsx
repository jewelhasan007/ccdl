"use client"

import React, { useEffect, useState } from 'react';
import { getAddTaskDB } from './getAddTask';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from "react-icons/ri";
import Link from 'next/link';

import Pending from './Pending';
import Done from './Done';
import Today from './Today';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Section =  () => {
// const [allSections, setAllSections] = useState([])
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
console.log(allTask)
 
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
       <div className='' >

      <div className='mt-3 '>
        {/* name of each tab group should be unique */}
<div className="tabs tabs-box ">
  <input type="radio" name="my_tabs_6" className="tab" aria-label="All task"  />
  <div className="tab-content bg-base-100 border-base-300 p-6  ">
   
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
         {allTask.map((substation, index) => (
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

  <input type="radio" name="my_tabs_6" className="tab" aria-label="Pending"  />
  <div className="tab-content bg-base-100 border-base-300 p-6"><Pending></Pending></div>

  <input type="radio" name="my_tabs_6" className="tab" aria-label="Done" />
  <div className="tab-content bg-base-100 border-base-300 p-6"><Done></Done></div>

  <input type="radio" name="my_tabs_6" className="tab" aria-label="Today List"  defaultChecked/>
  <div className="tab-content bg-base-100 border-base-300 p-6"><Today></Today></div>
</div>
      </div>

        {/* all section */}
        {/* <div>
        <div className='grid md:grid-cols-4 gap-10 m-3 '>
          
          {
           allSections?.map((item) => (  
             <div className="card card-dash bg-gray-100 w-76" key={item.title}>
             <div className="card-body">
               <h2 className="card-title text-black"><Link href={item.path}>{item.title}</Link></h2>
               <p className='text-gray-400'>Description</p>
               <div className="card-actions justify-end">
               
               </div>
             </div>
           </div>

         ))
          }
        
       </div>
        </div> */}
       </div>
    );
};

export default Section;