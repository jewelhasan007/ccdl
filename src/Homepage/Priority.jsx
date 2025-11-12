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
       <div className='flex justify-between'>
             <h1>Priority Issues</h1>
         <PriorityFormModal></PriorityFormModal>
       </div>
        <div className="overflow-x-auto mt-4 max-h-screen   ">
   
         {allPriorityTask.map((priority, index) => (

<ul key={index} className="list bg-base-100 rounded-box shadow-md"> 
  <li className="list-row">
    <div className="text-4xl font-thin opacity-30 tabular-nums">{index+1}</div>
    <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp"/></div>
    <div className="list-col-grow">
      <div>{priority.name}</div>
      <div className="text-xs uppercase font-semibold opacity-60">{priority.description}</div>
      <div className="text-md font-semibold opacity-60">{priority.date}</div>
    </div>
    <button className="btn btn-square btn-ghost">
      <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg>
    </button>
  </li>
 
</ul>

        ))}
  
  </div>

        </div>
    );
};

export default Priority;