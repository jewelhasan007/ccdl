import React, { useEffect, useState } from 'react';
import PriorityFormModal from './priority-modal-form/PriorityFormModal';
import { getAllPriorityTaskDB } from './priority-modal-form/getAllPriorityTask';
import Link from 'next/link';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import PriorityTimer from './PriorityTimer';

const Priority = () => {
    const [allPriorityTask, setAllPriorityTask] = useState([])
    
    const loadSections = async () => {
        const tasks = await getAllPriorityTaskDB()
        setAllPriorityTask(tasks.res)
    }
    
    useEffect(() => {
        loadSections()  
    }, [])
    
    console.log(allPriorityTask)

    return (
        <div>
            <div className='flex justify-between m-1'>
                    <h5 className='text-2xl '>Priority Issues</h5>
                <PriorityTimer></PriorityTimer>
                <PriorityFormModal></PriorityFormModal>
            </div>
            <hr />
            <div className="overflow-x-auto mt-4 px-2 max-h-screen grid grid-cols-4 justify-between font-[6px]">
                {allPriorityTask.map((priority, index) => (
                    <ul key={index} className="list rounded-box shadow-md m-2 p-2 lg:grid lg:grid-cols-1  transition-all duration-200 hover:shadow-lg"> 
                        <li className="flex items-start justify-between relative min-h-[80px]"> 
                            {/* Background Image */}
                            <div 
                                className="absolute bottom-0 right-0 opacity-20 z-0"
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    backgroundImage: "url('/cement-logo.png')",
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center'
                                }}
                            />
                            
                            {/* Left Content - Number and Text */}
                            <div className="flex items-start gap-3 z-10 flex-1 min-w-0">
                                <div className="text-2xl font-thin opacity-30 tabular-nums flex-shrink-0 mt-1">
                                    {index+1}
                                </div>
                                <div className="min-w-0 flex-1">
                                    {/* <div className="font-medium text-sm truncate">{priority.name}</div> */}
                                     {/* <div className="font-medium text-sm truncate transition-all duration-200 hover:text-blue-600 hover:whitespace-normal hover:overflow-visible hover:z-20 hover:relative hover:bg-white hover:shadow-lg hover:px-2 hover:py-1 hover:rounded hover:-mx-1">
                                        {priority.name}
                                    </div> */}
                                     <div className="font-medium text-sm truncate transition-all duration-200 hover:text-red-600 hover:px-1 animate-pulse text-blue-600">
                                        {priority.name}
                                    </div>
                                    <div className="text-[12px] opacity-60 truncate mt-4 ">{priority.description}</div>
                                    <div className="text-[12px] font-semibold opacity-60 mt-2 ">{priority.date}</div>
                                </div>
                            </div>
                            
                            {/* Actions */}
                            <div className="flex gap-2 z-10 flex-shrink-0 ml-2">
                                <div className='text-gray-400 tooltip' data-tip="Edit">
                                    <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/priority-task/${priority._id}`}>
                                        <FaRegEdit  />
                                    </Link>
                                </div>
                                <div className='text-red-400 tooltip' data-tip="Delete">
                                    <Link href="#" onClick={(e) => {e.preventDefault(); handleDelete(priority._id)}}>
                                        <RiDeleteBin5Line  />
                                    </Link>
                                </div>
                            </div>
                        </li> 
                    </ul>
                ))}
            </div>
        </div>
    );
};

export default Priority;