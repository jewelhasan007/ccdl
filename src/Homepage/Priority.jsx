import React, { useEffect, useState } from "react";
import PriorityFormModal from "./priority-modal-form/PriorityFormModal";
import { getAllPriorityTaskDB } from "./priority-modal-form/getAllPriorityTask";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import PriorityTimer from "./PriorityTimer";
import PriorityTitle from "./PriorityTitle";

const Priority = () => {
  const [allPriorityTask, setAllPriorityTask] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [testHovered, setTestHovered] = useState(null);

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
    <div>
      <div className="flex justify-between mx-1 mb-1">
        <h5 className="text-3xl ">Priority Issues</h5>
        <PriorityTitle></PriorityTitle>
        <hr />
        <PriorityFormModal></PriorityFormModal>
      </div>
      <hr />

      {/* TEST CODE */}

      <div className="overflow-x-auto mt-4 px-2 max-h-screen lg:grid grid-cols-4 justify-between font-[6px]">
        {allPriorityTask.map((priority, index) => (
        
            <ul
              href={priority}
              key={index}
              className="list rounded-box shadow-md m-2 p-2 lg:grid lg:grid-cols-1  transition-all duration-200 hover:shadow-lg"
              onMouseEnter={() => setTestHovered(index)}
              onMouseLeave={() => setTestHovered(null)}
            >
              <li className="flex items-start justify-between relative">
                {/* Left Content - Number and Text */}
                <div className="flex items-start gap-3 z-10 flex-1 min-w-0">
                  <div className="text-2xl font-thin opacity-30 tabular-nums flex-shrink-0 mt-1">
                    {index + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    {/* <div className="font-medium text-sm truncate">{priority.name}</div> */}
                    {/* <div className="font-medium text-sm truncate transition-all duration-200 hover:text-blue-600 hover:whitespace-normal hover:overflow-visible hover:z-20 hover:relative hover:bg-white hover:shadow-lg hover:px-2 hover:py-1 hover:rounded hover:-mx-1">
                                          {priority.name}
                                      </div> */}
                    <div className="font-medium text-sm truncate transition-all duration-200 hover:text-red-600 hover:px-1  text-blue-600">
                      {priority.name}
                    </div>

                    <div
                      className={`text-[12px] truncate mt-4 transition-all duration-600 ${
                        testHovered === index
                          ? "opacity-100 max-h-20"
                          : "opacity-0 max-h-0"
                      } `}
                    >
                      {priority.description}
                    </div>
                    <div
                      className={`text-[12px] font-semibold  mt-2 transition-all duration-700 ${
                        testHovered === index
                          ? "opacity-100 max-h-20"
                          : "opacity-0 max-h-0"
                      } `}
                    >
                      <p>{priority.date}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 z-10 flex-shrink-0 ml-2">
                  <div className="text-gray-400 tooltip" data-tip="Edit">
                    <Link
                      href={`${process.env.NEXT_PUBLIC_BASE_URL}/priority-task/${priority._id}`}
                    >
                      <FaRegEdit />
                    </Link>
                  </div>
                  <div className="text-red-400 tooltip" data-tip="Delete">
                    <Link
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete(priority._id);
                      }}
                    >
                      <RiDeleteBin5Line />
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
