import React, { useEffect, useEffectEvent, useState } from 'react';
import { getAllPriorityTaskDB } from './priority-modal-form/getAllPriorityTask';
import Marquee from 'react-fast-marquee';

const PriorityTitle = () => {

    const [allPriorityTask, setAllPriorityTask] = useState([]);

    
      // const loadSections = async () => {
      //   const tasks = await getAllPriorityTaskDB();
      //   setAllPriorityTask(tasks.res);
      // };
    
      const loadSections = async () => {
  try {
    const tasks = await getAllPriorityTaskDB();
    setAllPriorityTask(tasks?.res ?? []);
  } catch (error) {
    console.error("Failed to load priority tasks:", error);
    setAllPriorityTask([]);
  }
};
      useEffect(() => {
        loadSections();
      }, []);
    
       console.log(allPriorityTask);
    return (
        <div className='lg:w-4xl hidden lg:block'>
   <Marquee pauseOnHover="true" width="100%" className="mx-2 md:disabled">
       {allPriorityTask.map((task,index)=>(
        <p key={task.id} className="mr-2 text-[18px] bg-slate-100 rounded-sm p-1 ">{task.name} </p>
       ))}
        </Marquee>
         
        </div>
    );
};

export default PriorityTitle;