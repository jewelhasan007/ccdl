import React, { useEffect, useState } from 'react';
import PriorityFormModal from './priority-modal-form/PriorityFormModal';
import { getAllPriorityTaskDB } from './priority-modal-form/getAllPriorityTask';
import Link from 'next/link';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';

const Priority = () => {

    const [allPriorityTask, setAllPriorityTask] = useState([])
    
    const loadSections = async () =>{
    
      const tasks = await getAllPriorityTaskDB()
      // setAllSections(sections.services)
      setAllPriorityTask(tasks.res)
    }
    
    useEffect(()=>{
      loadSections()  
    },[])
    
    console.log(allPriorityTask)


    return (
        <div>
       <div className='flex justify-between m-1'>
           <h5 className='text-2xl'>Priority Issues</h5>
         <PriorityFormModal></PriorityFormModal>
       </div>
       <hr />
        <div className="overflow-x-auto mt-4 max-h-screen   ">
   
         {allPriorityTask.map((priority, index) => (

<ul key={index} className="list bg-base-100 rounded-box shadow-md m-1 p-1"> 
  <li className="list-row">
    <div className="text-4xl font-thin opacity-30 tabular-nums">{index+1}</div>
    <div><img className="size-10 rounded-box" src="./cement-logo.png"/></div>
    <div className="list-col-grow">
      <div>{priority.name}</div>
      <div className="text-xs uppercase font-semibold opacity-60">{priority.description}</div>
      <div className="text-md font-semibold opacity-60">{priority.date}</div>
    </div>
<div className='text-gray-400 tooltip' data-tip="Edit"><Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/priority-task/${priority._id}`}><FaRegEdit /></Link></div>
  <div className='text-red-400 tooltip' data-tip="Delete"><Link href="#" onClick={ (e) => {e.preventDefault(); handleDelete(priority._id)}}><RiDeleteBin5Line /></Link></div>

  </li>

    
    

</ul>

        ))}
  
  </div>

        </div>
    );
};

export default Priority;