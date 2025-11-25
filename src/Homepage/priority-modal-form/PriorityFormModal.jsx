import React, { useEffect, useState } from "react";
import PriorityModal from "./PriorityModal";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { getAllTask } from "@/Homepage/getAllTask";

const PriorityFormModal = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
const handleRefresh = ()  =>{
loadAll
}
useEffect(()=>{
  
},[])


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // You can replace this with any form submission logic (API call, etc.)

    const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/priority-task/api`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "content-type": "application/json",
      },
    });

    const NextResponse = await resp?.json();
    console.log(NextResponse);
    if (NextResponse) {
      router.push("/");

      toast.success(NextResponse?.message);
    }

    setShowModal(false); // Close the modal after submitting
    setFormData({
      name: "",
      description: "",
      date: "",
     
    });
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div>
      <button className="btn btn-sm btn-outline btn-primary mr-3 animate-pulse text-blue-600" onClick={openModal}>
        Add Task
      </button>
<div>

</div>
      <PriorityModal show={showModal} closeModal={closeModal}>
        <h2 className="font-bold text-gray-500">Add the Priority Issues</h2>
        <hr />
        <form onSubmit={handleSubmit} className="mt-3">
          <div>
            <label className="floating-label">
              <input
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                name="name"
                placeholder="Issue Name"
                className="input input-md"
                required
              />
              <span>Issue Name</span>
            </label>
          </div>
          <div>
            <label className="floating-label">
              <input
                type="text"
                value={formData.description}
                onChange={handleInputChange}
                name="description"
                placeholder="Description"
                className="input input-md"
              />
              <span>Description</span>
            </label>
          </div>
          <div>
            <label className="floating-label">
              <input
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                name="date"
                placeholder="Date "
                className="input input-md"
              />
              <span>Date</span>
            </label>
          </div>
     

          <button type="submit">ADD TASK</button>
        </form>
      </PriorityModal>
    </div>
  );
};

export default PriorityFormModal;
